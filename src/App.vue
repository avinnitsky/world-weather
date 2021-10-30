<template>
    <div class="app">
        <div class="app__container">
            <h1 class="app__title">World Weather</h1>
            <h2 class="app__subtitle">Watch weather in your current location</h2>
            <div class="cards-wrapper">
                <card v-if="items.length" :item="items[0]" main></card>
            </div>
            <div class="cards-wrapper">
                <card
                        v-for="item in items"
                        :key="item.name"
                        :item="item"
                ></card>
            </div>
            <div class="add-btn-wrapper">
                <ui-action-button @click="modal=true"></ui-action-button>
                <modal :active="modal" @close="modal=false"></modal>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from './components/Card.vue'
    import uiActionButton from './components/UI/uiActionButton.vue'
    import Modal from './components/Modal.vue'

    export default {
        components: {
            Card,
            uiActionButton,
            Modal,
        },
        data() {
            return {
                modal: false,
            }
        },
        computed: {
            items() {
                return this.$store.getters.LOCATIONS
            }
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        margin: 0;
    }

    .app {
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        color: #1B1B1B;
        text-align: center;
        margin: 24px;

        &__container {
            margin: 0 auto;
            min-width: 350px;
            max-width: 1600px;
        }

        &__title {
            font-size: 70px;
            font-weight: 300;
            line-height: 80px;
            margin-bottom: 32px;
        }

        &__subtitle {
            font-size: 24px;
            font-weight: normal;
            line-height: 24px;
            color: #767676;
            margin-bottom: 20px;
        }
    }

    @media screen and (max-width: 756px) {
        .app {
            margin: 4px;
            &__title {
                font-size: 48px;
                margin-bottom: 0;
            }
            &__subtitle {
                font-size: 18px;
            }
        }
    }

    .cards-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .add-btn-wrapper {
        position: fixed;
        bottom: 34px;
        right: 45px;
    }

</style>
