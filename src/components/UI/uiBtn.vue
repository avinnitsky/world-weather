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

<style lang="scss" scoped>
    .btn {
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: #9B51E0;
        cursor: pointer;
        background: transparent;
        border: none;
        transition: all 0.3s;
        &:hover {
            transform: scale(1.2);
        }
        &:active {
            transform: scale(1);
        }
        &:disabled {
            opacity: 0.5;
        }
    }

</style>