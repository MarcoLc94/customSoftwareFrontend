type Motion = typeof import('./motion');
let motion: Motion | undefined;
let request: Promise<Motion> | undefined;
let generation = 0;
let arrivedByRouter = false;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktop = window.matchMedia('(min-width: 900px) and (pointer: fine)');

async function mountExperience() {
  const version = ++generation;
  motion?.teardownMotion();
  if (reduced.matches) return;
  try {
    // The initial HTML paints before the animation engine loads.
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    request ??= import('./motion');
    const loaded = await request;
    if (version !== generation || reduced.matches) return;
    motion = loaded;
    await motion.setupMotion(arrivedByRouter);
  } catch (error) {
    // Failed optional enhancements must never leave content invisible.
    motion?.teardownMotion();
    document.querySelector<HTMLElement>('main')?.removeAttribute('style');
    console.warn('No se pudo iniciar la animación; el contenido sigue disponible.', error);
  }
}

document.addEventListener('astro:page-load', mountExperience);
document.addEventListener('astro:before-preparation', raw => {
  const event = raw as Event & { from: URL; to: URL; loader: () => Promise<void>; signal: AbortSignal };
  if (event.from.pathname === event.to.pathname || reduced.matches || !motion) return;
  const load = event.loader;
  event.loader = async () => {
    await Promise.all([load(), motion!.exitPage(event.signal)]);
  };
});
document.addEventListener('astro:before-swap', () => {
  ++generation;
  motion?.teardownMotion();
  arrivedByRouter = true;
});
reduced.addEventListener('change', mountExperience);
desktop.addEventListener('change', mountExperience);

// Delegation survives page swaps; no handlers accumulate after SPA navigation.
document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
  if (menu?.open && (!menu.contains(event.target) || event.target.closest('a'))) menu.open = false;
});
document.addEventListener('keydown', event => {
  const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
  if (event.key === 'Escape' && menu?.open) {
    menu.open = false;
    menu.querySelector('summary')?.focus();
  }
});
document.addEventListener('submit', event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || form.id !== 'brief-form') return;
  event.preventDefault();
  const name = form.querySelector<HTMLInputElement>('#name')!.value.trim();
  const service = form.querySelector<HTMLSelectElement>('#service')!.value;
  const message = form.querySelector<HTMLTextAreaElement>('#message')!.value.trim();
  const text = `Hola Marco, soy ${name}. Me interesa: ${service}.\n\n${message}`;
  window.location.assign(`https://wa.me/528118474519?text=${encodeURIComponent(text)}`);
});
