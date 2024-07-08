async function envoiFormulaire() {
    const btnEnvoyer = document.querySelector("#connexion")
    btnEnvoyer.addEventListener("submit", async function (event) {
        event.preventDefault()
        const identifiant = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const chargeUtile = JSON.stringify(identifiant)

        try {
            const reponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: chargeUtile
            })

            if (!reponse.ok) {
                throw new Error("Erreur HTTP : " + reponse.status);
            }

            const data = await reponse.json();
            console.log("Réponse de l'API :", data);

            if (data.token && data.userId) {
            
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);

                window.location.href = "index.html"

            } else {
                // Si les données ne sont pas correctes, affichez un message d'erreur
                throw new Error("Données de connexion incorrectes");
            }

        } catch (error) {
            console.log(error);
            const messageErreur = document.querySelector("#messageErreur")
            messageErreur.innerText = "Vos identifiants sont incorrects."
        }
        })
}

envoiFormulaire()