type PetDemoRoot = HTMLElement & {
  dataset: {
    foods?: string;
  };
};

type FoodItem = {
  element: HTMLImageElement;
  x: number;
};

const WALK_SPEED = 80;
const PET_WIDTH = 136;
const FOOD_SIZE = 32;
const MAX_QUEUE = 3;

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

  const button = root.querySelector<HTMLButtonElement>(".snack-button");
  const track = root.querySelector<HTMLElement>(".demo-track");
  const pet = root.querySelector<HTMLElement>("[data-pet]");
  const foodLayer = root.querySelector<HTMLElement>("[data-food-layer]");
  const toastLayer = root.querySelector<HTMLElement>("[data-toast-layer]");
  const liveRegion = root.querySelector<HTMLElement>("[data-live-region]");
  const queueCount = root.querySelector<HTMLElement>("[data-queue-count]");
  const fullTip = root.querySelector<HTMLElement>("[data-full-tip]");
  let foodSources: string[] = [];

  try {
    foodSources = JSON.parse(root.dataset.foods ?? "[]");
  } catch {
    foodSources = [];
  }

  if (!button || !track || !pet || !foodLayer || !toastLayer || !liveRegion || foodSources.length === 0) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const queue: FoodItem[] = [];
  let active = false;
  let petX = 36;
  let snackBurst = 0;
  let burstTimer = 0;
  let fullTimer = 0;

  const setQueueCount = () => {
    if (queueCount) queueCount.textContent = String(queue.length);
  };

  const setPetState = (state: "idle" | "walk" | "eat" | "full") => {
    pet.classList.remove("is-idle", "is-walk", "is-eat", "is-full");
    pet.classList.add(`is-${state}`);
  };

  const movePet = async (targetX: number) => {
    const distance = Math.abs(targetX - petX);
    const duration = reduceMotion.matches ? 0 : Math.max(260, (distance / WALK_SPEED) * 1000);
    const facingLeft = targetX < petX;

    pet.classList.toggle("is-facing-left", facingLeft);
    pet.style.setProperty("--pet-x", `${targetX}px`);
    pet.style.transitionDuration = `${duration}ms`;
    pet.style.transform = `translateX(${targetX}px) ${facingLeft ? "scaleX(-1) " : ""}scale(0.74)`;
    setPetState("walk");

    if (duration === 0) {
      petX = targetX;
      return;
    }

    await once(pet, "transitionend", duration + 80);
    petX = targetX;
  };

  const showToast = (x: number) => {
    const toast = document.createElement("span");
    toast.className = "xp-toast";
    toast.textContent = "+1 XP";
    toast.style.setProperty("--toast-x", `${x + 42}px`);
    toastLayer.append(toast);
    window.setTimeout(() => toast.remove(), reduceMotion.matches ? 900 : 820);
  };

  const showFullTip = () => {
    if (!fullTip) return;
    fullTip.hidden = false;
    setPetState("full");
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
      setQueueCount();
      const food = queue.shift();
      if (!food) break;

      const maxX = Math.max(36, track.clientWidth - PET_WIDTH - 18);
      const targetX = clamp(food.x - PET_WIDTH * 0.42, 18, maxX);
      await movePet(targetX);

      setPetState("eat");
      food.element.classList.add("is-eaten");
      liveRegion.textContent = "Pet ate a snack";
      showToast(targetX);
      await sleep(reduceMotion.matches ? 260 : 620);
      food.element.remove();
      setPetState("idle");
      setQueueCount();
      await sleep(reduceMotion.matches ? 20 : 120);
    }

    active = false;
    setQueueCount();
    if (!fullTip || fullTip.hidden) setPetState("idle");
  };

  const dropSnack = () => {
    if (queue.length >= MAX_QUEUE) {
      denySnack();
      return;
    }

    const maxX = Math.max(FOOD_SIZE + 24, track.clientWidth - FOOD_SIZE - 36);
    const x = Math.round(40 + Math.random() * (maxX - 40));
    const food = document.createElement("img");
    food.className = "demo-food";
    food.src = foodSources[Math.floor(Math.random() * foodSources.length)];
    food.alt = "";
    food.width = FOOD_SIZE;
    food.height = FOOD_SIZE;
    food.style.setProperty("--food-x", `${x}px`);
    foodLayer.append(food);

    queue.push({ element: food, x });
    setQueueCount();

    snackBurst += 1;
    window.clearTimeout(burstTimer);
    burstTimer = window.setTimeout(() => {
      snackBurst = 0;
    }, 2600);
    if (snackBurst >= 5) showFullTip();

    void processQueue();
  };

  button.addEventListener("click", dropSnack);
  setQueueCount();
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
