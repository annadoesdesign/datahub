import React from 'react';
import { Empty } from 'antd';
import { Table } from '@components';
import styled from 'styled-components';
import { AlignmentOptions } from '@src/alchemy-components/theme/config';
import { OwnershipTypeEntity } from '../../../../types.generated';
import { NameColumn } from './NameColumn';
import { DescriptionColumn } from './DescriptionColumn';
import { ActionsColumn } from './ActionsColumn';

const TableContainer = styled.div`
    display: flex;
    flex: 1;
    overflow: auto;
`;

type Props = {
    ownershipTypes: OwnershipTypeEntity[];
    setIsOpen: (isOpen: boolean) => void;
    setOwnershipType: (ownershipType: OwnershipTypeEntity) => void;
    refetch: () => void;
};

export const OwnershipTable = ({ ownershipTypes, setIsOpen, setOwnershipType, refetch }: Props) => {
    const tableColumns = [
        {
            title: 'Name',
            key: 'name',
            render: (record: OwnershipTypeEntity) => <NameColumn ownershipType={record} />,
            sorter: (a: OwnershipTypeEntity, b: OwnershipTypeEntity) =>
                (a?.info?.name || '').localeCompare(b?.info?.name || ''),
            width: '40%',
        },
        {
            title: 'Description',
            key: 'description',
            render: (record: OwnershipTypeEntity) => <DescriptionColumn ownershipType={record} />,
            width: '50%',
        },
        {
            title: '',
            key: 'actions',
            render: (record: OwnershipTypeEntity) => (
                <ActionsColumn
                    ownershipType={record}
                    setIsOpen={setIsOpen}
                    setOwnershipType={setOwnershipType}
                    refetch={refetch}
                />
            ),
            width: '10%',
            alignment: 'right' as AlignmentOptions,
        },
    ];

    const getRowKey = (ownershipType: OwnershipTypeEntity) => {
        return ownershipType?.info?.name || ownershipType.urn;
    };

    if (ownershipTypes.length === 0) {
        return <Empty description="No Ownership Types found!" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return (
        <TableContainer>
            <Table columns={tableColumns} data={ownershipTypes} rowKey={getRowKey} />
        </TableContainer>
    );
};
