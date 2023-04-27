<template>
    <div class="app-input">
        <input
            class="app-input__input"
            :readonly="isInputTypeNumber"
            :type="inputType"
            :value="modelValue"
            :min="min"
            :max="max"
            @input="updateValue"
        />
        <template
            v-if="isInputTypeNumber"
        >
            <app-button
                class="app-input__button"
                :class="{ '-disabled': modelValue === min }"
                rounded
                @click="handleStepMinusOne"
            >
                -
            </app-button>
            <app-button
                class="app-input__button"
                :class="{ '-disabled': modelValue === max }"
                rounded
                @click="handleStepPlusOne"
            >
                +
            </app-button>
        </template>
    </div>
</template>

<script lang="ts">
import { computed, type ComputedRef, type SetupContext } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';

type AppInputProps = {
    inputType: String;
    modelValue: String | Number;
    min: Number | undefined;
    max: Number | undefined;
};

export default {
    name: 'AppInput',
    components: {
        AppButton
    },
    props: {
        inputType: {
            type: String,
            default: 'text',
        },
        modelValue: {
            type: [String, Number],
            default: '',
        },
        min: {
            type: Number,
            default: undefined,
        },
        max: {
            type: Number,
            default: undefined,
        },
    },
    setup(props: AppInputProps, context: SetupContext) {
        const isInputTypeNumber: ComputedRef<boolean> = computed(() => {
            return props.inputType === 'number';
        });

        const updateValue = (event: InputEvent): void => {
            const target = event.target as HTMLInputElement;
            context.emit('update:modelValue', target.value);
        };

        const handleStepMinusOne = (): void => {
            const newValue = +props.modelValue - 1;

            if (props.min !== undefined && newValue >= props.min) {
                context.emit('update:modelValue', newValue);
            }
        };

        const handleStepPlusOne = (): void => {
            const newValue = +props.modelValue + 1;

            if (props.max !== undefined && newValue <= props.max) {
                context.emit('update:modelValue', newValue);
            }
        };

        return {
            isInputTypeNumber,
            updateValue,
            handleStepMinusOne,
            handleStepPlusOne,
        };
    },
};
</script>