<template>
    <button class="btn" :disabled="disabled" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            disabled: Boolean
        }
    }
</script>

<style scoped>
    .btn {
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: #9B51E0;
        cursor: pointer;
        background: transparent;
        border: none;
    }

    button:disabled {
        opacity: 0.5;
    }
</style>