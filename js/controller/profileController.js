import { fetchBoxers } from '../model/boxersModel.js';
import { setupModalListeners, showContactModal } from '../view/modalView.js';

let boxersData = [];

export async function initProfileController() {
  boxersData = await fetchBoxers();
  setupModalListeners();
  initTabSwitching();
  initNotificationButtons();
  initSparringButtons();
  updateNotificationCount();
}

function initTabSwitching() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

function initNotificationButtons() {
  const acceptButtons = document.querySelectorAll('.btn-accept');
  const cancelButtons = document.querySelectorAll('.btn-cancel');

  acceptButtons.forEach(button => {
    button.addEventListener('click', function () {
      const notification = this.closest('.notification-item');
      this.textContent = 'confirmed';
      this.disabled = true;
      const cancelBtn = notification.querySelector('.btn-cancel');
      if (cancelBtn) cancelBtn.style.display = 'none';
      updateNotificationCount();
    });
  });

  cancelButtons.forEach(button => {
    button.addEventListener('click', function () {
      const notification = this.closest('.notification-item');
      this.textContent = 'cancelled';
      this.disabled = true;
      const acceptBtn = notification.querySelector('.btn-accept');
      if (acceptBtn) acceptBtn.style.display = 'none';
      updateNotificationCount();
    });
  });
}

function initSparringButtons() {
  document.querySelectorAll('.btn-finished').forEach(button => {
    button.addEventListener('click', handleFinishedClick);
  });

  document.querySelectorAll('.btn-contact').forEach(button => {
    button.addEventListener('click', handleContactClick);
  });
}

function handleFinishedClick(e) {
  const sparringItem = e.target.closest('.sparring-item');
  const pastTab = document.getElementById('past');
  if (!sparringItem || !pastTab) return;

  const clone = sparringItem.cloneNode(true);
  const actions = clone.querySelector('.sparring-actions');
  if (actions) {
    const finishedBtn = actions.querySelector('.btn-finished');
    if (finishedBtn) finishedBtn.remove();

    const badge = document.createElement('div');
    badge.textContent = 'Finished';
    badge.style.cssText = ` background-color: rgb(112, 134, 113); color: white; padding: 5px;`;

    const contactBtn = actions.querySelector('.btn-contact');
    if (contactBtn) actions.insertBefore(badge, contactBtn);
    else actions.appendChild(badge);
  }

  pastTab.appendChild(clone);
  sparringItem.remove();
  initSparringButtons();
}

function handleContactClick(e) {
  const sparringItem = e.target.closest(".sparring-item");
  const boxerName = sparringItem?.querySelector("h4")?.textContent.trim();
  const boxer = boxersData.find(b => b.name.toLowerCase() === boxerName.toLowerCase());

  if (boxer) {
    showContactModal(boxer);
  } else {
    alert("Contact info not found for " + boxerName);
  }
}

function updateNotificationCount() {
  const countElement = document.querySelector('.notification-count');
  const active = document.querySelectorAll('.notification-item .btn-accept:not([disabled])');
  const count = active.length;

  countElement.textContent = count;
  countElement.style.display = count === 0 ? 'none' : 'inline-block';
}
