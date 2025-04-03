import React from 'react';
import { Dropdown, MenuProps, Popconfirm, message, notification } from 'antd';
import { DotsThreeOutlineVertical } from 'phosphor-react';
import { colors } from '@components/theme';
import styled from 'styled-components/macro';
import { OwnershipTypeEntity } from '../../../../types.generated';
import { useDeleteOwnershipTypeMutation } from '../../../../graphql/ownership.generated';

const DROPDOWN_TEST_ID = 'ownership-table-dropdown';
const EDIT_OWNERSHIP_TYPE_TEST_ID = 'edit-ownership-type';
const DELETE_OWNERSHIP_TYPE_TEST_ID = 'delete-ownership-type';

const ActionContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    display: flex;
    padding: 4px 20px 4px 5px;
    font-size: 14px;
    font-weight: 400;
    color: ${colors.gray[1700]};
`;

const DeleteMenuItem = styled(MenuItem)`
    color: ${colors.red[600]};
`;

const StyledDotsThree = styled(DotsThreeOutlineVertical)`
    cursor: pointer;
    color: ${colors.gray[1800]};
`;

type Props = {
    ownershipType: OwnershipTypeEntity;
    setIsOpen: (isOpen: boolean) => void;
    setOwnershipType: (ownershipType: OwnershipTypeEntity) => void;
    refetch: () => void;
};

export const ActionsColumn = ({ ownershipType, setIsOpen, setOwnershipType, refetch }: Props) => {
    const editOnClick = () => {
        setIsOpen(true);
        setOwnershipType(ownershipType);
    };

    const onCopy = () => {
        navigator.clipboard.writeText(ownershipType.urn);
        message.success('URN copied to clipboard');
    };

    const [deleteOwnershipTypeMutation] = useDeleteOwnershipTypeMutation();

    const onDelete = () => {
        deleteOwnershipTypeMutation({
            variables: {
                urn: ownershipType.urn,
            },
        })
            .then(() => {
                notification.success({
                    message: `Success`,
                    description: 'You have deleted an ownership type.',
                    placement: 'bottomLeft',
                    duration: 3,
                });
                setTimeout(() => {
                    refetch();
                }, 3000);
            })
            .catch((e: unknown) => {
                message.destroy();
                if (e instanceof Error) {
                    message.error({
                        content: `Failed to delete an ownership type`,
                        duration: 3,
                    });
                }
            });
    };

    const items: MenuProps['items'] = [
        {
            key: 'edit',
            label: <MenuItem onClick={editOnClick}>Edit</MenuItem>,
        },
        {
            key: 'copy',
            label: <MenuItem onClick={onCopy}>Copy URN</MenuItem>,
        },
        {
            key: 'delete',
            label: (
                <Popconfirm
                    title="Are you sure you want to delete this ownership type?"
                    placement="left"
                    onConfirm={onDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteMenuItem data-testid={DELETE_OWNERSHIP_TYPE_TEST_ID}>Delete</DeleteMenuItem>
                </Popconfirm>
            ),
        },
    ];

    const menuProps: MenuProps = {
        items,
    };

    return (
        <ActionContainer>
            <Dropdown menu={menuProps} trigger={['click']}>
                <StyledDotsThree size={16} weight="fill" data-testid={DROPDOWN_TEST_ID} />
            </Dropdown>
        </ActionContainer>
    );
};
