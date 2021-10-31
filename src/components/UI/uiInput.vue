<template>
    <div>
        <input class="input" @input="$emit('input', modelValue)" v-model="modelValue" :placeholder="placeholder">
        <div class="error-message">{{ errorMessage }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            value: String,
            placeholder: String,
            errorMessage: String,
        },
        data() {
            return {
                modelValue: this.value
            }
        },
        watch: {
            value(val) {
                this.modelValue = val;
            }
        }
    }
</script>

<style lang="scss" scopped>
    @import '../../scss/common.scss';

    .input {
        font-weight: 500;
        font-size: 24px;
        color: $text-primary;
        padding-bottom: 16px;
        border: none;
        border-bottom: 1px solid #1B1B1B;
        outline: none;
        width: 100%;
        height: 40px;
        &::placeholder {
            color: #C1C1C1
        }
        margin-bottom: 12px;
    }

    .error-message {
        font-size: 16px;
        color: red;
        line-height: 24px;
        visibility: hidden;
    }

    .invalid {
        .input {
            border-color: red;
        }
        .error-message {
            visibility: visible;
        }
    }

</style>