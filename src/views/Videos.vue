<script setup>
if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Video's</h1>
            <div class="videos">
                <div class="video-item">
                    <h3 class="video-title">Hij werkt 35 uur per week op het veld</h3>
                    <p>Gepubliceerd op 12 juni, 2023</p>
                    <iframe src="https://www.youtube.com/embed/26qTgXJKMAE" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="video-item">
                    <h3 class="video-title">Hoe start je je eigen mini moestuin</h3>
                    <p>Gepubliceerd op 1 juni, 2023</p>
                    <iframe src="https://www.youtube.com/embed/heTxEsrPVdQ" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="video-item">
                    <h3 class="video-title">Je gelooft nooit wat deze mensen kunnen!</h3>
                    <p>Gepubliceerd op 23 mei, 2023</p>
                    <iframe src="https://www.youtube.com/embed/hC4lemk_YqE" frameborder="0" allowfullscreen></iframe>
                </div>

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

.videos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 80px;

}

.video-item {
    background-color: white;
    padding: 1rem 2rem 1rem 2rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(103, 103, 103, 0.75);
}

.videos iframe {
    margin-bottom: 1rem;
    width: 100%;
    height: 150px;
}

.video-title {
    color: var(--deepSeaGreen800);
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0px;
}

.videos p {
    margin-top: 10px;
    margin-bottom: 10px;
    color: var(--offBlack500);
    font-size: 14px;
    font-style: italic;
}

h1 {
    color: var(--offWhite);
}

.content {
    position: absolute;
    margin-left: 2rem;
    margin-right: 2rem;
}

/*  desktop */
@media (min-width: 692px) {
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

    .videos {
        padding-top: 0px;
    }

    .video-item{
        width: auto;
    }


    .videos iframe {
        height: 240px;
    }
}
</style>
