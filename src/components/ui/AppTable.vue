<template>
    <table class="app-table">
        <thead>
            <tr>
                <th
                    v-for="(option, index) in options"
                    :key="index"
                >
                    {{ option.title }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                <td
                    v-for="(option, colIndex) in options"
                    :key="colIndex"
                    :class="{ '-right': option.align === 'right' }"
                >
                    <table-cell>
                        <slot :name="`body-cell-${option.field}`" :row="row">
                            {{ getFieldValue(row, option.field) }}
                        </slot>
                    </table-cell>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import type { TableOption } from '@/common/types/TableOption';
import TableCell from '@/components/TableCell.vue';

type RowData = {
    [key: string]: any;
}

export default {
    name: 'AppTable',
    components: {
        TableCell
    },
    props: {
        options: {
            required: true,
            type: Array as () => TableOption[],
        },
        rows: {
            type: Array,
            required: true,
        },
    },
    setup() {
        const getFieldValue = (row: unknown, field: string): any => {
            return (row as RowData)[field];
        };

        return {
            getFieldValue,
        };
    }
};
</script>