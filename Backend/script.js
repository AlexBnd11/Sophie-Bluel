const response = await fetch("http://localhost:5678/api/works")
const swagger = await response.json();

  const gallery = document.querySelector(".gallery");

  for (let i = 0; i < swagger.length; i++) {
    gallery.innerHTML += `
  <figure>
    <img src="${swagger[i].imageUrl}" alt="${swagger[i].title}">
    <figcaption>${swagger[i].title}</figcaption>
  </figure>
  `
  }