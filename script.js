const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

const year = new Date().getFullYear();
const footer = document.querySelector('footer');

if (footer) {
  footer.querySelector('.footer-meta span').textContent = `© ${year} Grey`;
}

const animatedElements = document.querySelectorAll(
  '.hero-content, .hero-card, .section, .service, .project-card, .contact'
);

animatedElements.forEach((element) => {
  element.classList.add('reveal');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

animatedElements.forEach((element) => observer.observe(element));

console.log('Grey interactions loaded.');

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.setAttribute('aria-controls', 'main-nav');

  mainNav.id = 'main-nav';

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close menu' : 'Open menu'
    );
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

/* PROJECT INQUIRY FORM */
const projectForm = document.querySelector('#project-form');

if (projectForm) {
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(projectForm);

    const email = formData.get('email');
    const name = formData.get('name');
    const business = formData.get('business');
    const industry = formData.get('industry');
    const projectType = formData.get('projectType');
    const goals = formData.get('goals');
    const features = formData.get('features') || 'Not provided';
    const budget = formData.get('budget');
    const timeline = formData.get('timeline');
    const reference = formData.get('reference') || 'Not provided';
    const additionalInfo = formData.get('additionalInfo') || 'None provided';

    const subject = `New Grey Project Inquiry — ${business}`;

    const body = `GREY PROJECT INQUIRY

CLIENT DETAILS
Name: ${name}
Business / Brand: ${business}
Industry: ${industry}
Email: ${email}

PROJECT
Project Type: ${projectType}

GOALS
${goals}

FEATURES & REQUIREMENTS
${features}

BUDGET
${budget}

TIMELINE
${timeline}

REFERENCE
${reference}

ADDITIONAL INFORMATION
${additionalInfo}

---
Submitted through the Grey website.
`;

    const mailto =
      `mailto:bigdannygrey@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}


/* FORM STATUS */
if (projectForm) {
  const formNote = projectForm.querySelector('.form-note');

  projectForm.addEventListener('invalid', () => {
    if (formNote) {
      formNote.textContent = 'Please complete the required fields before sending your inquiry.';
      formNote.style.color = 'var(--accent-2)';
    }
  }, true);
}

