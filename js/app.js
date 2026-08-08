(() => {
  const SITE_CONFIG = {
    requestEmail: 'info@meridianbizsolutions.com',
    socialLinks: {
      facebook: '#',
      instagram: '#',
      youtube: '#',
      pinterest: '#'
    }
  };

  document.querySelectorAll('[data-social]').forEach((link) => {
    const platform = link.dataset.social;
    const url = SITE_CONFIG.socialLinks[platform] || '#';
    link.href = url;
    if (url === '#') {
      link.addEventListener('click', (event) => event.preventDefault());
    } else {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = `Visit Meridian Business Solutions on ${platform}`;
    }
  });

  const menuButton = document.querySelector('.menu-button');
  const navPanel = document.querySelector('.nav-panel');

  const closeMenu = () => {
    if (!menuButton || !navPanel) return;
    menuButton.setAttribute('aria-expanded', 'false');
    navPanel.classList.remove('open');
  };

  if (menuButton && navPanel) {
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      navPanel.classList.toggle('open', !isOpen);
    });
    document.addEventListener('click', (event) => {
      if (!navPanel.contains(event.target) && event.target !== menuButton) closeMenu();
    });
  }

  let activeBackdrop = null;
  let previousFocus = null;

  const closeModal = (backdrop = activeBackdrop) => {
    if (!backdrop) return;
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    if (activeBackdrop === backdrop) activeBackdrop = null;
    if (!document.querySelector('.modal-backdrop.open')) document.body.classList.remove('modal-open');
    previousFocus?.focus?.();
  };

  const openModal = (backdrop, trigger) => {
    if (!backdrop) return;
    if (activeBackdrop && activeBackdrop !== backdrop) closeModal(activeBackdrop);
    previousFocus = trigger || document.activeElement;
    activeBackdrop = backdrop;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    backdrop.querySelector('.modal-close')?.focus();
  };

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.querySelector('.modal-close')?.addEventListener('click', () => closeModal(backdrop));
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeModal(backdrop);
    });
  });

  const serviceBackdrop = document.querySelector('#service-modal');
  const serviceTitle = serviceBackdrop?.querySelector('[data-modal-title]');
  const serviceSubtitle = serviceBackdrop?.querySelector('[data-modal-subtitle]');
  const serviceDescription = serviceBackdrop?.querySelector('[data-modal-description]');
  const serviceList = serviceBackdrop?.querySelector('[data-modal-list]');

  document.querySelectorAll('[data-popup-card]').forEach((card) => {
    const openCard = () => {
      if (!serviceBackdrop) return;
      serviceTitle.textContent = card.dataset.title || 'Service information';
      serviceSubtitle.textContent = card.dataset.subtitle || 'Meridian Business Solutions';
      serviceDescription.textContent = card.dataset.description || '';
      serviceList.innerHTML = '';
      (card.dataset.points || '').split('|').filter(Boolean).slice(0, 5).forEach((point) => {
        const item = document.createElement('li');
        item.textContent = point;
        serviceList.appendChild(item);
      });
      openModal(serviceBackdrop, card);
    };

    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-schedule-service]')) return;
      openCard();
    });
    card.addEventListener('keydown', (event) => {
      if (event.target !== card) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCard();
      }
    });
  });

  const infoContent = {
    legal: {
      title: 'Legal Notice',
      subtitle: 'General website and service terms',
      html: `
        <p><strong>Last updated:</strong> August 3, 2026</p>
        <h3>Business information</h3>
        <p>Meridian Business Solutions<br>Serving Northern Virginia and remote clients<br><a href="tel:+17036343365">(703) 634-3365</a><br><a href="mailto:info@meridianbizsolutions.com">info@meridianbizsolutions.com</a></p>
        <h3>Website purpose</h3>
        <p>This website provides general information about services offered by Meridian Business Solutions. Website information is not a binding quote, guarantee, legal opinion, mechanical diagnosis, or commitment to provide service. Availability, pricing, travel fees, eligibility, document requirements, and service limitations are confirmed before an appointment.</p>
        <h3>Professional limitations</h3>
        <p>Notary services do not include legal advice, document preparation, or selection of a notarial certificate. Auto-service information is general and does not replace a complete inspection or diagnosis by a licensed repair facility when required. Logistics services are subject to item, handling, content, and destination restrictions. Educational counseling provides guidance and academic support but does not guarantee grades, test scores, admission, scholarships, or other educational outcomes.</p>
        <h3>Intellectual property</h3>
        <p>The Meridian Business Solutions name, website design, text, and original graphics may not be copied or used commercially without permission, except where permitted by law.</p>
        <h3>External links</h3>
        <p>Social-media and third-party links are provided for convenience. Meridian Business Solutions is not responsible for third-party content, security, availability, or privacy practices.</p>`
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How customer information may be handled',
      html: `
        <p><strong>Last updated:</strong> August 3, 2026</p>
        <h3>Information we may collect</h3>
        <p>When you contact Meridian Business Solutions, request an appointment, or purchase a service, we may collect your name, phone number, email address, service address, appointment details, vehicle information, delivery instructions, and documents or files you choose to provide.</p>
        <h3>How information is used</h3>
        <ul><li>Respond to questions and schedule services.</li><li>Verify service requirements and prepare estimates.</li><li>Complete requested notary, logistics, auto, or educational counseling services.</li><li>Maintain records required by law or normal business operations.</li><li>Protect customers, the business, and service providers from fraud or misuse.</li></ul>
        <h3>Sharing</h3>
        <p>Information may be shared with service platforms, payment processors, technology providers, delivery partners, or authorities when reasonably necessary to provide a service, comply with law, or protect legal rights. We do not sell personal information.</p>
        <h3>Security and retention</h3>
        <p>Reasonable safeguards are used to protect information. No storage or transmission method is completely secure. Records are retained only as long as needed for business, legal, tax, insurance, or regulatory purposes.</p>
        <h3>Cookies and analytics</h3>
        <p>This starter website does not include advertising cookies or analytics by default. This policy should be updated if analytics, payments, booking tools, remote-notary platforms, or embedded social features are added.</p>
        <h3>Your choices</h3>
        <p>Contact <a href="mailto:info@meridianbizsolutions.com">info@meridianbizsolutions.com</a> to ask about your information, request a correction, or request deletion when retention is not legally required.</p>`
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Questions, appointments, and custom requests',
      html: `
        <p>Meridian Business Solutions is here to help with convenient office and mobile services. Share what you need, your preferred timing, and the best way to reach you. We will confirm availability, requirements, and pricing before service begins.</p>
        <div class="contact-grid">
          <div class="contact-item"><strong>Email</strong><a href="mailto:info@meridianbizsolutions.com">info@meridianbizsolutions.com</a></div>
          <div class="contact-item"><strong>Phone</strong><a href="tel:+17036343365">(703) 634-3365</a></div>
          <div class="contact-item"><strong>Service area</strong><span>In-person services: Northern Virginia<br>Remote services: Available 24 hours (call to schedule)</span></div>
          <div class="contact-item"><strong>Availability</strong><span>At your service. Call or submit a request to schedule professional assistance.</span></div>
        </div>
        <h3>Helpful details to include</h3>
        <ul><li>The service you need.</li><li>Your preferred date and time.</li><li>Your city or service location.</li><li>Any deadline, document, vehicle, delivery, logistics, or academic planning details.</li><li>The best phone number or email for a response.</li></ul>
        <div class="info-callout">Use a Schedule Service button on the home page.</div>`
    }
  };

  const infoBackdrop = document.querySelector('#info-modal');
  const infoTitle = infoBackdrop?.querySelector('[data-info-title]');
  const infoSubtitle = infoBackdrop?.querySelector('[data-info-subtitle]');
  const infoBody = infoBackdrop?.querySelector('[data-info-content]');

  document.querySelectorAll('[data-info-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const content = infoContent[button.dataset.infoModal];
      if (!content || !infoBackdrop) return;
      infoTitle.textContent = content.title;
      infoSubtitle.textContent = content.subtitle;
      infoBody.innerHTML = content.html;
      infoBody.scrollTop = 0;
      openModal(infoBackdrop, button);
    });
  });

  const scheduleBackdrop = document.querySelector('#schedule-modal');
  const scheduleForm = document.querySelector('#schedule-form');
  const scheduleService = document.querySelector('#schedule-service');
  const scheduleStatus = scheduleForm?.querySelector('[data-form-status]');

  document.querySelectorAll('[data-schedule-service]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!scheduleBackdrop || !scheduleForm || !scheduleService) return;
      scheduleForm.reset();
      scheduleService.value = button.dataset.scheduleService || 'General Service';
      scheduleStatus.textContent = '';
      openModal(scheduleBackdrop, button);
      scheduleForm.querySelector('input[name="name"]')?.focus();
    });
  });

  scheduleForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!scheduleForm.reportValidity()) return;
    const data = new FormData(scheduleForm);
    const service = data.get('service') || 'General Service';
    const subject = `Meridian Service Request - ${service}`;
    const body = [
      'Hello Meridian Business Solutions,',
      '',
      'I would like to request the following service:',
      '',
      `Service: ${service}`,
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Preferred date: ${data.get('date') || 'Flexible'}`,
      `Preferred time: ${data.get('time') || 'Flexible'}`,
      `Service location: ${data.get('location') || 'To be confirmed'}`,
      '',
      'Request details:',
      `${data.get('details') || ''}`,
      '',
      'Please contact me to confirm availability, requirements, and pricing.',
      '',
      'Thank you.'
    ].join('\n');

    scheduleStatus.textContent = 'Preparing your request…';
    window.location.href = `mailto:${SITE_CONFIG.requestEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });


  const partnerBackdrop = document.querySelector('#partner-modal');
  const partnerForm = document.querySelector('#partner-form');
  const partnerStatus = partnerForm?.querySelector('[data-partner-status]');

  document.querySelectorAll('[data-partner-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!partnerBackdrop || !partnerForm) return;
      partnerForm.reset();
      if (partnerStatus) partnerStatus.textContent = '';
      openModal(partnerBackdrop, button);
      partnerForm.querySelector('input[name="name"]')?.focus();
    });
  });

  partnerForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!partnerForm.reportValidity()) return;
    const data = new FormData(partnerForm);
    const subject = 'Meridian Partnership Request';
    const body = [
      'Hello Meridian Business Solutions,',
      '',
      'I would like to discuss a possible partnership.',
      '',
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      '',
      'Partnership details:',
      `${data.get('details') || ''}`,
      '',
      'Please contact me to discuss the opportunity.',
      '',
      'Thank you.'
    ].join('\n');

    if (partnerStatus) partnerStatus.textContent = 'Preparing your request…';
    window.location.href = `mailto:${SITE_CONFIG.requestEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      if (activeBackdrop) closeModal(activeBackdrop);
    }
    if (event.key === 'Tab' && activeBackdrop) {
      const modal = activeBackdrop.querySelector('.modal');
      const focusables = modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
