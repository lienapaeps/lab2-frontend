<script setup>
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
            <input type="text" id="firstname" name="firstname">
        </div>
        <div class="row">
            <label for="lastname">Achternaam</label>
            <input type="text" id="lastname" name="lastname">
        </div>
        <div class="row">
            <label for="email">E-mail</label>
            <input type="text" id="email" name="email">
        </div>
        <div class="row">
            <label for="password">Wachtwoord</label>
            <input type="password" id="password" name="password">
        </div>
        <div class="row">
            <router-link class="btn" exact to="/home">Registreren</router-link>
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
