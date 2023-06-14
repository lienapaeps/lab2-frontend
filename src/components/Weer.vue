<template>
    <h2>Huidig weer</h2>
    <div class="weather">
        <div v-if="loading">Laden...</div>
        <div v-else>
            <div v-if="error">{{ error }}</div>
            <div v-else>
                <h2>{{ weatherData.name }}</h2>
                <div class="info">
                    <p class="temp">{{ weatherData.main.temp }}°</p>
                    <img :src="weatherData.weather[0].icon" alt="Weer icoon">
                </div>
                <p class="descr">{{ weatherData.weather[0].description }}</p>
                <div class="temps">
                    <p class="min-temp">Min: {{ weatherData.main.temp_min }}°</p>
                    <p class="max-temp">Max: {{ weatherData.main.temp_max }}°</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            weatherData: null,
            loading: true,
            error: null
        };
    },
    mounted() {
        this.fetchWeatherData();
    },
    methods: {
        async fetchWeatherData() {
            try {
                const cachedWeatherData = localStorage.getItem('weatherData');
                const cachedTimestamp = localStorage.getItem('timestamp');

                if (cachedWeatherData && cachedTimestamp) {
                    const currentTime = new Date().getTime();
                    const elapsedTime = currentTime - cachedTimestamp;

                    // Als er minder dan 1 uur is verstreken sinds de laatste oproep, gebruik de gecachte data
                    if (elapsedTime < 60 * 60 * 1000) {
                        this.weatherData = JSON.parse(cachedWeatherData);
                        this.loading = false;
                        return;
                    }
                }

                const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Mechelen&appid=6045a091342bd776dd0213c064c8c027');
                const data = await response.json();
                this.weatherData = data;
                this.loading = false;

                // set temperature to celcius
                this.weatherData.main.temp = Math.round(this.weatherData.main.temp - 273.15);
                this.weatherData.main.temp_max = Math.round(this.weatherData.main.temp_max - 273.15);
                this.weatherData.main.temp_min = Math.round(this.weatherData.main.temp_min - 273.15);

                // get weather icon
                this.weatherData.weather[0].icon = 'http://openweathermap.org/img/w/' + this.weatherData.weather[0].icon + '.png';

                // Sla de weerdata en de huidige timestamp op in localStorage
                localStorage.setItem('weatherData', JSON.stringify(this.weatherData));
                localStorage.setItem('timestamp', new Date().getTime());
            } catch (error) {
                this.error = 'Er is een fout opgetreden bij het ophalen van het weer.';
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.weather {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
    padding: 1rem;
    width: 100%;
    text-align: center;
}

.weather img {
    width: 100px;
    height: 100px;
}

.weather .temp {
    font-size: 2rem;
    font-weight: bold;
}

.weather .info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}

.weather .descr {
    font-size: 1.5rem;
    margin: 0;
    text-transform: capitalize;
    margin-bottom: 3rem;
}

.weather .temps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.weather .temps p {
    margin: 0;
}

.weather .error {
    color: var(--semanticRed);
}

.weather .loading {
    color: var(--deepSeaGreen500);
}

/*  desktop */
@media (min-width: 992px) {
    .weather {
        width: 30%;
    }

}


@media (min-width: 692px) {
    .weather {
        width: 30%;
    }
}
</style>
  