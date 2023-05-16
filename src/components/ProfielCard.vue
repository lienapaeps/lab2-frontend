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
        required: false
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
                <img src="/chevron-right.svg" alt="Right arrow">
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