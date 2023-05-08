<script setup>
import router from '../router/router';

import { ref, onMounted } from 'vue';

//inloggen 
function login() {
    let btnLogin = document.querySelector(".btn--login").addEventListener("click", function () {
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then((json) => {
                if (json.status === "success") {
                    router.push("/");
                } else {
                    let feedback = document.querySelector(".alert");
                    // console.log(json.message);
                    feedback.textContent = json.message;
                    feedback.classList.remove("hidden");
                    feedback.style.backgroundColor = "#f8d7da";
                    feedback.style.color = "#C82424";
                }
            })
            .catch(error => console.log(error));
    })
}

onMounted(() => {
    login();
})

</script>

<template>
    <form action="#">
        <h1>Welkom terug</h1>
        <p>Nog geen account? <router-link exact to="/registreer">Registreren</router-link>
        </p>
        <div class="alert hidden">
            Here is some feedback
        </div>
        <div class="row">
            <label for="email">E-mail</label>
            <input type="text" id="email" name="email" required>
        </div>
        <div class="row">
            <label for="password">Wachtwoord</label>
            <input type="password" id="password" name="password" required>
        </div>
        <p><a href="#">Wachtwoord vergeten?</a></p>
        <div class="row">
            <a class="btn btn--login" href="#">Inloggen</a>
        </div>
        <div class="row">
            <a class="btn--outline" href="#">Inloggen met Google</a>
        </div>
    </form>
</template>

<style scoped>
input[type=text],
input[type=password] {
    width: 100%;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

label {
    padding: .5rem 1rem .5rem 0;
    display: inline-block;
}

.row {
    margin-top: 1rem;
}
</style>
