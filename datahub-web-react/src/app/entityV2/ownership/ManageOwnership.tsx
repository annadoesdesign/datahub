import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { PageTitle, Button } from '@components';
import { Plus } from '@phosphor-icons/react';
import { OwnershipTypeEntity } from '@src/types.generated';
import { OwnershipList } from './OwnershipList';
import { OwnershipBuilderModal } from './OwnershipBuilderModal';
import { useListOwnershipTypesQuery } from '../../../graphql/ownership.generated';

const PageContainer = styled.div`
    padding: 16px 20px 16px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

/**
 * Component used for displaying the 'Manage Ownership' experience.
 */

export const ManageOwnership = () => {
    const [showOwnershipBuilder, setShowOwnershipBuilder] = useState<boolean>(false);
    const [ownershipType, setOwnershipType] = useState<undefined | OwnershipTypeEntity>(undefined);

    const onClickCreateOwnershipType = () => {
        setShowOwnershipBuilder(true);
    };

    const onCloseModal = () => {
        setShowOwnershipBuilder(false);
        setOwnershipType(undefined);
    };

    const { refetch } = useListOwnershipTypesQuery({
        variables: {
            input: {
                start: 0,
                count: 10,
                query: undefined,
            },
        },
    });

    return (
        <PageContainer>
            <HeaderContainer>
                <PageTitle title="Manage Ownership" subTitle="Create, edit, and remove custom Ownership Types." />
                <Button variant="filled" onClick={onClickCreateOwnershipType} data-testid="create-owner-type-v2">
                    <Plus /> Create Ownership Type
                </Button>
            </HeaderContainer>
            <ListContainer>
                <OwnershipList />
            </ListContainer>
            <OwnershipBuilderModal
                isOpen={showOwnershipBuilder}
                onClose={onCloseModal}
                refetch={refetch}
                ownershipType={ownershipType}
            />
        </PageContainer>
    );
};
