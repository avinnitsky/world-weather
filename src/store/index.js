import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const weatherUrl = process.env.VUE_APP_WEATHER_SERVICE_URL
const weatherKey = process.env.VUE_APP_WEATHER_SERVICE_KEY
const currentLocation = process.env.VUE_APP_CURRENT_LOCATION

const storedLocations = JSON.parse(localStorage.getItem('weather-items') || '[]')

const store =  new Vuex.Store({
    state: {
        locations: storedLocations,
        now: Date.now()
    },
    getters: {
        LOCATIONS: state => {
            return state.locations;
        },
        NOW: state => {
            return state.now;
        },
    },
    mutations: {
        LOCATIONS: (state, payload) => {
            state.locations = payload;
        },
        NOW: (state, payload) => {
            state.now = payload;
        },
    },
    actions: {
        SET: async (context, payload) => {
            const url = `${weatherUrl}?q=${payload}&units=metric&appid=${weatherKey}`
            return fetch(url)
                .then(response => {
                    if (response.status == 200) {
                        return response.json()
                    } else {
                        throw new Error(response.statusText);
                    }
                })
                .then(data => {
                    let locations = context.getters.LOCATIONS.filter(item => item.id != data.id)
                    locations = [...locations, data].sort((a, b) => a.name.localeCompare(b.name))
                    context.commit('LOCATIONS', locations);
                    localStorage.setItem('weather-items', JSON.stringify(context.getters.LOCATIONS))
                    return data;
                 })
        },
        REMOVE: async (context, payload) => {
            let locations = context.getters.LOCATIONS.filter(item => item.id != payload.id)
            context.commit('LOCATIONS', locations);
            localStorage.setItem('weather-items', JSON.stringify(context.getters.LOCATIONS))
        },
        INTERVAL: async (context) => {
            setInterval(() => {
                context.commit('NOW', Date.now())
            }, 1000*60)
        }
    }
})

export default store;

if (!storedLocations.find(item => item.name === currentLocation)) {
   store.dispatch('SET', currentLocation)
}

store.dispatch('INTERVAL')

