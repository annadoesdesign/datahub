import React from 'react';
import styled from 'styled-components/macro';
import { colors } from '@components';
import { OwnershipTypeEntity } from '../../../../types.generated';

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const PropName = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: ${colors.gray[600]};
    line-height: normal;

    :hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

type Props = {
    ownershipType: OwnershipTypeEntity;
};

export const NameColumn = ({ ownershipType }: Props) => {
    const name = ownershipType?.info?.name || ownershipType?.urn;

    return (
        <NameContainer>
            <PropName>{name}</PropName>
        </NameContainer>
    );
};
