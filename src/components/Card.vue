<script setup>

</script>

<template>
    <div class="card">
        <div class="card-body">
            <img src="../assets/Tomaat.svg" alt="test">
            <p class="card-title">Tomaten</p>
            <p class="card-text">Boer Teun</p>
            <div class="progress-bar">
                <div class="progress" style="width: 70%;"></div>
            </div>
        </div>
    </div>
    <div class="test"></div>
</template>

<style scoped>
/*  mobile */
.progress-bar{
        max-width: 100%;
        height: 10px;
        background-color: var(--offBlack100);
        border-radius: 10px;
    }

    .progress{
        height: 100%;
        background-color: var(--deepSeaGreen500);
        border-radius: 10px;
    }
    .card{
        max-width: 85%;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        padding: 1em;
        margin-right: 10px;
        margin-bottom: 20px;
    }

    .card-title{
        font-weight: bolder;
        margin-bottom: 0;
    }

    img{
        width: 6em;
        height: 100%;
    };

@media (min-width: 692px) {
.progress-bar{
        max-width: 100%;
        height: 10px;
        background-color: var(--offBlack100);
        border-radius: 10px;
    }

    .progress{
        height: 100%;
        background-color: var(--deepSeaGreen500);
        border-radius: 10px;
    }
    .card{
        max-width: 85%;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        padding: 1em;
        margin-right: 10px;
        margin-bottom: 20px;
    }

    .card-title{
        font-weight: bolder;
        margin-bottom: 0;
    }

    img{
        width: 6em;
        height: 100%;
    };
}
/*  desktop */
@media (min-width: 992px) {

    .progress-bar{
        max-width: 100%;
        height: 10px;
        background-color: var(--offBlack100);
        border-radius: 10px;
    }

    .progress{
        height: 100%;
        background-color: var(--deepSeaGreen500);
        border-radius: 10px;
    }
    .card{
        max-width: 500px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        padding: 1em;
        margin-right: 10px;
    }

    .card-title{
        font-weight: bolder;
        margin-bottom: 0;
    }

    img{
        width: 6em;
        height: 100%;
    };


}
</style>