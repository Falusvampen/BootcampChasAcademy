//  Den här koden känner av om sidan körs på GitHub Pages eller en lokal server.
//  Den skapar och infogar en <base>-tagg i <head> för att säkerställa att alla
//  relativa sökvägar (för länkar, bilder, skript etc.) fungerar korrekt i båda miljöerna.

const repositoryName = "BootcampChasAcademy";

function setBasePath() {
  // Kollar om webbadressen innehåller 'github.io', vilket indikerar att vi är på GitHub Pages.
  const isGitHub = window.location.hostname.includes("github.io");

  // Bestämmer bas-sökvägen.
  // Om vi är på GitHub, använd '/repositoryName/'. Annars, använd '/' för lokal server.
  const basePath = isGitHub ? `/${repositoryName}/` : "/";

  // Hitta om det redan finns en <base>-tagg. Om inte, skapa en.
  let baseTag = document.querySelector("base");
  if (!baseTag) {
    baseTag = document.createElement("base");

    // Sätt 'href'-attributet till den korrekta sökvägen.
    baseTag.setAttribute("href", basePath);

    // Lägg till <base>-taggen allra först i <head> så att alla andra länkar påverkas korrekt.
    document.head.prepend(baseTag);
  }
}

setBasePath();
