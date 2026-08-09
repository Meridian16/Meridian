(() => {
  // PLACEHOLDER REVIEW COPY for layout prototyping. Replace with verified customer feedback before public launch.
  const testimonials = {
    'Notary': [
      { quote: 'I needed two documents notarized on a tight timeline. The appointment was easy to coordinate, everything was explained clearly, and I never felt rushed.', name: 'A. Patel', place: 'Ashburn, VA' },
      { quote: 'Professional, on time, and very careful with our paperwork. Having someone come to our home made the whole process much easier.', name: 'M. Reynolds', place: 'Leesburg, VA' },
      { quote: 'The communication before the appointment was excellent. I knew what identification to bring and what to expect before the notary arrived.', name: 'S. Williams', place: 'Sterling, VA' },
      { quote: 'We had several signatures and a few questions about the process. Everything was handled patiently and in an organized way.', name: 'J. Kim', place: 'Fairfax, VA' },
      { quote: 'Scheduling was simple and the mobile appointment saved us a trip across town. Very courteous and professional service.', name: 'L. Thompson', place: 'Herndon, VA' },
      { quote: 'I appreciated the attention to detail. The documents were checked carefully and the appointment stayed efficient from beginning to end.', name: 'R. Singh', place: 'Chantilly, VA' },
      { quote: 'A family document needed to be completed quickly, and the process felt calm and straightforward. I would use the service again.', name: 'C. Davis', place: 'Reston, VA' },
      { quote: 'Convenient location, clear communication, and no unnecessary delays. It was exactly the kind of notary experience I was looking for.', name: 'T. Johnson', place: 'Vienna, VA' },
      { quote: 'The appointment was arranged around my work schedule and the process was handled efficiently. I appreciated the clear reminders and professional approach.', name: 'N. Walker', place: 'Arlington, VA' },
      { quote: 'I had multiple documents that needed attention, and each step was explained in plain language. The service was organized and easy to follow.', name: 'P. Mehta', place: 'Aldie, VA' },
      { quote: 'Mobile service made a difficult week much easier. The appointment started on time and everything was completed carefully.', name: 'E. Robinson', place: 'Falls Church, VA' },
      { quote: 'We needed a notary for family paperwork and appreciated the calm, respectful service. Communication before the visit was especially helpful.', name: 'G. Thomas', place: 'South Riding, VA' },
      { quote: 'The scheduling process was quick and the meeting was handled professionally from beginning to end. I would be comfortable using the service again.', name: 'B. Shah', place: 'Brambleton, VA' },
      { quote: 'I liked that the identification requirements were confirmed before the appointment. It saved time and made the signing straightforward.', name: 'D. Miller', place: 'McLean, VA' },
      { quote: 'A convenient and dependable option when getting to an office was difficult. The service was courteous and detail-oriented.', name: 'F. Clark', place: 'Great Falls, VA' }],
    'Remote Notary': [
      { quote: 'The online appointment was much easier than I expected. I received clear instructions before the call and knew exactly what to have ready.', name: 'D. Nguyen', place: 'Arlington, VA' },
      { quote: 'I was traveling and needed an eligible document handled remotely. The steps were explained well and the video session was very smooth.', name: 'K. Morales', place: 'Alexandria, VA' },
      { quote: 'Identity verification sounded complicated at first, but the instructions made it manageable. The entire session felt organized and secure.', name: 'P. Shah', place: 'McLean, VA' },
      { quote: 'Remote notarization saved me a lot of driving. I especially appreciated receiving preparation instructions before the appointment.', name: 'E. Carter', place: 'Reston, VA' },
      { quote: 'The process was professional from the document upload through the live session. I always knew what the next step would be.', name: 'N. Brooks', place: 'Fairfax, VA' },
      { quote: 'I had never used remote notary service before. The appointment was clear, efficient, and much less intimidating than I expected.', name: 'V. Rao', place: 'Ashburn, VA' },
      { quote: 'The online option worked well around my work schedule. Communication was prompt and the appointment started right on time.', name: 'H. Lewis', place: 'Springfield, VA' },
      { quote: 'A very convenient option for a busy week. The requirements were explained in advance, which helped the appointment move quickly.', name: 'B. Martin', place: 'Centreville, VA' },
      { quote: 'The remote appointment fit easily into my schedule. The technology steps were explained ahead of time and the session moved along smoothly.', name: 'C. Patel', place: 'Leesburg, VA' },
      { quote: 'I appreciated the clear instructions before logging in. Once the session started, the verification and signing process was easy to understand.', name: 'M. Johnson', place: 'Arlington, VA' },
      { quote: 'This was my first remote notarization and I was unsure what to expect. The preparation guidance made the experience simple and comfortable.', name: 'S. Carter', place: 'Alexandria, VA' },
      { quote: 'Being able to complete the appointment remotely saved a lot of time. Communication was prompt and professional throughout.', name: 'A. Desai', place: 'Vienna, VA' },
      { quote: 'The document requirements were reviewed in advance, so there were no surprises during the video appointment. Very efficient process.', name: 'R. Martin', place: 'Fairfax, VA' },
      { quote: 'The online session started on time and each step was explained before moving forward. I appreciated the patient approach.', name: 'J. Wilson', place: 'Reston, VA' },
      { quote: 'Remote service was a practical option for our situation. The instructions were organized and the appointment was completed without unnecessary delays.', name: 'L. Nguyen', place: 'Ashburn, VA' }],
    'Auto Services': [
      { quote: 'Getting an oil change in my driveway saved me a Saturday morning. Communication was clear, and the work area was left clean.', name: 'J. Carter', place: 'Reston, VA' },
      { quote: 'The mobile service was convenient and straightforward. Vehicle information and pricing were confirmed before the appointment.', name: 'A. Romero', place: 'Sterling, VA' },
      { quote: 'I appreciated being able to handle routine maintenance at home instead of waiting at a shop. The service felt organized and professional.', name: 'M. Chen', place: 'Ashburn, VA' },
      { quote: 'A battery issue came up before work and the communication was responsive. I liked knowing what could be handled on-site before anyone arrived.', name: 'D. Wilson', place: 'Leesburg, VA' },
      { quote: 'The appointment window worked well for my schedule and the service was explained clearly. Very convenient for basic maintenance.', name: 'R. Foster', place: 'Herndon, VA' },
      { quote: 'I had questions about fluids and routine maintenance. The explanations were practical and there was no pressure to add unnecessary work.', name: 'S. Patel', place: 'Fairfax, VA' },
      { quote: 'The mobile oil-change option was perfect for our household. It saved time and made keeping up with maintenance much easier.', name: 'K. Harris', place: 'Chantilly, VA' },
      { quote: 'Clear scheduling, careful work, and a convenient home appointment. I would consider the service again for routine vehicle needs.', name: 'T. Allen', place: 'Vienna, VA' },
      { quote: 'Having routine maintenance done at home was extremely convenient. The appointment was confirmed in advance and the service was handled neatly.', name: 'P. Scott', place: 'Leesburg, VA' },
      { quote: 'I needed help with a basic vehicle issue and appreciated the straightforward explanation of what could be done on-site.', name: 'N. Gupta', place: 'Ashburn, VA' },
      { quote: 'The mobile appointment saved me from arranging a ride to a shop. Communication was timely and the service was professional.', name: 'C. Evans', place: 'Reston, VA' },
      { quote: 'Everything from scheduling to completion felt organized. I especially appreciated the clear discussion of the work before it started.', name: 'M. Taylor', place: 'Sterling, VA' },
      { quote: 'The convenience of driveway service made routine maintenance much easier for our family. The work area was kept clean and orderly.', name: 'A. Brooks', place: 'Chantilly, VA' },
      { quote: 'I had a few questions about maintenance intervals and received practical answers without any pressure. A very helpful experience.', name: 'T. Rao', place: 'Fairfax, VA' },
      { quote: 'The appointment worked around my schedule and the service was completed efficiently. I would use the mobile option again.', name: 'J. Morgan', place: 'Herndon, VA' }],
    'Logistics': [
      { quote: 'I had a time-sensitive package that needed dependable pickup and delivery. Communication was consistent from scheduling through completion.', name: 'M. Grant', place: 'Arlington, VA' },
      { quote: 'The pickup window was clear and the handoff was handled professionally. It helped our small office keep an important deadline.', name: 'S. Ahmed', place: 'Fairfax, VA' },
      { quote: 'We needed a local delivery without tying up a staff member for half a day. The service was easy to arrange and very convenient.', name: 'L. Parker', place: 'Alexandria, VA' },
      { quote: 'Scheduling a recurring route was straightforward. I appreciated the attention to timing and the updates along the way.', name: 'R. Evans', place: 'Reston, VA' },
      { quote: 'Our package required a little extra coordination, and the communication made the process feel organized from the start.', name: 'J. Mehta', place: 'Ashburn, VA' },
      { quote: 'Reliable local pickup and delivery with clear expectations. It was a useful option when our normal schedule changed unexpectedly.', name: 'C. Moore', place: 'Springfield, VA' },
      { quote: 'The service was professional and easy to work with. Pickup details were confirmed ahead of time and there were no surprises.', name: 'P. Bennett', place: 'Manassas, VA' },
      { quote: 'Having a flexible local logistics option made a busy week much easier for our team. We especially appreciated the communication.', name: 'N. Thomas', place: 'Woodbridge, VA' },
      { quote: 'We needed a local pickup coordinated on short notice, and the communication was clear from the first message through delivery.', name: 'A. Foster', place: 'Fairfax, VA' },
      { quote: 'The service helped our office handle an important delivery without pulling someone away from work. Scheduling was simple and dependable.', name: 'K. Shah', place: 'Tysons, VA' },
      { quote: 'I appreciated the confirmation of pickup details and the updates along the way. The process felt organized and professional.', name: 'D. Lewis', place: 'Alexandria, VA' },
      { quote: 'A time-sensitive document needed to move across Northern Virginia, and the service made the coordination much easier.', name: 'R. Collins', place: 'Arlington, VA' },
      { quote: 'The delivery instructions were followed carefully and the handoff was smooth. It was a useful option for our small business.', name: 'S. Patel', place: 'Ashburn, VA' },
      { quote: 'We had an unusual pickup window and appreciated the flexibility. Communication stayed consistent throughout the request.', name: 'M. Turner', place: 'Reston, VA' },
      { quote: 'The local route support saved our team valuable time. Details were confirmed ahead of time and everything went as planned.', name: 'J. Adams', place: 'Manassas, VA' }],
    'Educational Counseling': [
      { quote: 'The academic planning session gave us a much clearer picture of what to focus on this year. The advice felt practical rather than overwhelming.', name: 'R. Shah', place: 'Ashburn, VA' },
      { quote: 'My student left the meeting with an actual plan and a better understanding of priorities. That made the college process feel much more manageable.', name: 'K. Miller', place: 'Leesburg, VA' },
      { quote: 'The tutoring support was patient and focused on understanding the material, not just finishing the assignment.', name: 'A. Green', place: 'Fairfax, VA' },
      { quote: 'We appreciated having SAT preparation broken into realistic weekly goals. It helped create structure without adding unnecessary stress.', name: 'P. Reddy', place: 'Herndon, VA' },
      { quote: 'College planning can feel confusing for families doing it for the first time. The conversation helped us understand the timeline and next steps.', name: 'M. Lopez', place: 'Sterling, VA' },
      { quote: 'The session helped my daughter organize her application tasks and think more clearly about fit instead of simply chasing school names.', name: 'J. Adams', place: 'Vienna, VA' },
      { quote: 'The guidance was encouraging but still realistic. We came away with concrete action items for academics, testing, and applications.', name: 'S. Nair', place: 'Chantilly, VA' },
      { quote: 'What I liked most was the personalized approach. The discussion centered on the student’s goals instead of using a one-size-fits-all checklist.', name: 'T. Brown', place: 'Centreville, VA' },
      { quote: 'The planning conversation helped turn a long list of school responsibilities into a realistic weekly plan. That structure made a noticeable difference.', name: 'N. Kumar', place: 'Ashburn, VA' },
      { quote: 'We appreciated the practical approach to college readiness. The discussion focused on the student’s strengths, timeline, and realistic next steps.', name: 'E. Wilson', place: 'Leesburg, VA' },
      { quote: 'The tutoring session was patient and clear. Instead of just giving answers, the concepts were explained in a way that made the next assignment easier.', name: 'M. Shah', place: 'Fairfax, VA' },
      { quote: 'SAT preparation felt much more manageable after breaking the work into smaller goals. The plan gave us a clear place to start.', name: 'A. Roberts', place: 'Vienna, VA' },
      { quote: 'The college application process felt less overwhelming after the session. We left with a timeline and a better understanding of what mattered most.', name: 'C. Patel', place: 'Herndon, VA' },
      { quote: 'The guidance helped my student balance academics, activities, and application work without feeling like everything had to happen at once.', name: 'J. Thomas', place: 'Sterling, VA' },
      { quote: 'I appreciated that the conversation was personalized instead of following a generic admissions checklist. The recommendations felt thoughtful and realistic.', name: 'R. Lee', place: 'Centreville, VA' }]
  };

  const ticker = document.querySelector('[data-testimonial-ticker]');
  const openLink = document.querySelector('[data-testimonials-open]');
  const backdrop = document.querySelector('#testimonials-modal');
  const tabsWrap = backdrop?.querySelector('[data-testimonial-tabs]');
  const panel = backdrop?.querySelector('[data-testimonial-panel]');
  const closeButton = backdrop?.querySelector('.modal-close');
  if (!ticker || !openLink || !backdrop || !tabsWrap || !panel) return;

  const categories = Object.keys(testimonials);
  const tickerItems = categories.flatMap((category) => testimonials[category].slice(0, 2).map((item) => ({ ...item, category })));
  let tickerIndex = 0;
  let activeCategory = categories[0];
  let previousFocus = null;

  const tickerLine = (item) => `“${item.quote}” — ${item.name}, ${item.place}`;
  ticker.textContent = tickerLine(tickerItems[0]);

  const advanceTicker = () => {
    ticker.classList.remove('ticker-enter');
    ticker.classList.add('ticker-exit');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 0 : 330;
    window.setTimeout(() => {
      tickerIndex = (tickerIndex + 1) % tickerItems.length;
      ticker.textContent = tickerLine(tickerItems[tickerIndex]);
      ticker.classList.remove('ticker-exit');
      void ticker.offsetWidth;
      ticker.classList.add('ticker-enter');
    }, delay);
  };

  window.setInterval(advanceTicker, 10000);

  const renderPanel = (category) => {
    activeCategory = category;
    tabsWrap.querySelectorAll('.testimonial-tab').forEach((tab) => {
      const selected = tab.dataset.category === category;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panel.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'testimonial-list';
    testimonials[category].forEach((item) => {
      const article = document.createElement('article');
      article.className = 'testimonial-item';
      const quote = document.createElement('blockquote');
      quote.textContent = `“${item.quote}”`;
      const footer = document.createElement('footer');
      footer.textContent = `${item.name} • ${item.place}`;
      article.append(quote, footer);
      list.appendChild(article);
    });
    panel.appendChild(list);
    panel.scrollTop = 0;
  };

  categories.forEach((category, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'testimonial-tab';
    tab.dataset.category = category;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(index === 0));
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.textContent = category;
    tab.addEventListener('click', () => renderPanel(category));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = categories.indexOf(activeCategory);
      let nextIndex = currentIndex;
      if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % categories.length;
      if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + categories.length) % categories.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = categories.length - 1;
      renderPanel(categories[nextIndex]);
      tabsWrap.querySelector(`[data-category="${CSS.escape(categories[nextIndex])}"]`)?.focus();
    });
    tabsWrap.appendChild(tab);
  });
  renderPanel(activeCategory);

  const openModal = () => {
    previousFocus = document.activeElement;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    tabsWrap.querySelector('.testimonial-tab[aria-selected="true"]')?.focus();
  };

  const closeModal = () => {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal-backdrop.open')) document.body.classList.remove('modal-open');
    previousFocus?.focus?.();
  };

  openLink.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  });
  closeButton?.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
  });
})();
