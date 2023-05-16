<script setup>
if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Inbox</h1>
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

h1 {
    color: var(--offWhite);
}

.content {
    position: absolute;
    width: 70%;
    margin-left: 40px;
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