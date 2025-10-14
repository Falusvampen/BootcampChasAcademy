const membersJsonString = `{
	"members": [
		{
			"name": "Siri",
			"description": "Grafisk designer som vill bredda sig inom webb. Gillar alla möjliga kreativa grejer och hoppas att programmering kan bli mitt nästa kreativa utlopp.",
			"className": "siri",
			"src": "images/Siri.webp",
			"alt": "En brunhårig tjej ler mot kameran",
			"href": "individuell/siri.html"
		},
		{
			"name": "Axel",
			"description": "Älskar att lära mig nya saker, brinner för utforskande, skapande, förbättring och framförallt att ha kul under tiden. Letar alltid efter nya projekt och äventyr.",
			"className": "axel",
			"src": "images/Axel.webp",
			"alt": "En kille med glasögon och ryggsäck står framför en bergskedja",
			"href": "individuell/axel.html"
		},
		{
			"name": "Fabian",
			"description": "Nyfiken och lösningsorienterad. Har byggt en del av sidan som du är på just nu och förhoppningsvis många fler i framtiden :)",
			"className": "fabian",
			"src": "images/Fabian.webp",
			"alt": "En kille med blå luvtröja står framför en å",
			"href": "individuell/Fabian.html"
		}
	]
}`;

function parseJson(membersAsString) {
  return JSON.parse(membersAsString);
}

const membersData = parseJson(membersJsonString);

let items = ""

for (const member of membersData.members) {
	items += `<figure class="profilecomp ${member.className}">
					<img class="profileimg" src="${member.src}" alt="${member.alt}">
					<h2 class="profileheading">
						<a class="profilelink" href="${member.href}">${member.name}</a>
					</h2>
					<figcaption class="profiletext ">
						${member.description}
					</figcaption>
				</figure>`
}

document.querySelector(".profiles").innerHTML = items


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