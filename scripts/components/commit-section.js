const nice =
  "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";

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
  const paginationControls = document.getElementById("pagination-controls");
  const prevButton = document.getElementById("prev-page-btn");
  const nextButton = document.getElementById("next-page-btn");
  const pageInfo = document.getElementById("page-info");

  if (!commitList || !paginationControls) {
    console.error("Fel: Nödvändiga HTML-element saknas.");
    return;
  }

  paginationControls.style.display = "none";

  try {
    const templateElement = document.getElementById("commit-item-templates");
    if (!templateElement) {
      throw new Error(
        "Kunde inte hitta commit-mallen (#commit-item-templates)."
      );
    }
    const templateFragment = templateElement.content;

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?author=${commitAuthor}&per_page=100`;
    const apiResponse = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${nice}` },
    });

    if (!apiResponse.ok) {
      throw new Error(
        `Nätverksfel vid hämtning av commits: Status ${apiResponse.status}`
      );
    }

    const allCommits = await apiResponse.json();
    commitList.innerHTML = "";
    commitListHeader.innerHTML = "";

    if (allCommits.length === 0) {
      commitList.innerHTML = `<p>Hittade inga commits från ${commitAuthor}.</p>`;
      return;
    }

    let currentPage = 1;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(allCommits.length / itemsPerPage);

    const renderPage = (page) => {
      commitList.innerHTML = "";

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const commitsForPage = allCommits.slice(start, end);

      commitsForPage.forEach((commitData) => {
        const commitElement = createCommitElement(commitData, templateFragment);
        commitList.appendChild(commitElement);
      });

      pageInfo.textContent = `Sida ${page} av ${totalPages}`;
      prevButton.disabled = page === 1;
      nextButton.disabled = page >= totalPages;
    };

    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    });

    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    });

    const headerElement = document.createElement("div");
    headerElement.classList.add("commit-header-info");
    headerElement.innerHTML = `
      <h3>Commits av ${commitAuthor} på ${repoName}</h3>
      <p>Visar ${allCommits.length} totala bidrag.</p>
    `;
    commitListHeader.appendChild(headerElement);

    paginationControls.style.display = "flex";
    renderPage(1);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
    const container = document.getElementById("commit-list-container");
    container.innerHTML = `<p class="error-message">Kunde inte ladda commits. Fel: ${error.message}</p>`;
  }
}
