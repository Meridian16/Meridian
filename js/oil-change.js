(() => {
  const oilCard = document.querySelector('[data-popup-card][data-title="Mobile Oil Change"]');
  const fluidCard = document.querySelector('[data-popup-card][data-title="Fluid Service"]');
  const serviceBackdrop = document.querySelector('#service-modal');
  if (!serviceBackdrop || (!oilCard && !fluidCard)) return;

  const serviceSubtitle = serviceBackdrop.querySelector('[data-modal-subtitle]');
  const serviceDescription = serviceBackdrop.querySelector('[data-modal-description]');
  const serviceList = serviceBackdrop.querySelector('[data-modal-list]');

  const clearCustomFormatting = () => {
    serviceDescription?.classList.remove('oil-pricing-description', 'fluid-pricing-description');
    serviceList?.classList.remove('oil-includes-list', 'fluid-includes-list');
  };

  const renderPrice = (whole) => `<span class="oil-price">$${whole}<sup>.99</sup></span>`;

  const renderPricing = ({ subtitle, intro, domesticText, domesticPrice, europeanText, europeanPrice, points, fluid = false }) => {
    if (!serviceDescription || !serviceList) return;
    clearCustomFormatting();
    if (serviceSubtitle) serviceSubtitle.textContent = subtitle;

    serviceDescription.classList.add(fluid ? 'fluid-pricing-description' : 'oil-pricing-description');
    serviceDescription.innerHTML = `
      <span class="oil-pricing-intro">${intro}</span>
      <span class="oil-pricing-options">
        <span class="oil-pricing-option">
          <strong>Domestic &amp; Asian Vehicles</strong>
          <span>${domesticText}</span>
          ${renderPrice(domesticPrice)}
        </span>
        <span class="oil-pricing-option">
          <strong>European Vehicles</strong>
          <span>${europeanText}</span>
          ${renderPrice(europeanPrice)}
        </span>
      </span>`;

    serviceList.classList.add(fluid ? 'fluid-includes-list' : 'oil-includes-list');
    serviceList.innerHTML = '';
    points.forEach((point, index) => {
      const item = document.createElement('li');
      item.textContent = point;
      if (!fluid && index === 2) item.classList.add('oil-service-discount');
      serviceList.appendChild(item);
    });
  };

  const applyOilPricing = () => renderPricing({
    subtitle: 'Premium full-synthetic service at your location',
    intro: 'Professional mobile oil service with premium products and simple, upfront package pricing.',
    domesticText: 'Full synthetic oil paired with a premium oil filter.',
    domesticPrice: '99',
    europeanText: 'Premium full synthetic oil paired with a premium extended-performance oil filter.',
    europeanPrice: '149',
    points: [
      'Complimentary fluid top-offs where applicable, battery-terminal cleaning, a 25-point courtesy inspection, tire-pressure adjustment, and more.',
      'Straightforward package pricing with no separate tax, oil-disposal fee, or additional-quart charge.',
      'Honoring those who serve: active-duty and retired military members and first responders receive 10% off.',
      'The correct oil specification, viscosity, and filter fitment are confirmed before your appointment.',
      'Complimentary engine or cabin air-filter installation while we are servicing your vehicle. Provide the filter, or we can purchase a premium replacement on your behalf and provide the receipt.'
    ]
  });

  const applyFluidPricing = () => renderPricing({
    subtitle: 'Transmission and coolant fluid service at your location',
    intro: 'Mobile transmission fluid and engine coolant service using vehicle-appropriate fluids and a service approach matched to your vehicle.',
    domesticText: 'Transmission fluid or engine coolant service for eligible domestic and Asian vehicles.',
    domesticPrice: '149',
    europeanText: 'Transmission fluid or engine coolant service for eligible European vehicles using the required fluid specification.',
    europeanPrice: '199',
    fluid: true,
    points: [
      'Transmission fluid or engine coolant service is performed when the vehicle design and service location allow safe mobile work.',
      'The correct fluid specification and service eligibility are confirmed before the appointment.',
      'Pricing applies to the approved standard service scope; unusual capacity, parts, contamination, leaks, or diagnostic work may require a separate quote.',
      'Warning lights, overheating, major leaks, or transmission concerns may require diagnosis at a repair facility.',
      'A safe, level, and accessible service location is required for mobile service.'
    ]
  });

  document.querySelectorAll('[data-popup-card]').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-schedule-service]')) return;
      if (card === oilCard) applyOilPricing();
      else if (card === fluidCard) applyFluidPricing();
      else clearCustomFormatting();
    });

    card.addEventListener('keydown', (event) => {
      if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;
      if (card === oilCard) applyOilPricing();
      else if (card === fluidCard) applyFluidPricing();
      else clearCustomFormatting();
    });
  });
})();