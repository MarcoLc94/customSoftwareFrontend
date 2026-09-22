import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ScrollSmoother as Smoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger);
let context: gsap.Context | undefined;
let smoother: Smoother | undefined;
let version = 0;
let exitTween: gsap.core.Tween | undefined;
let finishExit: (() => void) | undefined;

export function teardownMotion() {
  ++version;
  exitTween?.kill();
  finishExit?.();
  finishExit = undefined;
  exitTween = undefined;
  context?.revert();
  context = undefined;
  smoother?.kill();
  smoother = undefined;
  delete document.documentElement.dataset.smooth;
  delete document.documentElement.dataset.motion;
  gsap.set('main', { clearProps: 'opacity,visibility,transform' });
}

export function exitPage(signal: AbortSignal): Promise<void> {
  finishExit?.();
  exitTween?.kill();
  if (signal.aborted) return Promise.resolve();
  return new Promise(resolve => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      signal.removeEventListener('abort', abort);
      resolve();
    };
    const abort = () => {
      exitTween?.kill();
      gsap.set('main', { clearProps: 'opacity,visibility,transform' });
      finish();
    };
    finishExit = finish;
    signal.addEventListener('abort', abort, { once: true });
    exitTween = gsap.to('main', { opacity: 0, y: -16, duration: .2, ease: 'power2.in', overwrite: 'auto', onComplete: finish });
  });
}

export async function setupMotion(routeEntrance: boolean) {
  teardownMotion();
  const current = version;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const desktop = window.matchMedia('(min-width: 900px) and (pointer: fine)').matches;
  if (desktop) {
    const { ScrollSmoother } = await import('gsap/ScrollSmoother');
    if (current !== version) return;
    gsap.registerPlugin(ScrollSmoother);
    const scrollPosition = window.scrollY;
    smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: .9, effects: false, smoothTouch: false });
    smoother.scrollTop(scrollPosition);
    document.documentElement.dataset.smooth = 'true';
  }
  if (current !== version) return;
  document.documentElement.dataset.motion = 'gsap';
  context = gsap.context(() => {
    if (routeEntrance) {
      gsap.fromTo('main', { opacity: .2, y: 22 }, { opacity: 1, y: 0, duration: .55, ease: 'power3.out', clearProps: 'opacity,transform' });
    } else {
      // No splash and no hidden H1: the first paint remains useful.
      gsap.from('.brand, .theme-toggle, .nav-cta', { y: -12, duration: .65, stagger: .06, ease: 'power3.out', clearProps: 'transform' });
      gsap.from('.hero-art, .page-intro', { y: 20, duration: .8, ease: 'power3.out', clearProps: 'transform' });
    }
    const nodes = gsap.utils.toArray<HTMLElement>('.section-heading, .service-card, .project-card, .about-graphic, .about-copy, .benefit-card, .testimonial-card, .steps-grid article, .process-step, .contact-banner, .contact-method, .brief-form, .legal h2');
    nodes.forEach(node => {
      // Measure once during setup, never on every scroll frame.
      const initiallyVisible = node.getBoundingClientRect().top < window.innerHeight;
      const enter = () => gsap.fromTo(node, { y: 34, opacity: .3 }, { y: 0, opacity: 1, duration: .7, ease: 'power3.out', overwrite: 'auto' });
      const leave = () => gsap.to(node, { y: -18, opacity: .2, duration: .3, ease: 'power2.in', overwrite: 'auto' });
      ScrollTrigger.create({
        trigger: node, start: 'top 94%', end: 'bottom 0%',
        onEnter: () => { if (!initiallyVisible || window.scrollY > 50) enter(); },
        onEnterBack: enter,
        onLeave: leave,
        onLeaveBack: () => gsap.to(node, { y: 22, opacity: .3, duration: .25, overwrite: 'auto' })
      });
    });
    if (desktop && document.querySelector('.hero-art')) {
      gsap.to('.hero-art', { y: 65, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
      gsap.to('.art-spark', { rotation: 70, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
    }
  });
  ScrollTrigger.refresh();
}
