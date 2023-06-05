<script setup>
import SearchBar from './../components/SearchBar.vue';
import { ref, reactive, onMounted } from 'vue';

if (!localStorage.getItem('token')) {
    window.location.href = "/login";
}

let velden = reactive({
    velden: []
})

// get id from token in localstorage
const token = localStorage.getItem('token');
const base64Url = token.split('.')[1];
const base64 = base64Url.replace('-', '+').replace('_', '/');
const user = JSON.parse(window.atob(base64));

let userId = user.uid;
// console.log(userId)

function getVelden() {
    if (localStorage.getItem("token")) {
        fetch("https://plant-en-pluk.onrender.com/api/v1/fields/user/" + userId, {
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
            // console.log(velden.velden)

            console.log(velden.velden)

        }).catch(err => {
            console.log(err);
        })
    }
}

onMounted(() => {
    getVelden();
})

</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Overzicht velden</h1>
            <div class="search">
                <SearchBar />
            </div>
            <div class="mijn-velden">
                <h2>Jouw velden</h2>
                <div id="velden">
                    <div class="veld" v-for="veld in velden.velden" :key="veld.id">
                        <h3 id="veldnaam">{{ veld.name }}</h3>
                        <div class="availability"></div>
                        <span id="eigenaars" v-for="owner in veld.owner" :key="owner.id">{{ owner.name }}</span>
                        <p id="grootte">{{ veld.size }} m²</p>
                        <span id="gewassen" v-for="crop in veld.crops" :key="crop.id">{{ crop }}</span>

                        <router-link class="btn" :to="'/veld/' + veld._id">Bekijk details</router-link>

                    </div>
                </div>
            </div>
            <!-- <div class="in-de-buurt">
                <h2>Velden in de buurt</h2>
            </div> -->
        </div>
    </div>
</template>

<style scoped>
/*  mobile */
a {
    margin-top: 1.5rem;
}

.mijn-velden {
    margin-top: 3rem;
}

.veld {
    width: 90%;
    background-color: #fff;
    margin-right: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

#velden {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.container {
    background-color: var(--deepSeaGreen800);
    height: 120px;
    width: 100%;
    margin-left: 0px;
}

h1 {
    color: var(--offWhite);
}

.content {
    position: absolute;
    width: 80%;
    margin-left: 40px;
}

/*  desktop */
@media (min-width: 992px) {
    .container {
        background-color: var(--offWhite);
        margin-left: 20px;
    }

    h1 {
        color: var(--offBlack900);
    }

    #velden {
        display: flex;
        flex-direction: row;
    }
}

@media (min-width: 692px) {
    #mapContainer {
        width: 75%;
        height: 350px;
        margin-left: 25%;
    }

    .content {
        margin-left: 25%;
        padding-left: 1rem;
        margin-top: 1rem;
        width: 65%;
    }
}
</style>