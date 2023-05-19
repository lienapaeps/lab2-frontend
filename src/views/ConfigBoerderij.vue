<script setup>
import { ref, reactive, onMounted } from 'vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

let boerderijen = reactive({
    boerderijen: []
})

let velden = reactive({
    velden: []
})

let boerderijId = window.location.pathname.split("/")[4];

function getBoerderijen() {
    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/farms/" + boerderijId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then(res => {
            return res.json();
        }).then(json => {
            // console.log(json);
            boerderijen.boerderijen = json.data;
            // console.log(boerderijen.boerderijen)
        }).catch(err => {
            console.log(err);
        })
    }
}

function getVelden() {
    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/fields/farm/" + boerderijId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then(res => {
            return res.json();
        }).then(json => {
            // console.log(json);
            velden.velden = json.data.fields;
            console.log(velden.velden)
        }).catch(err => {
            console.log(err);
        })
    }
}

const verwijderVeld = (id) => {
    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/fields/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then(res => {
            return res.json();
        }).then(json => {
            // console.log("Veld verwijderd");

            let feedback = document.querySelector(".alert");
            feedback.innerHTML = "Veld is succesvol verwijderd!";
            feedback.classList.remove("hidden");
            feedback.style.backgroundColor = "#D2F9E3";
            feedback.style.color = "#075F4A";

            // na 3 seconden verdwijnt het succes bericht
            setTimeout(() => {
                feedback.classList.add("hidden");
            }, 3000);

            let index = velden.velden.findIndex(veld => veld._id === id);
            velden.velden.splice(index, 1);
        }).catch(err => {
            console.log(err);
        })
    }
}

onMounted(() => {
    getBoerderijen();
    getVelden();
})

</script>

<template>
    <div class="content">
        <div class="arrow">
            <router-link exact to="/profiel/boerderijen">
                <img src="./../assets/left-arrow.svg" alt="arrow" />
            </router-link>
        </div>
        <h1>Velden beheren</h1>

        <div v-for="boerderij in boerderijen.boerderijen" :key="boerderij.id">
            <h2 id="boerderijnaam">Boerderij {{ boerderij.name }}</h2>
        </div>

        <hr>

        <div class="alert hidden">
            Here is some feedback
        </div>

        <h2>Velden</h2>
        <div id="velden">
            <div class="card-veld" v-for="veld in velden.velden" :key="veld.id">
                <h3 id="veldnaam">{{ veld.name }}</h3>
                <div class="availability"></div>
                <span id="eigenaars" v-for="owner in veld.owner" :key="owner.id">{{ owner.name }}</span>
                <p id="grootte">{{ veld.size }} m²</p>
                <span id="gewassen" v-for="crop in veld.crops" :key="crop.id">{{ crop }}</span>
                <a class="btn" href="#">Bewerken</a>
                <a class="btn--outline" href="#" v-on:click="verwijderVeld(veld._id)">Verwijderen</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
.btn {
    color: #fff;
    margin-top: 1rem;
}

#gewassen {
    text-transform: capitalize;
    margin-right: 0.5rem;
}

#eigenaars {
    font-weight: 500;
    margin-right: 0.5rem;
}

#eigenaars,
#grootte,
#gewassen {
    color: var(--offBlack500);
}

hr {
    border: 0;
    height: 1px;
    background: var(--offBlack100);
}

#velden {
    display: flex;
    width: 100%;
    flex-direction: column;
}

#boerderijnaam {
    margin-top: 1rem;
}

.free {
    background-color: var(--deepSeaGreen500);
    color: #fff;
    padding: 10px;
    margin-right: 70%;
    border-radius: 4px;
    text-align: center;
}

.boerderij-info {
    display: flex;
    align-items: center;
}

.icon {
    margin-right: 1rem;
}

.rented {
    font-family: "DM Sans", sans-serif;
    color: #fff;
    background-color: var(--semanticRed);
    max-width: 140px;
    text-align: center;
    padding: 10px;
    border-radius: 4px;
}

.available {
    font-family: "DM Sans", sans-serif;
    color: #fff;
    background-color: var(--deepSeaGreen500);
    max-width: 140px;
    text-align: center;
    padding: 10px;
    border-radius: 4px;

}

.card-veld {
    width: 90%;
    background-color: #fff;
    margin-right: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* .card-veld:nth-child(1) {
    display: none;
} */

.content {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 8rem;
}

#veldnaam {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

a {
    color: var(--offBlack900);
}

.arrow {
    position: absolute;
    top: 50px;
    left: 15px;
    z-index: 10;
}


/*  desktop */
@media (min-width: 992px) {
    #velden {
        display: flex;
        flex-direction: row;
    }

    .arrow {
        left: 26%;
    }
}

@media (min-width: 692px) {
    .content {
        margin-left: 25%;
        padding-left: 1rem;
    }
}
</style>