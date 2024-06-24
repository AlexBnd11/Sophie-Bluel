// On recupère les projets et les catégories via l'API
const swagger = await fetch("http://localhost:5678/api/works");
const projets = await swagger.json();
const swaggerCategories = await fetch("http://localhost:5678/api/categories")
const categories = await swaggerCategories.json();

const gallery = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres");

genererProjetsEtCategories(projets, categories);

// On ajoute dynamiquement les projets et les filtres à la galerie
function genererProjetsEtCategories(projets, categories) {

              function genererProjets () {
                    for (let i = 0; i < projets.length; i++) {
                      gallery.innerHTML += `
                      <figure>
                      <img src="${projets[i].imageUrl}" alt="${projets[i].title}">
                      <figcaption>${projets[i].title}</figcaption>
                      </figure>
                      `;
                    }
                  }

        genererProjets();

        const tous = document.querySelector(".tous")
        tous.addEventListener("click", () => {
          gallery.innerHTML = ""
          genererProjets()
          couleurBtnFiltrage(tous)
        })

// On ajoute dynamiquement les catégories via un Set pour prévenir l'apparition de doublons
const setCategories = new Set();
categories.forEach(category => {setCategories.add(category)});

  for (const i of setCategories) {
    const nomCategorie = i.name;
    const button = document.createElement("button");

    button.className = `btn${nomCategorie}`;
    button.textContent = nomCategorie;
    filtres.appendChild(button);

    button.addEventListener("click", () => {
      filtrage(nomCategorie);
      couleurBtnFiltrage(button);
    });
  };
};

// On gère la couleur des boutons filtres au click via une fontion
function couleurBtnFiltrage(button) {
        const buttons = document.querySelectorAll(".filtres button, .tous");
        buttons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
      }


// On met le filtrage dans une fonction pour pouvoir l'utiliser lors d'un eventListener
function filtrage (categorie) {
        const objetsFiltres = projets.filter(function (projet) {return projet.category.name === categorie})
        
        gallery.innerHTML = ""
        
        for (let i = 0; i < objetsFiltres.length; i++) {
          gallery.innerHTML += `
          <figure>
            <img src="${objetsFiltres[i].imageUrl}" alt="${objetsFiltres[i].title}">
            <figcaption>${objetsFiltres[i].title}</figcaption>
          </figure>
          `
          };
        };