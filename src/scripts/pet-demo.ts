type PetDemoRoot = HTMLElement & {
  dataset: {
    foods?: string;
  };
};

type FoodItem = {
  element: HTMLImageElement;
  x: number;
};

const WALK_SPEED = 200;
const PET_WIDTH = 136;
const FOOD_SIZE = 32;
const TOKEN_GOAL = 20_000;
const PROMPT = "build the next tiny pet feature";
const AGENT_STEPS = [
  "Reading local session logs...",
  "Planning a small change...",
  "Editing files...",
  "Running checks...",
  "Summarizing the result...",
];

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function once(element: HTMLElement, eventName: string, timeoutMs: number) {
  return new Promise<void>((resolve) => {
    let done = false;
    const timeout = window.setTimeout(finish, timeoutMs);

    function finish() {
      if (done) return;
      done = true;
      window.clearTimeout(timeout);
      element.removeEventListener(eventName, finish);
      resolve();
    }

    element.addEventListener(eventName, finish, { once: true });
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function initPetDemo(root: PetDemoRoot) {
  if (root.dataset.initialized === "true") return;
  root.dataset.initialized = "true";

  const button = root.querySelector<HTMLButtonElement>(".run-button");
  const track = root.querySelector<HTMLElement>(".demo-track");
  const petWrap = root.querySelector<HTMLElement>("[data-pet-wrap]");
  const pet = root.querySelector<HTMLElement>("[data-pet]");
  const foodLayer = root.querySelector<HTMLElement>("[data-food-layer]");
  const toastLayer = root.querySelector<HTMLElement>("[data-toast-layer]");
  const liveRegion = root.querySelector<HTMLElement>("[data-live-region]");
  const promptInput = root.querySelector<HTMLInputElement>("[data-prompt-input]");
  const agentLog = root.querySelector<HTMLElement>("[data-agent-log]");
  const agentStatus = root.querySelector<HTMLElement>("[data-agent-status]");
  const tokenCount = root.querySelector<HTMLElement>("[data-token-count]");
  const tokenMeter = root.querySelector<HTMLElement>("[data-token-meter]");
  const fullTip = root.querySelector<HTMLElement>("[data-full-tip]");
  let foodSources: string[] = [];

  try {
    foodSources = JSON.parse(root.dataset.foods ?? "[]");
  } catch {
    foodSources = [];
  }

  if (
    !button ||
    !track ||
    !petWrap ||
    !pet ||
    !foodLayer ||
    !toastLayer ||
    !liveRegion ||
    !promptInput ||
    !agentLog ||
    !agentStatus ||
    !tokenCount ||
    !tokenMeter ||
    foodSources.length === 0
  ) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const queue: FoodItem[] = [];
  let active = false;
  let running = false;
  let petX = 36;
  let fullTimer = 0;

  const formatTokens = (value: number) => new Intl.NumberFormat("en-US").format(value);

  const setTokenProgress = (value: number) => {
    const tokens = clamp(Math.round(value), 0, TOKEN_GOAL);
    tokenCount.textContent = formatTokens(tokens);
    tokenMeter.style.setProperty("--token-progress", `${(tokens / TOKEN_GOAL) * 100}%`);
  };

  const setPetState = (state: "idle" | "walk" | "eat" | "full") => {
    pet.classList.remove("is-idle", "is-walk", "is-eat", "is-full");
    pet.classList.add(`is-${state}`);
  };

  const movePet = async (targetX: number) => {
    const distance = Math.abs(targetX - petX);
    const duration = reduceMotion.matches ? 0 : Math.max(140, (distance / WALK_SPEED) * 1000);
    const shouldFlipSprite = targetX > petX;

    pet.classList.toggle("is-facing-right", shouldFlipSprite);
    petWrap.style.transitionDuration = `${duration}ms`;
    petWrap.style.transform = `translateX(${targetX}px)`;
    setPetState("walk");

    if (duration === 0) {
      petX = targetX;
      return;
    }

    await once(petWrap, "transitionend", duration + 80);
    petX = targetX;
  };

  const showToast = (x: number) => {
    const toast = document.createElement("span");
    toast.className = "xp-toast";
    toast.textContent = "+1 snack";
    toast.style.setProperty("--toast-x", `${x + 42}px`);
    toastLayer.append(toast);
    window.setTimeout(() => toast.remove(), reduceMotion.matches ? 900 : 820);
  };

  const showFullTip = () => {
    if (!fullTip) return;
    fullTip.hidden = false;
    window.clearTimeout(fullTimer);
    fullTimer = window.setTimeout(() => {
      fullTip.hidden = true;
      if (!active) setPetState("idle");
    }, 1700);
  };

  const denySnack = () => {
    button.classList.remove("is-denied");
    void button.offsetWidth;
    button.classList.add("is-denied");
  };

  const processQueue = async () => {
    if (active) return;
    active = true;

    while (queue.length > 0) {
      const food = queue.shift();
      if (!food) break;

      const maxX = Math.max(36, track.clientWidth - PET_WIDTH - 18);
      const targetX = clamp(food.x - PET_WIDTH * 0.42, 18, maxX);
      await movePet(targetX);

      setPetState("eat");
      food.element.classList.add("is-eaten");
      liveRegion.textContent = "Agent reached 20,000 tokens and the pet ate a snack";
      showToast(targetX);
      await sleep(reduceMotion.matches ? 260 : 620);
      food.element.remove();
      setPetState("idle");
      await sleep(reduceMotion.matches ? 20 : 120);
    }

    active = false;
    if (!fullTip || fullTip.hidden) setPetState("idle");
  };

  const typePrompt = async () => {
    if (promptInput.value.trim() !== "") return;

    if (reduceMotion.matches) {
      promptInput.value = PROMPT;
      return;
    }

    for (const character of PROMPT) {
      promptInput.value += character;
      await sleep(24);
    }
  };

  const runAgentMeter = async () => {
    if (reduceMotion.matches) {
      agentLog.textContent = AGENT_STEPS[AGENT_STEPS.length - 1];
      setTokenProgress(TOKEN_GOAL);
      return;
    }

    const totalTicks = 32;
    for (let tick = 1; tick <= totalTicks; tick += 1) {
      const progress = tick / totalTicks;
      const eased = 1 - Math.pow(1 - progress, 2);
      const stepIndex = Math.min(AGENT_STEPS.length - 1, Math.floor(progress * AGENT_STEPS.length));
      agentLog.textContent = AGENT_STEPS[stepIndex];
      setTokenProgress(eased * TOKEN_GOAL);
      await sleep(72);
    }

    setTokenProgress(TOKEN_GOAL);
  };

  const dropSnack = async () => {
    if (queue.length > 0 || active) {
      denySnack();
      return;
    }

    const maxX = Math.max(FOOD_SIZE + 24, track.clientWidth - FOOD_SIZE - 36);
    const x = Math.round(clamp(track.clientWidth * 0.72, 64, maxX));
    const food = document.createElement("img");
    food.className = "demo-food is-dropping";
    food.src = foodSources[0];
    food.alt = "";
    food.width = FOOD_SIZE;
    food.height = FOOD_SIZE;
    food.style.setProperty("--food-x", `${x}px`);
    foodLayer.append(food);

    if (!reduceMotion.matches) {
      await once(food, "animationend", 620);
    }

    food.classList.remove("is-dropping");
    queue.push({ element: food, x });
    void processQueue();
  };

  const runPrompt = async () => {
    if (running || active) {
      denySnack();
      return;
    }

    running = true;
    button.disabled = true;
    promptInput.disabled = true;
    agentStatus.textContent = "Typing";
    setTokenProgress(0);
    if (fullTip) fullTip.hidden = true;

    await typePrompt();
    agentStatus.textContent = "Agent running";
    await runAgentMeter();
    agentStatus.textContent = "Snack unlocked";
    showFullTip();
    await dropSnack();
    await sleep(reduceMotion.matches ? 60 : 360);

    agentStatus.textContent = "Ready";
    button.disabled = false;
    promptInput.disabled = false;
    promptInput.value = "";
    running = false;
  };

  button.addEventListener("click", () => {
    void runPrompt();
  });
  setTokenProgress(0);
}

export function initPetDemos() {
  const demos = Array.from(document.querySelectorAll<PetDemoRoot>("[data-pet-demo]"));
  if (demos.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    demos.forEach(initPetDemo);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        initPetDemo(entry.target as PetDemoRoot);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "160px" },
  );

  demos.forEach((demo) => observer.observe(demo));
}
