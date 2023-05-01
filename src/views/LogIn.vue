<script setup>
import LogInForm from '../components/LogInForm.vue'
</script>

<template>
    <div class="row">
        <div class="login--image"><img src="./../assets/loginImage.jpg" alt=""></div>
        <div class="login--form">
            <LogInForm />
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

.login--image {
    display: none;
}

.login--form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/*  desktop */
@media (min-width: 992px) {
    .login--image {
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

    .login--image img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
    }

    .login--form {
        width: 50%;
    }

    form {
        width: 50%;
    }
}
</style>
