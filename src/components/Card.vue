<template>
    <div class="card">
        <div>
            <div class="card__title">{{ location.city }}</div>
            <div class="card__subtitle">{{ location.country }}</div>
        </div>
        <div>
            <div class="card__row">
                <div>Wheater</div>
                <div>{{ weather }}</div>
            </div>
            <div class="card__row">
                <div>Temperature</div>
                <div>{{temp}} °C</div>
            </div>
            <div class="card__row">
                <div>Humidity</div>
                <div>{{ humidity }} %</div>
            </div>
            <div class="card__timer">{{ timer }}</div>
        </div>
        <div class="card__actions">
            <ui-btn @click="reload">RELOAD</ui-btn>
            <ui-btn v-if="!main" @click="$store.dispatch('REMOVE', item)">REMOVE</ui-btn>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import uiBtn from './UI/uiBtn.vue'

    export default {
        name: 'Card',
        components: {
            uiBtn
        },
        props: {
            main: Boolean,
            item: Object,
        },
        data() {
            return {
                timer: this.timerString()
            }
        },
        mounted() {
            if (this.main) {
                this.$el.classList.add('card_main')
            }
        },
        computed: {
            classlist() {
                return `${this.main ? 'main-card ' : ' '}card`
            },
            location() {
                const city = this.main ? `${this.item.name}, ${this.item.sys.country}` : this.item.name
                const country = this.main ? 'Your current location' : this.item.sys.country
                return {city, country}
            },
            temp() {
                return Math.round(parseFloat(this.item.main.temp))
            },
            weather() {
                return this.item.weather[0].main
            },
            humidity() {
                return this.item.main.humidity
            },
        },
        methods: {
            reload() {
                this.$store.dispatch('SET', this.item.name).then(() => {
                    this.timer = this.timerString()
                })
            },
            timerString() {
                let timestamp = this.item.dt * 1000
                return moment(timestamp).fromNow()
            }
        },
        watch: {
            "$store.getters.NOW"() {
                this.timer = this.timerString()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        max-width: 350px;
        min-width: 200px;
        height: 393px;
        padding: 24px;
        text-align: left;
        border: 1px solid #C4C4C4;
        box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &_main {
            max-width: 824px;
            margin: 0 auto 80px;
            flex-grow: 2;
        }

        &__title {
            font-weight: bold;
            font-size: 32px;
            line-height: 38px;
            margin-bottom: 15px;
        }

        &__subtitle {
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 8px;
        }

        &__row {
            font-size: 18px;
            height: 36px;
            line-height: 24px;
            margin-bottom: 16px;
            border-bottom: 1px solid #C4C4C4;
            display: flex;
            justify-content: space-between;
        }

        &__timer {
            font-size: 16px;
            line-height: 24px;
            text-align: right;
            color: #A8A8A8;
            margin: -8px 0 0px;
        }

        &__actions {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
        }
    }

    @media screen and (max-width: 750px) {
        .card {
            &_main {
                margin-bottom: 24px;
            }
        }
    }

    @media screen and (max-width: 480px) {
        .card {
            max-width: none;
        }
    }


</style>
