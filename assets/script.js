(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    };

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
