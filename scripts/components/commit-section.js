/**
 * Skapar ett HTML-element för en commit genom att klona och fylla en HTML-mall.
 * @param {object} commitData - Datan för en commit från GitHub API.
 * @param {DocumentFragment} templateFragment - Ett DocumentFragment som innehåller HTML-mallarna.
 * @returns {HTMLElement} Ett ifyllt div-element som representerar en commit.
 */

function createCommitElement(commitData, templateFragment) {
  const { commit, html_url } = commitData;
  const messageParts = commit.message.split("\n\n");
  const title = messageParts[0];
  const body = messageParts.slice(1).join("\n\n");
  const commitDate = new Date(commit.author.date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const templateSelector = body
    ? '[data-template="with-body"]'
    : '[data-template="simple"]';
  const template = templateFragment.querySelector(templateSelector);
  const commitElement = template.cloneNode(true);

  commitElement.querySelector("[data-commit-link]").href = html_url;
  commitElement.querySelector("[data-commit-title]").textContent = title;
  commitElement.querySelector("[data-commit-author]").textContent =
    commit.author.name;
  commitElement.querySelector("[data-commit-date]").textContent = commitDate;

  if (body) {
    commitElement.querySelector("[data-commit-body]").innerHTML = body.replace(
      /\n/g,
      "<br>"
    );
  }

  return commitElement;
}

/**
 * Hämtar först en HTML-mall, sedan commits från GitHub API, och visar dem.
 * @param {string} repoOwner - Ägaren av repositoryt.
 * @param {string} repoName - Namnet på repositoryt.
 * @param {string} commitAuthor - GitHub-användarnamnet.
 */
export async function fetchAndRenderCommits(repoOwner, repoName, commitAuthor) {
  const commitListHeader = document.getElementById("commit-list-header");
  const commitList = document.getElementById("commit-list");

  if (!commitList || !commitListHeader) {
    console.error(
      "Fel: Kunde inte hitta #commit-list eller #commit-list-header."
    );
    return;
  }

  if (GITHUB_TOKEN) {
    console.error("GitHub Access Token available.");
  }

  try {
    const templateElement = document.getElementById("commit-item-templates");
    if (!templateElement) {
      throw new Error(
        "Kunde inte hitta commit-mallen (#commit-item-templates) på sidan."
      );
    }
    const templateFragment = templateElement.content;

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?author=${commitAuthor}`;
    const apiResponse = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

    if (!apiResponse.ok) {
      throw new Error(
        `Nätverksfel vid hämtning av commits: Status ${apiResponse.status}`
      );
    }

    const commits = await apiResponse.json();
    commitListHeader.innerHTML = "";
    commitList.innerHTML = "";
    const commitsToShow = commits.slice(0, 100);

    const headerElement = document.createElement("div");
    headerElement.classList.add("commit-header-info");
    headerElement.innerHTML = `
        <h3>Commits av ${commitAuthor} på ${repoName}</h3>
        <p>Visar de ${commitsToShow.length} senaste bidragen.</p>
    `;
    commitListHeader.appendChild(headerElement);

    if (commitsToShow.length === 0) {
      commitList.innerHTML =
        "<p>Hittade inga commits från denna användare i detta repo.</p>";
      return;
    }

    commitsToShow.forEach((commitData) => {
      const commitElement = createCommitElement(commitData, templateFragment);
      commitList.appendChild(commitElement);
    });
  } catch (error) {
    console.error("Ett fel uppstod:", error);
    const container = document.getElementById("commit-list-container");
    container.innerHTML = `<p class="error-message">Kunde inte ladda commits. Fel: ${error.message}</p>`;
  }
}