(() => {
  const oilCard = document.querySelector('[data-popup-card][data-title="Mobile Oil Change"]');
  const serviceBackdrop = document.querySelector('#service-modal');
  if (!oilCard || !serviceBackdrop) return;

  const serviceSubtitle = serviceBackdrop.querySelector('[data-modal-subtitle]');
  const serviceDescription = serviceBackdrop.querySelector('[data-modal-description]');
  const serviceList = serviceBackdrop.querySelector('[data-modal-list]');

  const clearOilFormatting = () => {
    serviceDescription?.classList.remove('oil-pricing-description');
    serviceList?.classList.remove('oil-includes-list');
  };

  const applyOilPricing = () => {
    if (!serviceDescription || !serviceList) return;

    if (serviceSubtitle) {
      serviceSubtitle.textContent = 'Premium full-synthetic service at your location';
    }

    serviceDescription.classList.add('oil-pricing-description');
    serviceDescription.innerHTML = `
      <span class="oil-pricing-intro">Professional mobile oil service with premium products and simple, upfront package pricing.</span>
      <span class="oil-pricing-options">
        <span class="oil-pricing-option">
          <strong>Domestic &amp; Asian Vehicles</strong>
          <span>Full synthetic oil paired with a premium oil filter.</span>
          <span class="oil-price">$100</span>
        </span>
        <span class="oil-pricing-option">
          <strong>European Vehicles</strong>
          <span>Premium full synthetic oil paired with a premium extended-performance oil filter.</span>
          <span class="oil-price">$150</span>
        </span>
      </span>`;

    serviceList.classList.add('oil-includes-list');
    serviceList.innerHTML = '';

    const points = [
      'Complimentary fluid top-offs where applicable, battery-terminal cleaning, a 25-point courtesy inspection, tire-pressure adjustment, and more.',
      'Straightforward package pricing with no separate tax, oil-disposal fee, or additional-quart charge.',
      'Honoring those who serve: active-duty and retired military members and first responders receive 10% off.',
      'The correct oil specification, viscosity, and filter fitment are confirmed before your appointment.',
      'A safe, level, and accessible service location is required for mobile service.'
    ];

    points.forEach((point, index) => {
      const item = document.createElement('li');
      item.textContent = point;
      if (index === 2) item.classList.add('oil-service-discount');
      serviceList.appendChild(item);
    });
  };

  document.querySelectorAll('[data-popup-card]').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-schedule-service]')) return;
      if (card === oilCard) applyOilPricing();
      else clearOilFormatting();
    });

    card.addEventListener('keydown', (event) => {
      if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;
      if (card === oilCard) applyOilPricing();
      else clearOilFormatting();
    });
  });
})();
