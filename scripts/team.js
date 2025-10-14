const axel = document.querySelector(".profilecomp.axel");
const fabian = document.querySelector(".profilecomp.fabian");
const contentWrapper = document.querySelector(".content-wrapper-team");
const contentWrapperStyle = window.getComputedStyle(contentWrapper);

// Läggs bara till på mobilversionen av sidan, när main content wrapper har display: block
if (contentWrapperStyle.display == "block") {
  window.addEventListener("scroll", mobileAnimation);
}

function mobileAnimation() {
  // Lägger positionerna av profilkorten i variabler
  let axelPosition = axel.getBoundingClientRect();
  let fabianPosition = fabian.getBoundingClientRect();

  // Om profilkortet har en specifik position på sidan
  if (axelPosition.bottom < 1050) {
    // Lägger till en klass i elementet som visar profilkortet via en animation
    axel.classList.add("animate");
  }

  if (fabianPosition.bottom < 1050) {
    fabian.classList.add("animate");
    // Så att programmet inte försöker lägga till klasser som elementen redan har
    window.removeEventListener("scroll", mobileAnimation);
  }
}

const membersJsonString = `{
	"members": [
		{
			"name": "Siri",
			"description": "Grafisk designer som vill bredda sig inom webb. Gillar alla möjliga kreativa grejer och hoppas att programmering kan bli mitt nästa kreativa utlopp."
		},
		{
			"name": "Axel",
			"description": "Älskar att lära mig nya saker, brinner för utforskande, skapande, förbättring och framförallt att ha kul under tiden. Letar alltid efter nya projekt och äventyr."
		},
		{
			"name": "Fabian",
			"description": "Nyfiken och lösningsorienterad. Har byggt en del av sidan som du är på just nu och förhoppningsvis många fler i framtiden :)"
		}
	]
}`;

function parseJson(membersAsString) {
  return JSON.parse(membersAsString);
}

const membersData = parseJson(membersJsonString);

document.querySelector(".profilelink.siri").innerText = membersData.members[0].name;
document.querySelector(".profilelink.axel").innerText = membersData.members[1].name;
document.querySelector(".profilelink.fabian").innerText = membersData.members[2].name;

document.querySelector(".profiletext.siri").innerText = membersData.members[0].description;
document.querySelector(".profiletext.axel").innerText = membersData.members[1].description;
document.querySelector(".profiletext.fabian").innerText = membersData.members[2].description;
