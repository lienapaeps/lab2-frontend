<script setup>
</script>

<template>
    <form action="#">
        <h1>Welkom terug</h1>
        <p>Nog geen account? <a href="#">Registeren</a></p>
        <div class="alert hidden">
            Here is some feedback
        </div>
        <div class="row">
            <label for="email">E-mail</label>
            <input type="text" id="email" name="email">
        </div>
        <div class="row">
            <label for="password">Wachtwoord</label>
            <input type="password" id="password" name="password">
        </div>
        <p><a href="#">Wachtwoord vergeten?</a></p>
        <div class="row">
            <a class="btn" href="#">Inloggen</a>
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
