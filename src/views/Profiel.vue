<script setup>
if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

import ProfielCard from '../components/ProfielCard.vue';
</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Profiel</h1>
            <div class="profile">
                <p>Profiel wijzigen</p>
            </div>
            <div class="instellingen">
                <h2>Instellingen</h2>
                <ProfielCard text="Mijn gewassen" src="veld.svg" router="/" />
                <ProfielCard text="Privacy" src="lock.svg" router="/" />
                <ProfielCard text="Meldingen" src="bell.svg" router="/" />
            </div>
            <div class="verhuren">
                <h2>Verhuren</h2>
                <ProfielCard text="Verhuur mijn veld" src="verhuren.svg" router="/" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
.container {
    display: flex;
    flex-direction: column;
}

.content {
    position: absolute;
    top: 5%;
    margin-left: 25%;
    width: 70%;
}

.instellingen .gewassen,
.instellingen .privacy,
.instellingen .meldingen,
.verhuren .veld {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: .5rem 2rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left {
    display: flex;
    align-items: center;
    gap: 2rem;
}


/*  desktop */
@media (min-width: 992px) {}
</style>