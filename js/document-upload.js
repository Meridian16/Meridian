(() => {
  const modal = document.getElementById('document-upload-modal');
  const form = document.getElementById('document-upload-form');
  if (!modal || !form) return;

  const status = form.querySelector('[data-upload-status]');
  const submitButton = form.querySelector('button[type="submit"]');
  const fileInput = form.querySelector('input[name="documents"]');
  const selectedFiles = form.querySelector('[data-selected-files]');
  const allowedExtensions = new Set(['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']);
  const MAX_FILES = 10;
  const MAX_FILE_BYTES = 10 * 1024 * 1024;
  const MAX_TOTAL_BYTES = 50 * 1024 * 1024;
  let lastTrigger = null;

  const setStatus = (message = '', type = '') => {
    if (!status) return;
    status.textContent = message;
    status.classList.remove('form-status-error', 'form-status-success');
    if (type === 'error') status.classList.add('form-status-error');
    if (type === 'success') status.classList.add('form-status-success');
  };

  const openModal = (trigger) => {
    lastTrigger = trigger || document.activeElement;
    form.reset();
    setStatus();
    if (selectedFiles) selectedFiles.textContent = '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => form.querySelector('input[name="name"]')?.focus(), 0);
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal-backdrop.open')) document.body.classList.remove('modal-open');
    lastTrigger?.focus?.();
  };

  document.querySelectorAll('[data-document-upload-open]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openModal(button);
    });
  });

  document.querySelectorAll('[data-document-upload-card]').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('[data-document-upload-open]')) return;
      openModal(card);
    });
    card.addEventListener('keydown', (event) => {
      if (event.target !== card) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

  fileInput?.addEventListener('change', () => {
    const files = Array.from(fileInput.files || []);
    if (!selectedFiles) return;
    if (!files.length) { selectedFiles.textContent = ''; return; }
    const total = files.reduce((sum, file) => sum + file.size, 0);
    selectedFiles.textContent = `${files.length} file${files.length === 1 ? '' : 's'} selected • ${(total / 1024 / 1024).toFixed(1)} MB total`;
  });

  const validateFiles = (files) => {
    if (!files.length) return 'Please choose at least one document.';
    if (files.length > MAX_FILES) return `Please upload no more than ${MAX_FILES} files at a time.`;
    let total = 0;
    for (const file of files) {
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      if (!allowedExtensions.has(ext)) return `${file.name} is not an accepted file type.`;
      if (file.size > MAX_FILE_BYTES) return `${file.name} is larger than 10 MB.`;
      total += file.size;
    }
    if (total > MAX_TOTAL_BYTES) return 'The combined upload is larger than 50 MB.';
    return '';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const files = Array.from(fileInput?.files || []);
    const fileError = validateFiles(files);
    if (fileError) { setStatus(fileError, 'error'); return; }

    setStatus();
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Uploading…'; }

    try {
      const data = new FormData(form);
      const response = await fetch('/api/document-upload', { method: 'POST', body: data });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to upload the documents. Please try again.');

      const ref = result.requestId ? ` Reference: ${result.requestId}.` : '';
      setStatus(`Thank you. Your documents were received successfully.${ref} We’ll be in touch shortly.`, 'success');
      form.reset();
      if (selectedFiles) selectedFiles.textContent = '';
    } catch (error) {
      setStatus(error.message || 'Unable to upload the documents. Please try again.', 'error');
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = 'Upload Documents'; }
    }
  });
})();
