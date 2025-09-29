/**
 * Initialiserar händelselyssnaren för hamburgermenyn i headern.
 * Växlar 'is-open'-klassen på knappen och navigationsmenyn.
 */
export function initializeHeaderMenu() {
  const hamburgerButton = document.getElementById("hamburger-btn");
  const mainNav = document.getElementById("main-nav");

  if (!hamburgerButton || !mainNav) {
    console.error("Kunde inte hitta hamburgermeny-knapp eller navigation.");
    return;
  }
  // https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener
  hamburgerButton.addEventListener("click", () => {
    // https://developer.mozilla.org/docs/Web/API/Element/classList
    hamburgerButton.classList.toggle("is-open");
    mainNav.classList.toggle("is-open");
  });
}
