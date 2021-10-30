<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-dialog">
            <div class="modal-dialog__container">
                <input v-model="location" @input="validate">
                <div class="error">{{this.error}}</div>
            </div>
            <div class="modal-dialog__actions">
                <ui-btn :disabled="!valid" @click="addLocation">ADD</ui-btn>
                <ui-btn @click="close">CANCEL</ui-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import uiBtn from './UI/uiBtn.vue'
    import { required, helpers } from "vuelidate/lib/validators";
    const alpha = helpers.regex("alpha", /^[a-zA-Z]+$/);

    export default {
        name: 'Modal',
        components: {
            uiBtn
        },
        props: {
            active: Boolean
        },
        data() {
            return {
                location: '',
                valid: false,
                error: ''
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
            }
        },
        methods: {
            validate() {
                this.error = ''
                this.valid = !this.$v.$invalid
            },
            addLocation() {
                this.$store.dispatch('SET', this.location)
                    .then(() => {
                        this.close()
                    })
                    .catch(e => {
                        console.log(e);
                        this.error = e
                    })
            },
            close() {
                this.location='';
                this.valid=false;
                this.error='';
                this.$emit('close');
            },
        }
    }
</script>

<style lang="scss" scoped>
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
            background-color: #000;
            opacity: 0.5;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
        }

        &-dialog {
            width: 320px;
            height: 200px;
            padding: 24px;
            text-align: left;
            background-color: #fff;
            border: 1px solid #C4C4C4;
            box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25);
            border-radius: 6px;
            opacity: 1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            &__actions {
                display: flex;
                flex-direction: row-reverse;
                justify-content: space-between;
            }
        }
    }

    input {
        font-size: 20px;
        color: #1B1B1B;
        padding: 5px;
        border: 1px solid #ddd;

        width: 100%;
        height: 48px;
        margin: 28px 0 0;
    }
    .error {
        height: 16px;
        color: red;
        font-size: 16px;
        margin-bottom: 28px
    }
</style>