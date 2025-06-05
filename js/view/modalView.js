// ====== CONTACT MODAL ======
export function setupModalListeners() {
  const modal = document.getElementById("contactModal");
  const closeBtn = modal?.querySelector(".close-button");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.style.display = "none");
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

export function showContactModal(boxer) {
  const modal = document.getElementById("contactModal");

  const instagramLink = document.querySelector(".contact-item.instagram .contact-value a");
  const phoneLink = document.querySelector(".contact-item.phone .contact-value a");

  instagramLink.href = `https://instagram.com/${boxer.contacts.instagram.replace("@", "")}`;
  instagramLink.textContent = boxer.contacts.instagram;

  phoneLink.href = `tel:${boxer.contacts.phone.replace(/\s+/g, "")}`;
  phoneLink.textContent = boxer.contacts.phone;

  modal.style.display = "block";
}

// ====== INVITE (SPARRING) MODAL ======

export function setupInviteModal() {
  const modal = document.getElementById("invite-modal");
  const closeBtn = modal.querySelector(".close-button");
  const confirmBtn = document.getElementById("confirm-invite");

  // Закриття по кнопці
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

  // Закриття по кліку поза вікном
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
}

export function showInviteModal() {
  const modal = document.getElementById("invite-modal");
  modal.classList.remove("hidden");
}

