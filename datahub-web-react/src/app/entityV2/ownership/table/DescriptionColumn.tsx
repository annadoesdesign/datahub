import React from 'react';
import styled from 'styled-components/macro';
import { colors } from '@components';
import { OwnershipTypeEntity } from '../../../../types.generated';

const PropDescription = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${colors.gray[1700]};
    line-height: normal;
`;

type Props = {
    ownershipType: OwnershipTypeEntity;
};

export const DescriptionColumn = ({ ownershipType }: Props) => {
    const description = ownershipType?.info?.description || '';

    return <PropDescription>{description}</PropDescription>;
};
