<template>
    <div class="app-accordion">
        <div
            class="app-accordion__header"
            :class="{ '-disabled': disabled }"
            @click="$emit('update:modelValue', !modelValue)"
        >
            <i
                class="app-accordion__icon"
                :class="{ '-rotate': modelValue }"
            >
                <chevron-down-icon />
            </i>
            <p class="app-accordion__title">{{ title }}</p>
        </div>

        <transition name="app-accordion">
            <div
                v-if="modelValue"
                class="app-accordion__content"
            >
                <slot name="content" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';
export default {
    name: 'AppAccordion',
    components: {
        ChevronDownIcon,
    },
    props: {
        modelValue: {
            required: true,
            type: Boolean,
        },
        title: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
};
</script>