<script setup>
import { onMounted } from 'vue';

// crops
let groenten = [
    "Aardpeer",
    "Ajuin",
    "Andijvie",
    "Artisjok",
    "Asperge (groen)",
    "Asperge (wit)",
    "Aubergine",
    "Augurk",
    "Bloemkool",
    "Boerenkool",
    "Broccoli",
    "Champignons",
    "Courgette",
    "Groene kool",
    "IJsbergsla",
    "Kervel",
    "Knolselder",
    "Komkommer",
    "Kropsla",
    "Paksoi",
    "Paprika",
    "Pastinaak",
    "Peultjes",
    "Prei",
    "Raap",
    "Radijs",
    "Rammenas",
    "Rode biet",
    "Rode kool",
    "Rucola",
    "Savooikool",
    "Schorseneer",
    "Selder",
    "Snijboon",
    "Spinazie",
    "Spitskool",
    "Spruitjes",
    "Tomaten",
    "Tuinbonen",
    "Venkel",
    "Witloof",
    "Witte kool",
    "Wortel",
    "Zeekool",
    "Zevenblad",
    "Zomerpostelein",
    "Zomerpompoen"
]

let fruit = [
    "Aardbei",
    "Appel",
    "Blauwe bes",
    "Braam bes",
    "Cassisbes",
    "Framboos",
    "Kers",
    "Kiwibes",
    "Kweepeer",
    "Peer",
    "Pruim",
    "Rode bes",
    "Stekelbes",
    "Veenbes"
]

function addCrops() {
    let select = document.querySelector("#crops");

    groenten.forEach(groente => {
        let option = document.createElement("option");
        option.value = groente;
        option.textContent = groente;
        select.appendChild(option);
    })

    fruit.forEach(fruit => {
        let option = document.createElement('option');
        option.value = fruit;
        option.innerHTML = fruit;
        select.appendChild(option);
    });
}

function addField() {
    document.querySelector("#veld").addEventListener("submit", e => {
        e.preventDefault();

        let name = document.querySelector("#fieldname").value;
        let grootte = document.querySelector("#grootte").value;

        let farmId = window.location.pathname.split('/')[2];

        let dataVeld = {
            farmId: farmId,
            name: name,
            size: grootte,
            crops: [],
            plannedCrops: []
        }

        console.log(dataVeld);

        fetch("https://plant-en-pluk.onrender.com/api/v1/fields", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            mode: "cors",
            body: JSON.stringify(dataVeld)
        })
            .then(response => response.json())
            .then((data) => {
                // console.log(data);
                if (data.status === "success") {
                    // window.location.href = "/profiel/boerderijen/config/" + farmId;
                    document.querySelector(".form-veld").classList.add("hidden");
                    document.querySelector(".form-crops").classList.remove("hidden");

                    // console.log(data.data.field._id);
                    localStorage.setItem("fieldId", data.data.field._id);

                    document.querySelector(".veld-title").classList.add("hidden");
                    document.querySelector(".crop-title").classList.remove("hidden");
                    document.querySelector(".crop-descr").classList.remove("hidden");
                } else {
                    let feedback = document.querySelector(".alert");
                    // console.log(data);
                    feedback.textContent = data.message;
                    feedback.classList.remove("hidden");
                    feedback.style.backgroundColor = "#f8d7da";
                    feedback.style.color = "#C82424";
                }
            })
            .catch((error) => {
                console.log(error);
            });
    })

    // nadat de velden zijn toegevoegd, worden de gewassen toegevoegd
    document.querySelector("#cropsForm").addEventListener("submit", e => {
        e.preventDefault();

        let crops = [];
        let select = document.querySelector('#crops');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].selected) {
                crops.push(select.options[i].value);
            }
        }

        // get field id from localstorage
        let fieldId = localStorage.getItem("fieldId");

        let dataCrops = {
            crops: []
        }

        // maak voor elk gewas een object aan en push deze in de crops array
        crops.forEach(crop => {
            let cropObject = {
                name: crop,
                fieldId: fieldId
            }
            dataCrops.crops.push(cropObject);
        })

        let farmId = window.location.pathname.split('/')[2];

        console.log(dataCrops);

        fetch("https://plant-en-pluk.onrender.com/api/v1/crops", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            mode: "cors",
            body: JSON.stringify(dataCrops)
        })
            .then(response => response.json())
            .then((data) => {
                // console.log(data);
                if (data.status === "success") {
                    // console.log(data);
                    localStorage.removeItem("fieldId");
                    window.location.href = "/profiel/boerderijen/config/" + farmId;
                } else {
                    let feedback = document.querySelector(".alert");
                    // console.log(data);
                    feedback.textContent = data.message;
                    feedback.classList.remove("hidden");
                    feedback.style.backgroundColor = "#f8d7da";
                    feedback.style.color = "#C82424";
                }
            })
            .catch((error) => {
                console.log(error);
            });

    })


}

onMounted(() => {
    addField();
    addCrops();
})

</script>

<template>
    <div class="content">
        <h1 class="veld-title">Een veld toevoegen</h1>
        <h1 class="crop-title hidden">Groenten en fruit toevoegen</h1>
        <p class="crop-descr hidden">Selecteer welke gewassen er op dit veld geplant kunnen worden.</p>



        <div class="form-group form-veld">
            <div class="alert hidden">
                Here is some feedback
            </div>
            <form id="veld" action="#">
                <div class="group">
                    <label for="fieldname">Veld naam</label>
                    <input type="text" id="fieldname" name="fieldname" placeholder="Veld naam" required>
                </div>
                <div class="group">
                    <div class="group">
                        <label for="grootte">Grootte</label>
                        <input type="text" id="grootte" name="grootte" placeholder="Grootte (m²)" required>
                    </div>
                </div>
                <!-- <div class="group-group">
                    <div class="group">
                        <label for="crops">Selecteer welke gewassen er geplant kunnen worden op dit veld:</label>
                        <select name="crops" id="crops" multiple required></select>
                    </div>
                </div> -->
                <input type="submit" value="Volgende">
            </form>
        </div>

        <div class="form-group form-crops hidden">
            <div class="alert hidden">
                Here is some feedback
            </div>
            <form id="cropsForm" action="#">
                <div class="group-group">
                    <div class="group">
                        <label for="crops">Selecteer welke gewassen er geplant kunnen worden op dit veld:</label>
                        <select name="crops" id="crops" multiple required></select>
                    </div>
                </div>
                <input type="submit" value="Toevoegen">
            </form>
        </div>

    </div>
</template>

<style scoped>
/*  mobile */
.content {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 1rem;
}

/* form  */
input[type=text],
select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color: var(--deepSeaGreen800);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: var(--deepSeaGreen500);
}

#crops {
    height: 200px;
}

.group {
    margin-bottom: .5rem;
    width: 100%;
}

/*  desktop */
@media (min-width: 992px) {
    .content {
        margin-left: 25%;
        padding-left: 2rem;
        margin-top: 4rem;
        margin-bottom: 2rem;
    }

    .form-group {
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 3rem;
        margin-right: 2rem;
    }

    .group-group {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }
}
</style>