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

  // Social links are intentionally placeholders until the official profiles are published.
  // This lightweight modal is isolated from service/partner form logic.
  const socialBackdrop = document.createElement('div');
  socialBackdrop.className = 'modal-backdrop';
  socialBackdrop.id = 'social-coming-soon-modal';
  socialBackdrop.setAttribute('aria-hidden', 'true');
  socialBackdrop.innerHTML = `
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="social-coming-soon-title">
      <div class="modal-top">
        <h2 id="social-coming-soon-title">Coming Soon</h2>
        <p>Connect with Meridian Business Solutions</p>
        <button class="modal-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="modal-body">
        <p style="margin:0; color:var(--text); line-height:1.7; font-size:16px;">Our social media page is currently being prepared. Thank you for your interest, and please check back soon.</p>
      </div>
    </section>`;
  document.body.appendChild(socialBackdrop);

  const closeSocialModal = () => {
    socialBackdrop.classList.remove('open');
    socialBackdrop.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal-backdrop.open')) document.body.classList.remove('modal-open');
  };

  socialBackdrop.querySelector('.modal-close')?.addEventListener('click', closeSocialModal);
  socialBackdrop.addEventListener('click', (event) => {
    if (event.target === socialBackdrop) closeSocialModal();
  });

  document.querySelectorAll('[data-social]').forEach((link) => {
    const platform = link.dataset.social;
    const url = SITE_CONFIG.socialLinks[platform] || '#';
    link.href = url;
    if (url === '#') {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        socialBackdrop.classList.add('open');
        socialBackdrop.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        socialBackdrop.querySelector('.modal-close')?.focus();
      });
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

  scheduleForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!scheduleForm.reportValidity()) return;
    const data = new FormData(scheduleForm);
    const submitButton = scheduleForm.querySelector('.form-submit');

    const payload = {
      service: data.get('service') || 'General Service',
      name: data.get('name') || '',
      email: data.get('email') || '',
      phone: data.get('phone') || '',
      date: data.get('date') || '',
      time: data.get('time') || '',
      location: data.get('location') || '',
      details: data.get('details') || ''
    };

    if (scheduleStatus) {
      scheduleStatus.textContent = '';
      scheduleStatus.classList.remove('form-status-error', 'form-status-success');
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
    }

    try {
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      if (scheduleStatus) {
        scheduleStatus.textContent = 'Thanks — your request has been sent. We’ll be in touch shortly.';
        scheduleStatus.classList.add('form-status-success');
      }

      setTimeout(() => {
        closeModal(scheduleBackdrop);
        scheduleForm.reset();
        if (scheduleStatus) {
          scheduleStatus.textContent = '';
          scheduleStatus.classList.remove('form-status-success');
        }
      }, 1800);

    } catch (err) {
      if (scheduleStatus) {
        scheduleStatus.textContent = err.message || 'Something went wrong. Please try again.';
        scheduleStatus.classList.add('form-status-error');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Request';
      }
    }
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

  partnerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!partnerForm.reportValidity()) return;
    const data = new FormData(partnerForm);
    const submitButton = partnerForm.querySelector('.form-submit');

    const payload = {
      name: data.get('name') || '',
      email: data.get('email') || '',
      phone: data.get('phone') || '',
      details: data.get('details') || ''
    };

    if (partnerStatus) {
      partnerStatus.textContent = '';
      partnerStatus.classList.remove('form-status-error', 'form-status-success');
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
    }

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      if (partnerStatus) {
        partnerStatus.textContent = 'Thanks — your request has been sent. We’ll be in touch shortly.';
        partnerStatus.classList.add('form-status-success');
      }

      setTimeout(() => {
        closeModal(partnerBackdrop);
        partnerForm.reset();
        if (partnerStatus) {
          partnerStatus.textContent = '';
          partnerStatus.classList.remove('form-status-success');
        }
      }, 1800);

    } catch (err) {
      if (partnerStatus) {
        partnerStatus.textContent = err.message || 'Something went wrong. Please try again.';
        partnerStatus.classList.add('form-status-error');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Request';
      }
    }
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
