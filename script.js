/**
 * Laddar en HTML-komponent från en fil och ERSÄTTER ett specificerat element med den.
 * @param {string} url - Sökvägen till HTML-filen för komponenten.
 * @param {string} elementId - ID på platshållarelementet som ska ersättas.
 */

function loadComponent(url, elementId) {
  // https://developer.mozilla.org/docs/Web/API/Window/fetch
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Nätverksfel: ${response.statusText}`);
      return response.text();
    })
    .then((html) => {
      const element = document.getElementById(elementId);
      if (element) {
        // Skapa ett tillfälligt template-element för att konvertera HTML-strängen
        const template = document.createElement("template");
        template.innerHTML = html.trim(); // .trim() tar bort oönskade blanksteg https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
        // spreada in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        element.replaceWith(...template.content.childNodes);
      } else {
        console.error(`Fel: Elementet med id '${elementId}' hittades inte.`);
      }
    })
    .catch((error) => {
      console.error(`Fel vid laddning av komponent från ${url}:`, error);
    });
}

// https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("./components/header.html", "header-placeholder");
  loadComponent("./components/footer.html", "footer-placeholder");
});
