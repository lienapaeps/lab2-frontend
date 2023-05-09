<script setup>
import router from '../router/router';

import { ref, onMounted } from 'vue';

function register() {
    let btnRegister = document.querySelector(".btn--register").addEventListener("click", function () {
        let firstname = document.querySelector("#firstname").value;
        let lastname = document.querySelector("#lastname").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
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

                    // console.log(json);

                    feedback.textContent = json.message;
                    feedback.classList.remove("hidden");
                    feedback.style.backgroundColor = "#f8d7da";
                    feedback.style.color = "#C82424";

                    // make screen bigger when error and scroll to top
                    window.scrollTo(0, 0);
                    document.querySelector(".row").style.height = "110vh";
                    document.querySelector(".row").style.overflow = "hidden";
                }
            })
            .catch(error => console.log(error));
    })
}

onMounted(() => {
    register();
})

</script>

<template>
    <form action="#">
        <h1>Account aanmaken</h1>
        <p>Al een account? <router-link exact to="/login">Inloggen</router-link>
        </p>
        <div class="alert hidden">
            Here is some feedback
        </div>
        <div class="row">
            <label for="firstname">Voornaam</label>
            <input type="text" id="firstname" name="firstname" required>
        </div>
        <div class="row">
            <label for="lastname">Achternaam</label>
            <input type="text" id="lastname" name="lastname" required>
        </div>
        <div class="row">
            <label for="email">E-mail</label>
            <input type="text" id="email" name="email" required>
        </div>
        <div class="row">
            <label for="password">Wachtwoord</label>
            <input type="text" id="password" name="password" required>
        </div>
        <div class="row">
            <a class="btn btn--register" href="#">registreren</a>
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
