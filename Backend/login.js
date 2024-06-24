async function envoiFormulaire() {
    const btnEnvoyer = document.querySelector("#connexion")
    btnEnvoyer.addEventListener("submit", async function (event) {
        event.preventDefault()
        const identifiant = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const chargeUtile = JSON.stringify(identifiant)
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile
        })
        const haha = await response.json()
        console.log(haha)
    })
}

envoiFormulaire()