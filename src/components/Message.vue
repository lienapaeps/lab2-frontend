<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    router: {
        type: String,
        required: true
    }
})
</script>

<template>
    <router-link :to="props.router">
        <div class="card">
            <div class="card-info">
                <div class="left">
                    <img :src="props.src" alt="">
                    <p>{{ props.text }}</p>
                </div>
                <div class="notification">
                    <p>1</p>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
a {
    color: var(--offBlack900);
}

.card .card-info {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: .5rem 1.5rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

img {
    width: 40px;
}

p {
    font-size: 1rem;
    font-weight: bold;
}

.notification {
    background-color: var(--deepSeaGreen500);
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.notification p {
    font-weight: normal;
}

/*  desktop */
@media (min-width: 992px) {
    .left {
        gap: 1.5rem;
    }

    img {
        width: 45px;
    }
}
</style>