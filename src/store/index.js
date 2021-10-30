import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const weather_url = process.env.VUE_APP_WEATHER_SERVICE_URL
const weather_key = process.env.VUE_APP_WEATHER_SERVICE_KEY

export default new Vuex.Store({
    state: {
        locations: JSON.parse(localStorage.getItem('weather-items') || '[]')
    },
    getters: {
        LOCATIONS: state => {
            return state.locations;
        },
    },
    mutations: {
        LOCATIONS: (state, payload) => {
            state.locations = payload;
        },
    },
    actions: {
        SET: async (context, payload) => {
            const url = `${weather_url}?q=${payload}&units=metric&appid=${weather_key}`
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
        }
    }
})
