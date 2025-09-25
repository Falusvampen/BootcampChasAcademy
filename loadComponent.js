/**
 * Laddar en HTML-komponent från en fil och ERSÄTTER ett specificerat element med den.
 * @param {string} url - Sökvägen till HTML-filen för komponenten.
 * @param {string} elementId - ID på platshållarelementet som ska ersättas.
 * @param {function} [callback] - Valfri funktion som körs när komponenten har laddats. https://www.w3schools.com/js/js_callback.asp
 */
function loadComponent(url, elementId, callback) {
  // https://developer.mozilla.org/docs/Web/API/Window/fetch
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Nätverksfel: ${response.statusText}`);
      return response.text();
    })
    .then((html) => {
      // https://developer.mozilla.org/docs/Web/API/Window/document
      // https://developer.mozilla.org/docs/Web/API/Document/getElementById
      const element = document.getElementById(elementId);
      if (element) {
        const template = document.createElement("template");
        template.innerHTML = html.trim(); // .trim() tar bort oönskade blanksteg https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
        // https://developer.mozilla.org/docs/Web/API/Element/innerHTML
        // spreada in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        element.replaceWith(...template.content.childNodes);
        // https://developer.mozilla.org/docs/Web/API/HTMLTemplateElement/content
        // https://developer.mozilla.org/docs/Web/API/Node/childNodes
        if (callback && typeof callback === "function") {
          callback();
        }
      } else {
        console.error(`Fel: Elementet med id '${elementId}' hittades inte.`);
      }
    })
    .catch((error) => {
      console.error(`Fel vid laddning av komponent från ${url}:`, error);
    });
}

function initializeHeaderMenu() {
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

document.addEventListener("DOMContentLoaded", function () {
  loadComponent(
    "/BootcampChasAcademy/components/header.html",
    "header-placeholder",
    initializeHeaderMenu
  );

  loadComponent("/BootcampChasAcademy/components/footer.html", "footer-placeholder");
});
