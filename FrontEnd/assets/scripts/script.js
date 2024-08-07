///////////////////////////////////////////////////////////////////////////////
////////////////////////////    VARIABLES    //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// On recupère les projets et les catégories via l'API
const swagger = await fetch("http://localhost:5678/api/works")
const projets = await swagger.json()
const swaggerCategories = await fetch("http://localhost:5678/api/categories")
const categories = await swaggerCategories.json()

// Déclaration des variables
const headerEdition = document.querySelector(".header-edition")
const gallery = document.querySelector(".gallery")
const filtres = document.querySelector(".filtres")
const setCategories = new Set()
const token = localStorage.getItem("token")
const loginLogout = document.querySelector(".login-logout")
const boutonModifier = document.querySelector(".modifier")
const btnPrecedant = document.querySelector(".btn-precedant")
const croixIcone = document.querySelector(".croix-icone")
const croixModale = document.querySelector(".croix-modale")
const modale = document.querySelector(".modale")
const titreModale = document.querySelector(".titre-modale")
const photosModale = document.querySelector(".modifier-photos")
const sectionAjouterPhotos = document.querySelector(".section-ajouter-photos")
const divBtnAjouterModale = document.querySelector(".btn-ajouter-modale")
const btnAjouterModale = document.querySelector(".btn-ajouter-modale button")
const uploadButton = document.querySelector(".upload button")
const btnPostWork = document.getElementById("formulaire-ajout")
const ajouterPhoto = document.getElementById("ajouter-photo")
const submitBtn = document.getElementById("post-work")
const inputs = document.querySelectorAll(".input")

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////    PROJETS    ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

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
categories.forEach(category => {setCategories.add(category)})

  for (const i of setCategories) {
    const nomCategorie = i.name;
    const button = document.createElement("button")

    button.className = `btn${nomCategorie}`
    button.textContent = nomCategorie
    filtres.appendChild(button)

    button.addEventListener("click", () => {
      filtrage(nomCategorie)
      couleurBtnFiltrage(button)
    });
  };
};

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////    FILTRES    ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Couleur des boutons filtres au click via une fonction
function couleurBtnFiltrage(button) {
        const buttons = document.querySelectorAll(".filtres button, .tous")
        buttons.forEach(btn => btn.classList.remove("selected"))
        button.classList.add("selected")
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
          }
        }

///////////////////////////////////////////////////////////////////////////////
/////////////////////////    BOUTON MODIFIER    ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// On fait appraître le bouton "Modifier" si on est connecté
if (token) {
  loginLogout.innerHTML = `<a href="index.html">logout</a>`
  loginLogout.addEventListener("click", (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    window.location.href = "index.html"
  })
  boutonModifier.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>
    </svg>
    modifier
    </a>
    `
  headerEdition.style.display = null
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////    MODALE    ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function afficherModale(e) {
  e.preventDefault()
  const modale = document.querySelector(".modale")
  modale.style.display = null
  genererPhotosModale()
  sectionAjouterPhotos.style.display = "none"
  btnPrecedant.style.display = "none"
  croixModale.style.justifyContent = "flex-end"
  divBtnAjouterModale.classList.remove("hidden")
  titreModale.innerHTML = `Galerie photo`
  
}

function fermerModale(e) {
  modale.style.display = "none"
}

boutonModifier.addEventListener("click", afficherModale)
croixIcone.addEventListener("click", fermerModale)

// On ferme la modale si on clique à côté
modale.addEventListener("click", (e) => {
  const modaleWrapper = document.querySelector(".modale-wrapper");
  if (!(modaleWrapper.contains(e.target))) {
    fermerModale()
  }
});

// Génération des photos et l'icône "supprimer" dans la modale
function genererPhotosModale() {
  photosModale.innerHTML = ``
  for (let i = 0; i < projets.length; i++) {
    photosModale.innerHTML += `
    <div class="conteneur-modifier-photos">
      <img src="${projets[i].imageUrl}">
      <div class="trash" id="${projets[i].id}">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <a href="#">
            <rect width="17" height="17" rx="2" fill="black"/>
            <path d="M6.71607 3.35558C6.82455 3.13661 7.04754 3 7.29063 3H9.70938C9.95246 3 10.1754 3.13661 10.2839 3.35558L10.4286 3.64286H12.3571C12.7127 3.64286 13 3.93013 13 4.28571C13 4.64129 12.7127 4.92857 12.3571 4.92857H4.64286C4.28728 4.92857 4 4.64129 4 4.28571C4 3.93013 4.28728 3.64286 4.64286 3.64286H6.57143L6.71607 3.35558ZM4.64286 5.57143H12.3571V12C12.3571 12.7092 11.7806 13.2857 11.0714 13.2857H5.92857C5.21942 13.2857 4.64286 12.7092 4.64286 12V5.57143ZM6.57143 6.85714C6.39464 6.85714 6.25 7.00179 6.25 7.17857V11.6786C6.25 11.8554 6.39464 12 6.57143 12C6.74821 12 6.89286 11.8554 6.89286 11.6786V7.17857C6.89286 7.00179 6.74821 6.85714 6.57143 6.85714ZM8.5 6.85714C8.32321 6.85714 8.17857 7.00179 8.17857 7.17857V11.6786C8.17857 11.8554 8.32321 12 8.5 12C8.67679 12 8.82143 11.8554 8.82143 11.6786V7.17857C8.82143 7.00179 8.67679 6.85714 8.5 6.85714ZM10.4286 6.85714C10.2518 6.85714 10.1071 7.00179 10.1071 7.17857V11.6786C10.1071 11.8554 10.2518 12 10.4286 12C10.6054 12 10.75 11.8554 10.75 11.6786V7.17857C10.75 7.00179 10.6054 6.85714 10.4286 6.85714Z" fill="white"/>
            </a>
          </svg>
      </div>
    </div>
    `;
  }
  photosModale.classList.remove("hidden")
  supprimerPhotosModale()
}

///////////////////////////////////////////////////////////////////////////////
///////////////////   SUPPRESSION/AJOUT PHOTOS MODALE   ///////////////////////
///////////////////////////////////////////////////////////////////////////////

function supprimerPhotosModale() {
  const trashIcons = document.querySelectorAll(".trash")
  trashIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const iconId = this.id
        const urlApi = "http://localhost:5678/api/works/" + iconId
        console.log(token)
              fetch(urlApi, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
          })
  })
})
}

// On change le contenu de la modale au clic du bouton
btnAjouterModale.addEventListener("click", (e) => {
  titreModale.innerHTML = `Ajout Photo`
  sectionAjouterPhotos.style.display = null
  photosModale.innerHTML = ``
  photosModale.classList.add("hidden")
  divBtnAjouterModale.classList.add("hidden")
  btnPrecedant.style.display = null
  croixModale.style.justifyContent = "space-between"
  categoriesFormulaire()
  btnPrecedant.addEventListener("click", afficherModale)
  })

// Impossibilité de submit le formulaire quand il n'est pas rempli
inputs.forEach(input => {
  input.addEventListener("input", checkFormulaire)
})

function checkFormulaire() {
  let inputCheck = true
  inputs.forEach(input => {
    if (!input.value) {
      inputCheck = false
    }
  })
  if (inputCheck) {
  submitBtn.disabled = false
  submitBtn.classList.remove("disabled")
  } else {
  submitBtn.disabled = true
  submitBtn.classList.add("disabled")
  }
}

// On génère dynamiquement les catégories dans le formulaire
function categoriesFormulaire() {
  const selectCategorie = document.querySelector("#ajout-categorie-projet")
  selectCategorie.innerHTML = ``
  for (let i = 0; i < categories.length; i++) {
    const nomCategorie = categories[i].name
    const select = document.createElement("option")
    select.id = i + 1
    select.textContent = nomCategorie
    selectCategorie.appendChild(select)
  }
}

// On assigne le déclenchement de l'input[type="file"] au bouton visible
uploadButton.addEventListener("click", function(e) {
  e.preventDefault()
  document.getElementById("ajouter-photo").click()
})

// Prévisualisation de l'image que l'on va ajouter
ajouterPhoto.addEventListener("change", () => {
  const preview = document.getElementById("preview")
  const file = ajouterPhoto.files[0]

  if (file) {
    const elements = document.querySelectorAll('.bloc-ajouter-photos > *');
    elements.forEach(element => {
      if (element.tagName.toLowerCase() !== 'img') {
          element.style.display = 'none'
      }
    })
    const reader = new FileReader()
        reader.onload = e => {
            preview.src = e.target.result
        }
        reader.readAsDataURL(file)
  }
})

// Au submit du formulaire, on appelle l'API pour ajouter un projet
// dynamiquement à la galerie via une fonction anonyme
btnPostWork.addEventListener("submit", e => {
  e.preventDefault()
  const data = new FormData() 
  data.append('image', document.getElementById('ajouter-photo').files[0]);
  data.append('title', document.getElementById('titre-projet').value);
  data.append('category', document.getElementById('ajout-categorie-projet').selectedOptions[0].id);

  fetch("http://localhost:5678/api/works", {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
  },
    body: data
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
})