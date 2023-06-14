<script setup>
import ChatBox from '../components/ChatBox.vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <div class="container">
        <div class="content">
            <div class="arrow">
                <router-link exact to="/inbox">
                    <img src="./../assets/left-arrow.svg" alt="arrow" />
                </router-link>
            </div>
            <h1>Matthias</h1>
            <div class="chatbox">
                <ChatBox />
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
.container {
    background-color: var(--deepSeaGreen800);
    height: 75px;
    width: 100%;
    margin-left: 0px;
}

.burger {
    display: none;
}

h1 {
    color: var(--offWhite);
    text-align: center;
    width: 100%;
    margin-top: -3rem;
}

.content {
    position: absolute;
    width: 100%;
}

.chatbox {
    margin-top: 5rem;
}

.arrow {
    margin-top: 1rem;
    margin-left: 2rem;
}

/*  desktop */
@media (min-width: 992px) {
    .container {
        background-color: var(--offWhite);
    }

    h1 {
        color: var(--offBlack900);
    }

    .content {
        margin-left: 26%;
        padding-left: 1rem;
        margin-top: 1rem;
        width: 65%;
    }
}
</style>