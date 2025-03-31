import { Table } from 'antd';
import styled from 'styled-components';
import { colors, typography, spacing, radius } from '@src/alchemy-components';

export const StyledTable = styled(Table)`
    overflow: hidden;
    height: inherit;

    &&& .ant-table {
        border-radius: ${radius.lg};
        border: 1px solid ${colors.gray[1400]};
    }

    &&& .ant-table-container {
        border-radius: ${radius.lg};
        border: none;
        overflow: hidden;
    }

    &&& .ant-table-cell {
        background-color: ${colors.white};
    }

    &&& .ant-table-thead .ant-table-cell {
        background-color: ${colors.gray[1500]} !important;
        color: ${colors.gray[1700]};
        font-size: ${typography.fontSizes.sm};
        font-weight: ${typography.fontWeights.medium};
        padding: ${spacing.sm} ${spacing.md};
        border-bottom: 1px solid ${colors.gray[1400]};
    }

    &&& .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
        border: none;
    }

    &&& .ant-table-tbody > tr > td {
        border-bottom: 1px solid ${colors.gray[100]};
    }

    &&& .ant-table-tbody > tr:last-child > td {
        border-bottom: none;
    }

    &&& .ant-table-wrapper {
        border-radius: ${radius.lg};
        overflow: hidden;
    }
` as typeof Table;
// this above line preserves the Table component's generic-ness
