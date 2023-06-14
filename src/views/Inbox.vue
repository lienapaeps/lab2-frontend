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
        margin-left: 25%;
        padding-left: 1rem;
        margin-top: 1rem;
        width: 65%;
    }

@media (min-width: 692px) {
    .container {
        background-color: var(--offWhite);
    }

    h1 {
        color: var(--offBlack900);
    }
}
/*  desktop */
@media (min-width: 992px) {
    .content {
        margin-left: 26%;
        padding-left: 1rem;
        margin-top: 1rem;
        width: 65%;
    }
}
</style>