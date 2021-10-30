<template>
    <div class="btn" @click="$emit('click')">+</div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .btn {
        width: 56px;
        height: 56px;
        background: #9B51E0;
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2);
        border-radius: 50px;
        font-size: 24px;
        line-height: 56px;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            transform: scale(1.2);
        }
    }
</style>