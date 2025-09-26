import { initializeHeaderMenu } from "./components/header.js";
import { fetchAndRenderCommits } from "./components/commit-section.js";

/**
 * Laddar en HTML-komponent från en fil och ERSÄTTER ett specificerat element med den.
 * @param {string} url - Sökvägen till HTML-filen för komponenten.
 * @param {string} elementId - ID på platshållarelementet som ska ersättas.
 * @param {function} [callback] - Valfri funktion som körs när komponenten har laddats. https://www.w3schools.com/js/js_callback.asp
 */
async function loadComponent(url, elementId, callback) {
  try {
    // https://developer.mozilla.org/docs/Web/API/Window/fetch
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Nätverksfel: ${response.statusText}`);
    }
    const html = await response.text();
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
  } catch (error) {
    console.error(`Fel vid laddning av komponent från ${url}:`, error);
  }
}

/**
 * Hittar och laddar alla komponenter som deklarerats i HTML med ett 'data-component'-attribut.
 */
function loadAllComponents() {
  const componentPlaceholders = document.querySelectorAll("[data-component]");

  componentPlaceholders.forEach((element) => {
    const componentName = element.dataset.component;
    const elementId = element.id;

    if (!elementId) {
      console.error(
        `Fel: Element med data-component="${componentName}" saknar ett ID.`
      );
      return;
    }

    const componentUrl = `../components/${componentName}.html`;
    let callback = null;

    if (componentName === "header") {
      callback = initializeHeaderMenu;
    } else if (componentName === "commit-section") {
      const repoOwner = element.dataset.repoOwner;
      const repoName = element.dataset.repoName;
      const author = element.dataset.author;

      if (!repoOwner || !repoName || !author) {
        console.error(
          `Fel: Komponent 'commit-section' saknar nödvändiga data-attribut.`
        );
        return;
      }

      callback = () => {
        fetchAndRenderCommits(repoOwner, repoName, author);
      };
    }

    loadComponent(componentUrl, elementId, callback);
  });
}

document.addEventListener("DOMContentLoaded", loadAllComponents);
