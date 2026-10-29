/* Native publication dialogs; paper links remain usable without this enhancement. */
(() => {
  'use strict';

  const initialize = () => {
    const dialogs = [...document.querySelectorAll('dialog[data-research-dialog]')];
    if (!dialogs.length) return;
    const triggers = new WeakMap();

    const updateBody = () => {
      document.body.classList.toggle('dialog-open', dialogs.some(dialog => dialog.open));
    };

    dialogs.forEach(dialog => {
      dialog.addEventListener('close', () => {
        updateBody();
        const trigger = triggers.get(dialog);
        triggers.delete(dialog);
        if (trigger && trigger.isConnected && typeof trigger.focus === 'function') {
          trigger.focus({ preventScroll: true });
        }
      });

      dialog.addEventListener('click', event => {
        const closeButton = event.target.closest && event.target.closest('[data-dialog-close]');
        if (closeButton && dialog.contains(closeButton)) {
          event.preventDefault();
          dialog.close();
          return;
        }

        // The native backdrop dispatches its click on the dialog itself.
        // A click within the panel, including its empty space, stays open.
        if (event.target !== dialog) return;
        const panel = dialog.querySelector('.research-dialog-panel');
        if (!panel) return;
        const bounds = panel.getBoundingClientRect();
        const outside = event.clientX < bounds.left || event.clientX > bounds.right
          || event.clientY < bounds.top || event.clientY > bounds.bottom;
        if (outside && dialog.open) dialog.close();
      });
    });

    document.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0
        || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const trigger = event.target.closest && event.target.closest('[data-work-open]');
      if (!trigger) return;
      const id = trigger.dataset.dialogId;
      if (!id) return;
      const dialog = document.getElementById(id) || document.getElementById(`paper-${id}`);
      if (!dialog || !dialogs.includes(dialog) || typeof dialog.showModal !== 'function') return;
      if (dialog.open) {
        event.preventDefault();
        return;
      }

      try {
        dialog.showModal();
      } catch (_) {
        // Retain the anchor's paper destination if the enhancement cannot open.
        return;
      }
      event.preventDefault();
      triggers.set(dialog, trigger);
      updateBody();
    });

    updateBody();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
