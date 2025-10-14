const skillsDataJSON = `[
  {
    "category": "Verktyg",
    "skills": [
      { "name": "Next", "link": "https://nextjs.org/" },
      { "name": "Nuxt", "link": "https://nuxt.com/" },
      { "name": "Angular", "link": "https://angular.dev/" },
      { "name": "Relay", "link": "https://relay.dev/" },
      { "name": "Jenkins", "link": "https://www.jenkins.io/" },
      { "name": "Docker", "link": "https://www.docker.com/" },
      {
        "name": "SonarCloud",
        "link": "https://www.sonarsource.com/products/sonarcloud/"
      },
      { "name": "Jest", "link": "https://jestjs.io/" },
      { "name": "Sanity", "link": "https://www.sanity.io/" },
      { "name": "Spring Boot", "link": "https://spring.io/projects/spring-boot" },
      { "name": "Github Actions", "link": "https://github.com/features/actions" },
      { "name": "AWS", "link": "https://aws.amazon.com/" },
      { "name": "Flutter", "link": "https://flutter.dev/" }
    ]
  },
  {
    "category": "Språk",
    "skills": [
      { "name": "TypeScript", "link": "https://www.typescriptlang.org/" },
      { "name": "Java", "link": "https://dev.java/" },
      { "name": "Golang", "link": "https://go.dev/" },
      { "name": "Python", "link": "https://www.python.org/" },
      { "name": "Rust", "link": "https://www.rust-lang.org/" },
      { "name": "Swift", "link": "https://developer.apple.com/swift/" },
      { "name": "Kotlin", "link": "https://kotlinlang.org/" },
      { "name": "Dart", "link": "https://dart.dev/" }
    ]
  }
]`;

const skillsData = JSON.parse(skillsDataJSON);

/**
 * Skapar ett listelement (<li>) för en enskild kompetens.
 * @param {Skill} skill - Förväntar sig ett objekt med 'name' och 'link'.
 */
const createSkillItem = (skill) => {
  const listItem = document.createElement("li");
  const link = document.createElement("a");

  link.href = skill.link;
  link.textContent = skill.name;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  listItem.appendChild(link);
  return listItem;
};

/**
 * Skapar ett komplett div-element för en hel kompetenskategori.
 * @param {SkillCategory} categoryData - Förväntar sig ett objekt med 'category' och en 'skills'-array.
 */
const createSkillCategory = (categoryData) => {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "skill-category";

  const categoryTitle = document.createElement("h3");
  categoryTitle.textContent = categoryData.category;

  const skillsList = document.createElement("ul");
  skillsList.className = "skills-list";

  categoryData.skills.forEach((skill) => {
    const skillItem = createSkillItem(skill);
    skillsList.appendChild(skillItem);
  });

  categoryDiv.appendChild(categoryTitle);
  categoryDiv.appendChild(skillsList);

  return categoryDiv;
};

/**
 * Renderar alla kompetenskategorier till DOM:en.
 * @param {SkillCategory[]} skillsData - Förväntar sig en array av 'SkillCategory'-objekt.
 */
const renderSkills = (skillsData) => {
  const skillsContainer = document.getElementById("skills-container");

  if (!skillsContainer) {
    console.error("Fel: Kunde inte hitta elementet med id 'skills-container'.");
    return;
  }
  // Förbättrad prestanda genom att använda DocumentFragment, den skapar en virtuell DOM i minnet, fråga i tex slack om ni undrar vad det är.
  const fragment = document.createDocumentFragment();

  skillsData.forEach((categoryData) => {
    const categoryElement = createSkillCategory(categoryData);
    fragment.appendChild(categoryElement);
  });

  skillsContainer.appendChild(fragment);
};

renderSkills(skillsData);
