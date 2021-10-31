<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-dialog">
            <div>
                <div class="modal-dialog__title">Choose a city</div>
                <div class="modal-dialog__subtitle">To find city start typing and pick one from the suggestions</div>
            </div>
            <ui-input
                    v-model="location"
                    @input="validate"
                    placeholder="Search city"
                    error-message="Choose a city"
                    :class="{invalid: !valid}"
            ></ui-input>
            <div class="modal-dialog__actions">
                <ui-btn @click="clear" :disabled="!location">CLEAR</ui-btn>
                <div class="btn-group">
                    <ui-btn @click="close">CANCEL</ui-btn>
                    <ui-btn :disabled="!location || !valid" @click="addLocation">ADD</ui-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import uiBtn from './UI/uiBtn.vue'
    import uiInput from './UI/uiInput.vue'
    import {required, helpers} from "vuelidate/lib/validators";
    const alpha = helpers.regex("alpha", /^[a-zA-Z]+$/);

    export default {
        name: 'Modal',
        components: {
            uiBtn,
            uiInput
        },
        props: {
            active: Boolean
        },
        data() {
            return {
                location: '',
                valid: true,
            }
        },
        validations: {
            location: {
                alpha,
                required,
            }
        },
        watch: {
            active(val) {
                val ? this.$el.classList.add('modal_active') : this.$el.classList.remove('modal_active')
                val && this.$el.querySelector('input').focus()
            }
        },
        methods: {
            validate() {
                this.valid = !this.$v.$invalid
            },
            addLocation() {
                this.$store.dispatch('SET', this.location)
                    .then(() => {
                        this.close()
                    })
                    .catch(e => {
                        console.log(e);
                        this.valid = false
                    })
            },
            close() {
                this.location = '';
                this.valid = true;
                this.$emit('close');
            },
            clear() {
                this.location = '';
                this.valid = true;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/common";

    .btn-group {
        display: flex;
        justify-content: space-between;
        > button:not(:last-child) {
            margin-right: 30px;
        }
    }

    .modal {
        top: 0;
        left: 0%;
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: none;

        &_active {
            display: block
        }

        &-background {
            position: absolute;
            background-color: #0B0B0B;
            opacity: 0.5;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
        }

        &-dialog {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 320px;
            height: 397px;
            padding: 24px;
            text-align: left;
            background-color: #ffffff;
            opacity: 1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            border: 1px solid #C4C4C4;
            box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25);
            border-radius: 6px;

            &__title {
                font-weight: bold;
                font-size: 32px;
                margin-bottom: 16px;
            }

            &__subtitle {
                color: $text-secondary;
                font-size: 24px;
            }

            &__actions {
                display: flex;
                justify-content: space-between;
            }
        }
    }

    @media screen and (min-width: 480px) {
        .modal-dialog {
            width: 420px;
        }
    }

    @media screen and (min-width: 756px) {
        .modal-dialog {
            width: 500px;
        }
    }

    @media screen and (min-width: 960px) {
        .modal-dialog {
            width: 751px;
        }
    }

</style>