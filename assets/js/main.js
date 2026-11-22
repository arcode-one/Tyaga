import { initImages } from './components/images.js';
import { initForms } from './components/forms.js';
import { initScroll } from './core/scroll.js';
import { initAnchors } from './core/anchors.js';
import { initReveal } from './core/reveal.js';
import { reduce, hasGsap, ScrollTrigger } from './core/motion.js';
import { initHeader } from './blocks/header.js';
import { initMenu } from './blocks/menu.js';
import { initModal } from './blocks/modal.js';
import { initProjects } from './blocks/projects.js';
import { initVacancies } from './blocks/vacancies.js';
import { initSubjects } from './blocks/subjects.js';
import { initObjects } from './blocks/objects.js';
import { initStages } from './blocks/stages.js';
import { initDocuments } from './blocks/documents.js';
import { initCareer } from './blocks/career.js';
import { initNews } from './blocks/news.js';
import { initHero } from './blocks/hero.js';
import { initSchedule } from './blocks/schedule.js';
import { initAchievements } from './blocks/achievements.js';
import { initCta } from './blocks/cta.js';
const scroll = initScroll();
initHeader();
const menu = initMenu(scroll);
initAnchors(scroll, menu);
initModal(scroll, menu);
initForms();
initProjects();
initVacancies();
initSubjects();
initObjects();
initStages();
initDocuments();
initCareer();
initNews();
if (document.querySelector('[data-geo-map]')) {
  import('./blocks/geography.js').then(({ initGeography }) => initGeography());
}
await initImages();
if (hasGsap && !reduce) {
  initHero();
  initReveal();
  initSchedule();
  initAchievements();
  initCta();
  if (document.readyState === 'complete') ScrollTrigger.refresh();
  else window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
