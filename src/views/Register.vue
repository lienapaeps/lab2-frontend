<script setup>
import RegisterForm from '../components/RegisterForm.vue';
</script>

<template>
    <div class="row">
        <div class="register--image"><img src="./../assets/registerImage.jpg" alt=""></div>
        <div class="register--form">
            <RegisterForm />
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
.row {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.register--image {
    display: none;
}

.register--form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/*  desktop */
@media (min-width: 992px) {
    .register--image {
        display: block;
        width: 50%;
    }

    .row {
        height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: hidden;
    }

    .register--image img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
    }

    .register--form {
        width: 50%;
    }

    form {
        width: 50%;
    }
}
</style>
