<template>
    <button
        class="app-button"
        :class="{ '-rounded': rounded }"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    name: 'AppButton',
    props: {
        rounded: {
            type: Boolean,
            required: false,
        },
    },
};
</script>