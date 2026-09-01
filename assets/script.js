(() => {
  const visualPolish = document.createElement('style');
  visualPolish.textContent = `
    .area-card,
    .project-card,
    .content-card,
    .subtopic-grid article {
      background: var(--hu-blue);
      border-color: var(--hu-blue);
      color: #fff;
    }

    .area-card h3,
    .project-card h3,
    .project-card .card-heading,
    .content-card h2,
    .subtopic-grid h3 {
      color: #fff;
    }

    .area-card p,
    .project-card p,
    .content-card p,
    .subtopic-grid p {
      color: #eef6fb;
    }

    .area-no,
    .project-card .meta,
    .content-card .section-label {
      color: #d8ebf7;
    }

    .project-card .resource-links a,
    .content-card .resource-links a,
    .subtopic-grid .resource-links a,
    .project-card > p > a,
    .content-card > p > a {
      color: #fff;
      text-decoration-color: #d8ebf7;
    }

    .area-card:hover {
      background: var(--hu-blue-dark);
      border-color: var(--hu-blue-dark);
      color: #fff;
      box-shadow: 0 14px 34px rgba(0,40,79,.18);
    }

    #ethics {
      background: var(--hu-blue-mid);
      border-color: #9bc7e3;
      box-shadow: inset 0 0 0 2px rgba(255,255,255,.16);
    }

    main > figure > img {
      max-height: 260px !important;
    }

    .about-caption {
      display: none;
    }

    .lang-link,
    .section-jump a {
      border-color: #627d93;
    }

    a:focus-visible,
    button:focus-visible {
      outline: 3px solid #ffbf47;
      outline-offset: 4px;
      box-shadow: 0 0 0 7px #00284f;
    }
  `;
  document.head.appendChild(visualPolish);

  const isGerman = document.documentElement.lang === 'de';
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute(
        'aria-label',
        open
          ? (isGerman ? 'Navigation schließen' : 'Close navigation')
          : (isGerman ? 'Navigation öffnen' : 'Open navigation')
      );
    };

    setOpen(false);
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length) {
    filterButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
      btn.addEventListener('click', () => {
        filterButtons.forEach((other) => {
          other.classList.remove('active');
          other.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.pub-card').forEach((card) => {
          const areas = (card.dataset.areas || '').split(' ');
          card.classList.toggle('hidden', filter !== 'all' && !areas.includes(filter));
        });
      });
    });
  }
})();
