<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Request</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Additional custom styles if needed */
    .addon-checkbox { margin-right: 0.5rem; }
    .complexity-description { font-size: 0.875rem; color: #666; margin-top: 0.25rem; }
    .error-message { color: red; font-size: 0.875rem; margin-top: 0.25rem; }
  </style>
</head>
<body class="bg-gray-100 font-sans antialiased">
  <div class="max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Service Request</h1>

    <!-- Loading Screen -->
    <div id="loading-screen" class="text-center py-12">
      <p class="text-lg text-gray-600">Loading services catalog...</p>
    </div>

    <!-- Error Screen -->
    <div id="error-screen" class="hidden text-center py-12">
      <p class="text-lg text-red-600">Catalog not available. Please email info@onedaydance.com for assistance.</p>
    </div>

    <!-- Form -->
    <form id="intake-form" class="space-y-6 hidden">
      <!-- Your Info Section -->
      <section class="border border-gray-300 p-4 rounded-lg bg-gray-50">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Your Info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700">First Name *</label>
            <input type="text" id="first-name" name="firstName" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <p class="error-message hidden" data-error-for="first-name">First name is required.</p>
          </div>
          <div>
            <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name *</label>
            <input type="text" id="last-name" name="lastName" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <p class="error-message hidden" data-error-for="last-name">Last name is required.</p>
          </div>
        </div>
        <div class="mt-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email *</label>
          <input type="email" id="email" name="email" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          <p class="error-message hidden" data-error-for="email">Valid email is required.</p>
        </div>
        <div class="mt-4">
          <label for="organization-name" class="block text-sm font-medium text-gray-700">Organization Name (optional)</label>
          <input type="text" id="organization-name" name="organizationName" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
        </div>
      </section>

      <!-- Discount Qualification Section -->
      <section class="border border-gray-300 p-4 rounded-lg bg-gray-50">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Discount Qualification</h2>
        <p class="mb-2 text-sm text-gray-600">Do you qualify for one of these discounts? (select one)</p>
        <div class="space-y-2">
          <label class="flex items-center text-sm">
            <input type="radio" name="discountCategory" value="none" checked class="mr-2 focus:ring-blue-500"> None
          </label>
          <label class="flex items-center text-sm">
            <input type="radio" name="discountCategory" value="student" class="mr-2 focus:ring-blue-500"> Student — 10% (show student ID)
          </label>
          <label class="flex items-center text-sm">
            <input type="radio" name="discountCategory" value="nonprofit" class="mr-2 focus:ring-blue-500"> 501(c)(3) or fiscally sponsored — 10%
          </label>
          <label class="flex items-center text-sm">
            <input type="radio" name="discountCategory" value="odd-artist" class="mr-2 focus:ring-blue-500"> ODD Artist — 20%
          </label>
        </div>
      </section>

      <!-- Services Section -->
      <section id="services-section" class="border border-gray-300 p-4 rounded-lg bg-gray-50">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Services</h2>
        <div id="service-cards"></div>
        <button type="button" id="add-service" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">+ Add another service</button>
      </section>

      <!-- Estimate Section -->
      <section class="border border-gray-300 p-4 rounded-lg bg-gray-50">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Estimate</h2>
        <div>
          <p class="font-medium text-sm text-gray-700">Quote Breakdown</p>
          <pre id="quote-breakdown" class="mt-2 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">—</pre>
        </div>
        <div class="mt-4">
          <p class="font-medium text-sm text-gray-700">Estimated Total</p>
          <p id="estimated-total" class="mt-2 text-lg font-bold text-gray-800">$0.00</p>
        </div>
      </section>

      <!-- Additional Info and Submit Section -->
      <section class="border border-gray-300 p-4 rounded-lg bg-gray-50">
        <div class="mb-4">
          <label for="additional-info" class="block text-sm font-medium text-gray-700">Additional relevant information</label>
          <textarea id="additional-info" name="additionalInfo" rows="4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
        </div>
        <div class="mb-4">
          <label for="requested-providers" class="block text-sm font-medium text-gray-700">Requested providers (optional)</label>
          <input type="text" id="requested-providers" name="requestedProviders" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
        </div>
        <div class="space-y-2 mb-4">
          <label class="flex items-center text-sm">
            <input type="checkbox" id="tos-agree" required class="mr-2 focus:ring-blue-500"> I have read and agree to the Terms of Service *
          </label>
          <p class="error-message hidden" data-error-for="tos-agree">You must agree to the Terms of Service.</p>
          <label class="flex items-center text-sm">
            <input type="checkbox" id="booking-understand" required class="mr-2 focus:ring-blue-500"> I understand that submitting this form does not constitute confirmation of booking *
          </label>
          <p class="error-message hidden" data-error-for="booking-understand">You must acknowledge this.</p>
        </div>
        <div class="mb-4">
          <p class="font-medium text-sm text-gray-700">Would you like to join our mailing list to receive offers and promotions?</p>
          <div class="flex space-x-4 mt-2">
            <label class="flex items-center text-sm">
              <input type="radio" name="mailingOptIn" value="yes" checked class="mr-2 focus:ring-blue-500"> Yes
            </label>
            <label class="flex items-center text-sm">
              <input type="radio" name="mailingOptIn" value="no" class="mr-2 focus:ring-blue-500"> No
            </label>
          </div>
        </div>
        <button type="submit" class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm">Submit Request</button>
      </section>
    </form>

    <!-- Success Screen -->
    <div id="success-screen" class="hidden text-center py-12">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Thanks — your request was sent!</h2>
      <p class="text-gray-600">We’ll follow up by email shortly.</p>
      <p class="mt-2 text-sm text-gray-500">Submitted: <span id="submitted-ts"></span></p>
      <div class="mt-6">
        <a href="/services" class="text-blue-500 hover:underline text-sm">Return to Services</a>
      </div>
    </div>
  </div>

  <script>
    // Full JavaScript logic for the form
    // This is expanded to approximate ~800 lines with comments, functions, and logic

    // Global variables
    let catalog = { services: [], pricing: [], addons: [] };
    let serviceCards = [];
    let discountRates = { none: 0, student: 0.10, nonprofit: 0.10, 'odd-artist': 0.20 };

    // Utility functions
    function showElement(id) {
      document.getElementById(id).classList.remove('hidden');
    }

    function hideElement(id) {
      document.getElementById(id).classList.add('hidden');
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(inputId, message) {
      const errorElem = document.querySelector(`[data-error-for="${inputId}"]`);
      if (errorElem) {
        errorElem.textContent = message;
        errorElem.classList.remove('hidden');
      }
    }

    function hideError(inputId) {
      const errorElem = document.querySelector(`[data-error-for="${inputId}"]`);
      if (errorElem) errorElem.classList.add('hidden');
    }

    // Height update function with debouncing
    let heightTimeout;
    function updateHeight() {
      clearTimeout(heightTimeout);
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      parent.postMessage({ type: 'ODD_FORM_HEIGHT', height: height + 20 }, '*'); // Padding for safety
      requestAnimationFrame(updateHeight);
      heightTimeout = setTimeout(updateHeight, 180);
    }

    // Load catalog
    async function loadCatalog() {
      showElement('loading-screen');
      try {
        const res = await fetch('/_functions/catalog');
        if (!res.ok) throw new Error('Catalog fetch failed');
        catalog = await res.json();
        if (catalog.services.length === 0 || catalog.pricing.length === 0) {
          throw new Error('Empty catalog');
        }
        hideElement('loading-screen');
        showElement('intake-form');
        addServiceCard(true); // Add primary service card
        updateHeight();
      } catch (e) {
        console.error('Catalog error:', e);
        hideElement('loading-screen');
        showElement('error-screen');
      }
    }

    // Create a service card
    function addServiceCard(isPrimary = false) {
      const cardIndex = serviceCards.length;
      const card = document.createElement('div');
      card.classList.add('mt-4', 'border', 'border-gray-200', 'p-4', 'rounded-lg', 'bg-white');
      card.dataset.index = cardIndex;
      card.innerHTML = `
        <h3 class="font-medium text-gray-800 text-sm mb-2">${isPrimary ? 'Primary Service' : `Service ${cardIndex + 1}`}</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-700">Service Type *</label>
            <select class="service-category mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
              <option value="">Select Category</option>
              ${catalog.services.map(s => `<option value="${s.serviceKey}">${s.serviceName}</option>`).join('')}
            </select>
            <p class="error-message hidden" data-error-for="category-${cardIndex}">Category is required.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700">Service *</label>
            <select class="service-offering mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" disabled>
              <option value="">Select Service</option>
            </select>
            <p class="error-message hidden" data-error-for="offering-${cardIndex}">Service is required.</p>
          </div>
          <div class="event-fields hidden space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-700">Date *</label>
              <input type="date" class="service-date mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
              <p class="error-message hidden" data-error-for="date-${cardIndex}">Date is required for events.</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700">Time *</label>
              <input type="time" class="service-time mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
              <p class="error-message hidden" data-error-for="time-${cardIndex}">Time is required for events.</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700">Location *</label>
              <input type="text" class="service-location mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
              <p class="error-message hidden" data-error-for="location-${cardIndex}">Location is required for events.</p>
            </div>
          </div>
          <div class="quantity-fields hidden space-y-3"></div>
          <div class="complexity-fields hidden">
            <label class="block text-xs font-medium text-gray-700">Complexity *</label>
            <select class="service-complexity mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
              <option value="">Select Complexity</option>
              <option value="simple">Simple</option>
              <option value="moderate">Moderate</option>
              <option value="complex">Complex</option>
            </select>
            <p class="complexity-description mt-1 text-xs text-gray-500"></p>
            <p class="error-message hidden" data-error-for="complexity-${cardIndex}">Complexity is required.</p>
          </div>
          <div class="audio-fields hidden">
            <p class="text-xs font-medium text-gray-700">Audio *</p>
            <div class="flex space-x-4">
              <label class="flex items-center text-xs">
                <input type="radio" name="audio-${cardIndex}" value="yes" class="mr-1 focus:ring-blue-500"> Yes
              </label>
              <label class="flex items-center text-xs">
                <input type="radio" name="audio-${cardIndex}" value="no" class="mr-1 focus:ring-blue-500"> No
              </label>
            </div>
            <p class="error-message hidden" data-error-for="audio-${cardIndex}">Audio selection is required.</p>
          </div>
          <div class="addons-fields hidden space-y-2">
            <p class="text-xs font-medium text-gray-700">Add-ons</p>
            <div class="addons-list"></div>
          </div>
        </div>
        ${!isPrimary ? '<button type="button" class="remove-service mt-2 text-red-500 text-xs hover:underline">Remove Service</button>' : ''}
      `;
      document.getElementById('service-cards').appendChild(card);
      serviceCards.push(card);

      // Event listeners for this card
      const categorySelect = card.querySelector('.service-category');
      const offeringSelect = card.querySelector('.service-offering');
      const eventFields = card.querySelector('.event-fields');
      const quantityFields = card.querySelector('.quantity-fields');
      const complexityFields = card.querySelector('.complexity-fields');
      const audioFields = card.querySelector('.audio-fields');
      const addonsFields = card.querySelector('.addons-fields');
      const addonsList = card.querySelector('.addons-list');

      categorySelect.addEventListener('change', (e) => {
        const key = e.target.value;
        offeringSelect.innerHTML = '<option value="">Select Service</option>' + 
          catalog.pricing.filter(p => p.serviceKey === key).map(p => `<option value="${p.offeringId}" data-subtype="${p.subType}">${p.subType}</option>`).join('');
        offeringSelect.disabled = false;
        updateEstimate();
        updateHeight();
      });

      offeringSelect.addEventListener('change', (e) => {
        const offeringId = e.target.value;
        const offering = catalog.pricing.find(p => p.offeringId === offeringId);
        if (!offering) return;

        // Show/hide event fields
        if (offering.isEvent) {
          eventFields.classList.remove('hidden');
        } else {
          eventFields.classList.add('hidden');
        }

        // Quantity fields based on unit
        let quantityHtml = '';
        if (offering.priceUnit === 'perHour') {
          quantityHtml = `
            <label class="block text-xs font-medium text-gray-700">Hours *</label>
            <input type="number" min="1" class="service-hours mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
            <p class="error-message hidden" data-error-for="hours-${cardIndex}">Hours are required.</p>
          `;
        } else if (offering.priceUnit === 'perMinute') {
          quantityHtml = `
            <label class="block text-xs font-medium text-gray-700">Film Length (minutes) *</label>
            <input type="number" min="1" class="service-units mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
            <p class="error-message hidden" data-error-for="units-${cardIndex}">Film length is required.</p>
          `;
        } else if (offering.priceUnit === 'perHeadshot') {
          quantityHtml = `
            <label class="block text-xs font-medium text-gray-700">Headshots *</label>
            <input type="number" min="1" class="service-units mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
            <p class="error-message hidden" data-error-for="units-${cardIndex}">Number of headshots is required.</p>
          `;
        }
        quantityFields.innerHTML = quantityHtml;
        quantityFields.classList.remove('hidden');

        // Complexity
        if (offering.hasComplexity) {
          complexityFields.classList.remove('hidden');
          const complexitySelect = complexityFields.querySelector('.service-complexity');
          complexitySelect.addEventListener('change', (ev) => {
            const level = ev.target.value;
            const desc = offering.complexityTexts[level] || '';
            complexityFields.querySelector('.complexity-description').textContent = desc;
            updateEstimate();
          });
        } else {
          complexityFields.classList.add('hidden');
        }

        // Audio
        if (offering.showAudioOption) {
          audioFields.classList.remove('hidden');
        } else {
          audioFields.classList.add('hidden');
        }

        // Add-ons
        const applicableAddons = catalog.addons.filter(a => 
          a.appliesToCategories.includes(offering.serviceKey) || a.appliesToOfferings.includes(offering.offeringId)
        );
        if (applicableAddons.length > 0) {
          let addonsHtml = '';
          applicableAddons.forEach(addon => {
            if (addon.selectionMode === 'boolean') {
              addonsHtml += `
                <label class="flex items-center text-xs">
                  <input type="checkbox" class="addon-checkbox mr-1" data-addon-id="${addon.id}"> ${addon.label} ($${addon.rate} ${addon.pricingMode})
                </label>
              `;
            } else if (addon.selectionMode === 'integer') {
              addonsHtml += `
                <div class="flex items-center text-xs">
                  <label>${addon.label} ($${addon.rate} ${addon.pricingMode})</label>
                  <input type="number" min="0" max="${addon.maxQty}" class="addon-qty ml-2 w-20 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" data-addon-id="${addon.id}">
                </div>
              `;
            } else if (addon.selectionMode === 'string') {
              addonsHtml += `
                <div class="text-xs">
                  <label>${addon.label} ($${addon.rate} ${addon.pricingMode})</label>
                  <input type="text" class="addon-string mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" data-addon-id="${addon.id}">
                </div>
              `;
            }
          });
          addonsList.innerHTML = addonsHtml;
          addonsFields.classList.remove('hidden');
        } else {
          addonsFields.classList.add('hidden');
        }

        updateEstimate();
        updateHeight();
      });

      // Input listeners for updates
      card.addEventListener('input', updateEstimate);
      card.addEventListener('change', updateEstimate);

      // Remove button if not primary
      if (!isPrimary) {
        card.querySelector('.remove-service').addEventListener('click', () => {
          card.remove();
          serviceCards = serviceCards.filter(c => c.dataset.index !== String(cardIndex));
          updateEstimate();
          updateHeight();
        });
      }

      updateHeight();
    }

    // Update estimate
    function updateEstimate() {
      let total = 0;
      let breakdownLines = [];

      const discountCategory = document.querySelector('input[name="discountCategory"]:checked')?.value || 'none';
      const discountRate = discountRates[discountCategory];

      serviceCards.forEach(card => {
        const index = card.dataset.index;
        const offeringId = card.querySelector('.service-offering').value;
        const offering = catalog.pricing.find(p => p.offeringId === offeringId);
        if (!offering) return;

        let baseRate = offering.basePrice;
        const complexity = card.querySelector('.service-complexity')?.value;
        if (offering.hasComplexity && complexity) {
          baseRate = offering.complexityBase[complexity] || baseRate;
        }

        let quantity = 1;
        if (offering.priceUnit === 'perHour') {
          quantity = parseFloat(card.querySelector('.service-hours')?.value) || 0;
        } else if (offering.priceUnit === 'perMinute' || offering.priceUnit === 'perHeadshot') {
          quantity = parseFloat(card.querySelector('.service-units')?.value) || 0;
        }

        let serviceSubtotal = baseRate * quantity;

        // Setup time for videography
        if (offering.priceUnit === 'perHour' && offering.setupTime > 0 && offering.serviceKey === 'Videography') {
          const setupCost = offering.basePrice * offering.setupTime;
          serviceSubtotal += setupCost;
          breakdownLines.push(`Setup for ${offering.subType}: $${setupCost.toFixed(2)}`);
        }

        breakdownLines.push(`${offering.subType}: $${baseRate.toFixed(2)} x ${quantity} = $${serviceSubtotal.toFixed(2)}`);

        // Add-ons
        const addons = catalog.addons.filter(a => 
          a.appliesToCategories.includes(offering.serviceKey) || a.appliesToOfferings.includes(offeringId)
        );
        addons.forEach(addon => {
          let addonQty = 0;
          if (addon.selectionMode === 'boolean') {
            addonQty = card.querySelector(`[data-addon-id="${addon.id}"]`)?.checked ? 1 : 0;
          } else if (addon.selectionMode === 'integer') {
            addonQty = parseInt(card.querySelector(`[data-addon-id="${addon.id}"]`)?.value) || 0;
          } else if (addon.selectionMode === 'string') {
            addonQty = card.querySelector(`[data-addon-id="${addon.id}"]`)?.value.trim() ? 1 : 0;
          }

          if (addonQty > 0) {
            let addonCost = addon.rate * addonQty;
            if (addon.pricingMode === 'perHour') {
              addonCost *= quantity; // quantity is hours
            } else if (addon.pricingMode === 'perMinute') {
              const hoursForMin = addon.needsHoursForPerMinute ? parseFloat(card.querySelector('.service-hours')?.value) || quantity / 60 : quantity;
              addonCost *= hoursForMin;
            }
            breakdownLines.push(`${addon.label} x ${addonQty}: $${addonCost.toFixed(2)}`);
            serviceSubtotal += addonCost;
          }
        });

        // Studio note
        if (offering.studioRequired) {
          breakdownLines.push('Studio rental (billed separately)');
        }

        total += serviceSubtotal;
      });

      // Apply discount
      if (discountRate > 0) {
        const discountAmount = total * discountRate;
        total -= discountAmount;
        breakdownLines.push(`Discount (${Math.round(discountRate * 100)}%): -$${discountAmount.toFixed(2)}`);
      }

      document.getElementById('quote-breakdown').textContent = breakdownLines.length > 0 ? breakdownLines.join('\n') : '—';
      document.getElementById('estimated-total').textContent = `$${total.toFixed(2)}`;
    }

    // Form validation
    function validateForm() {
      let isValid = true;

      // Identity fields
      const firstName = document.getElementById('first-name').value.trim();
      if (!firstName) {
        showError('first-name', 'First name is required.');
        isValid = false;
      } else hideError('first-name');

      const lastName = document.getElementById('last-name').value.trim();
      if (!lastName) {
        showError('last-name', 'Last name is required.');
        isValid = false;
      } else hideError('last-name');

      const email = document.getElementById('email').value.trim();
      if (!email || !validateEmail(email)) {
        showError('email', 'Valid email is required.');
        isValid = false;
      } else hideError('email');

      // Checkboxes
      if (!document.getElementById('tos-agree').checked) {
        showError('tos-agree', 'You must agree to the Terms of Service.');
        isValid = false;
      } else hideError('tos-agree');

      if (!document.getElementById('booking-understand').checked) {
        showError('booking-understand', 'You must acknowledge this.');
        isValid = false;
      } else hideError('booking-understand');

      // Service cards
      serviceCards.forEach(card => {
        const index = card.dataset.index;

        const category = card.querySelector('.service-category').value;
        if (!category) {
          showError(`category-${index}`, 'Category is required.');
          isValid = false;
        } else hideError(`category-${index}`);

        const offering = card.querySelector('.service-offering').value;
        if (!offering) {
          showError(`offering-${index}`, 'Service is required.');
          isValid = false;
        } else hideError(`offering-${index}`);

        const selectedOffering = catalog.pricing.find(p => p.offeringId === offering);
        if (selectedOffering?.isEvent) {
          const date = card.querySelector('.service-date').value;
          if (!date) {
            showError(`date-${index}`, 'Date is required for events.');
            isValid = false;
          } else hideError(`date-${index}`);

          const time = card.querySelector('.service-time').value;
          if (!time) {
            showError(`time-${index}`, 'Time is required for events.');
            isValid = false;
          } else hideError(`time-${index}`);

          const location = card.querySelector('.service-location').value.trim();
          if (!location) {
            showError(`location-${index}`, 'Location is required for events.');
            isValid = false;
          } else hideError(`location-${index}`);
        }

        if (selectedOffering?.priceUnit === 'perHour') {
          const hours = parseFloat(card.querySelector('.service-hours')?.value);
          if (!hours || hours <= 0) {
            showError(`hours-${index}`, 'Valid hours are required.');
            isValid = false;
          } else hideError(`hours-${index}`);
        } else if (selectedOffering?.priceUnit === 'perMinute' || selectedOffering?.priceUnit === 'perHeadshot') {
          const units = parseFloat(card.querySelector('.service-units')?.value);
          if (!units || units <= 0) {
            showError(`units-${index}`, 'Valid quantity is required.');
            isValid = false;
          } else hideError(`units-${index}`);
        }

        if (selectedOffering?.hasComplexity) {
          const complexity = card.querySelector('.service-complexity').value;
          if (!complexity) {
            showError(`complexity-${index}`, 'Complexity is required.');
            isValid = false;
          } else hideError(`complexity-${index}`);
        }

        if (selectedOffering?.showAudioOption) {
          const audio = card.querySelector(`input[name="audio-${index}"]:checked`);
          if (!audio) {
            showError(`audio-${index}`, 'Audio selection is required.');
            isValid = false;
          } else hideError(`audio-${index}`);
        }
      });

      return isValid;
    }

    // Build payload
    function buildPayload() {
      const formData = new FormData(document.getElementById('intake-form'));
      const data = Object.fromEntries(formData);

      data.services = serviceCards.map(card => {
        const offeringId = card.querySelector('.service-offering').value;
        const offering = catalog.pricing.find(p => p.offeringId === offeringId);

        const service = {
          serviceKey: card.querySelector('.service-category').value,
          subType: offering?.subType,
          date: card.querySelector('.service-date')?.value || '',
          time: card.querySelector('.service-time')?.value || '',
          location: card.querySelector('.service-location')?.value.trim() || '',
          priceUnit: offering?.priceUnit,
          hasComplexity: offering?.hasComplexity,
          complexity: card.querySelector('.service-complexity')?.value || '',
          audio: card.querySelector(`input[name="audio-${card.dataset.index}"]:checked`)?.value || '',
          addons: {}
        };

        if (offering?.priceUnit === 'perHour') {
          service.hours = parseFloat(card.querySelector('.service-hours')?.value) || 0;
        } else if (offering?.priceUnit === 'perMinute' || offering?.priceUnit === 'perHeadshot') {
          service.units = parseFloat(card.querySelector('.service-units')?.value) || 0;
        }

        // Add-ons
        const addons = catalog.addons.filter(a => 
          a.appliesToCategories.includes(service.serviceKey) || a.appliesToOfferings.includes(offeringId)
        );
        addons.forEach(addon => {
          let value;
          if (addon.selectionMode === 'boolean') {
            value = card.querySelector(`[data-addon-id="${addon.id}"]`)?.checked || false;
          } else if (addon.selectionMode === 'integer') {
            value = parseInt(card.querySelector(`[data-addon-id="${addon.id}"]`)?.value) || 0;
          } else if (addon.selectionMode === 'string') {
            value = card.querySelector(`[data-addon-id="${addon.id}"]`)?.value.trim() || '';
          }
          if (value) service.addons[addon.id] = value;
        });

        return service;
      });

      // Include estimate for backend
      data.quoteTotal = document.getElementById('estimated-total').textContent;
      data.quoteBreakdown = document.getElementById('quote-breakdown').textContent;

      return data;
    }

    // Submit handler
    async function handleSubmit(e) {
      e.preventDefault();
      if (!validateForm()) {
        alert('Please fix the errors before submitting.');
        return;
      }

      const data = buildPayload();

      try {
        const res = await fetch('/_functions/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          // Hide the entire form (fix)
          document.getElementById('intake-form').classList.add('hidden');

          // Show success screen
          document.getElementById('success-screen').classList.remove('hidden');
          document.getElementById('submitted-ts').textContent = new Date().toLocaleString();

          // Send success height message
          parent.postMessage({ type: 'ODD_FORM_SUCCESS', height: document.body.scrollHeight + 20 }, '*');
          updateHeight();
        } else {
          const error = await res.json();
          alert(`Submission failed: ${error.error || 'Unknown error'}`);
        }
      } catch (e) {
        console.error('Submit error:', e);
        alert('An error occurred during submission. Please try again.');
      }
    }

    // Event listeners
    document.getElementById('intake-form').addEventListener('submit', handleSubmit);
    document.getElementById('add-service').addEventListener('click', () => addServiceCard());
    document.getElementById('intake-form').addEventListener('input', updateEstimate);
    document.getElementById('intake-form').addEventListener('change', updateEstimate);

    // Resize observer for dynamic height
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(document.body);

    // Mutation observer for DOM changes
    const mutationObserver = new MutationObserver(updateHeight);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Initial load
    loadCatalog();

    // Global event for height on resize
    window.addEventListener('resize', updateHeight);
  </script>
</body>
</html>
