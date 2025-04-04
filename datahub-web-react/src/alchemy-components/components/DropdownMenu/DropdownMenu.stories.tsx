import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DotsThreeOutlineVertical, PencilSimple, Copy, Trash, CaretRight, ArrowCircleUpRight } from 'phosphor-react';
import { colors } from '@components/theme';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuProps } from './types';

const meta: Meta<DropdownMenuProps> = {
    title: 'Component / DropdownMenu',
    component: DropdownMenu,
    parameters: {
        layout: 'centered',
        docs: {
            subtitle: 'A pure React dropdown menu component without any external dependencies',
        },
    },
    argTypes: {
        items: {
            description: 'Array of menu items to display in the dropdown',
            control: 'object',
        },
        placement: {
            description: 'Placement of the dropdown menu relative to the trigger element',
            control: 'select',
            options: [
                'topLeft',
                'top',
                'topRight',
                'leftTop',
                'left',
                'leftBottom',
                'rightTop',
                'right',
                'rightBottom',
                'bottomLeft',
                'bottom',
                'bottomRight',
            ],
        },
        trigger: {
            description: 'What action triggers the dropdown menu to appear',
            control: 'select',
            options: ['click', 'hover', 'contextMenu'],
        },
        width: {
            description: 'Width of the menu',
            control: 'text',
        },
        minWidth: {
            description: 'Minimum width of the menu',
            control: 'text',
        },
        maxWidth: {
            description: 'Maximum width of the menu',
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<DropdownMenuProps>;

export const Basic: Story = {
    args: {
        items: [
            {
                label: 'Edit',
                onClick: () => console.log('Edit clicked'),
                leftIcon: <PencilSimple size={16} />,
            },
            {
                label: 'Copy',
                onClick: () => console.log('Copy clicked'),
                leftIcon: <Copy size={16} />,
            },
            {
                label: 'Delete',
                onClick: () => console.log('Delete clicked'),
                isDestructive: true,
                leftIcon: <Trash size={16} />,
            },
        ],
        placement: 'bottomRight',
        trigger: 'click',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

export const WithDivider: Story = {
    args: {
        items: [
            {
                label: 'View',
                onClick: () => console.log('View clicked'),
            },
            {
                label: 'Edit',
                onClick: () => console.log('Edit clicked'),
            },
            {
                type: 'divider',
            },
            {
                label: 'Delete',
                onClick: () => console.log('Delete clicked'),
                isDestructive: true,
            },
        ],
        placement: 'bottomRight',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

export const WithDescriptions: Story = {
    args: {
        items: [
            {
                label: 'View Details',
                description: 'See all information about this item',
                onClick: () => console.log('View clicked'),
                leftIcon: <PencilSimple size={16} />,
            },
            {
                label: 'Share with Team',
                description: 'Send to your colleagues',
                onClick: () => console.log('Share clicked'),
            },
            {
                type: 'divider',
            },
            {
                label: 'Delete Permanently',
                description: 'This action cannot be undone',
                onClick: () => console.log('Delete clicked'),
                isDestructive: true,
                leftIcon: <Trash size={16} />,
            },
        ],
        placement: 'bottomRight',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

export const WithVaryingDescriptionLengths: Story = {
    args: {
        items: [
            {
                label: 'Short item',
                onClick: () => console.log('Short clicked'),
                leftIcon: <PencilSimple size={16} />,
            },
            {
                label: 'Item with description',
                description: 'This is a simple description',
                onClick: () => console.log('Medium clicked'),
                leftIcon: <Copy size={16} />,
            },
            {
                label: 'Long description item',
                description:
                    'This is a much longer description that spans multiple lines to demonstrate how the icon alignment works with larger menu items',
                onClick: () => console.log('Long clicked'),
                leftIcon: <ArrowCircleUpRight size={16} />,
            },
            {
                type: 'divider',
            },
            {
                label: 'Delete',
                description: 'This action is destructive',
                onClick: () => console.log('Delete clicked'),
                isDestructive: true,
                leftIcon: <Trash size={16} />,
            },
        ],
        placement: 'bottomRight',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

export const CustomWidth: Story = {
    args: {
        items: [
            {
                label: 'View details',
                onClick: () => console.log('View clicked'),
                leftIcon: <PencilSimple size={16} />,
            },
            {
                label: 'This menu has a custom width of 300px',
                description: 'Width is set to exactly 300px',
                onClick: () => console.log('Custom width clicked'),
                leftIcon: <Copy size={16} />,
            },
        ],
        width: '300px',
        placement: 'bottomRight',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

export const ContentHuggingWidth: Story = {
    args: {
        items: [
            {
                label: 'Short item',
                onClick: () => console.log('Short clicked'),
                leftIcon: <PencilSimple size={16} />,
            },
            {
                label: 'This menu hugs its content with a minimum width of 120px',
                onClick: () => console.log('Hugging width clicked'),
                leftIcon: <Copy size={16} />,
            },
        ],
        minWidth: '120px',
        placement: 'bottomRight',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

export const MaxWidth: Story = {
    args: {
        items: [
            {
                label: 'This menu has a maximum width of 200px',
                description: 'Text that overflows the maximum width will wrap to multiple lines',
                onClick: () => console.log('Max width clicked'),
                leftIcon: <PencilSimple size={16} />,
            },
        ],
        maxWidth: '200px',
        placement: 'bottomRight',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

export const WithDisabledItems: Story = {
    args: {
        items: [
            {
                label: 'Edit',
                onClick: () => console.log('Edit clicked'),
            },
            {
                label: 'Download',
                onClick: () => console.log('Download clicked'),
                disabled: true,
            },
            {
                label: 'Delete',
                onClick: () => console.log('Delete clicked'),
                isDestructive: true,
            },
        ],
        placement: 'bottomRight',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

export const WithRightIcons: Story = {
    args: {
        items: [
            {
                label: 'Open in new tab',
                onClick: () => console.log('Open in new tab clicked'),
                rightIcon: <CaretRight size={16} />,
            },
            {
                label: 'Share',
                onClick: () => console.log('Share clicked'),
                rightIcon: <CaretRight size={16} />,
            },
        ],
        placement: 'bottomRight',
        children: (
            <DotsThreeOutlineVertical size={16} weight="fill" color={colors.gray[1800]} style={{ cursor: 'pointer' }} />
        ),
    },
};

// Example of controlled dropdown
export const Controlled = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <p style={{ marginBottom: '20px' }}>
                <button type="button" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? 'Close' : 'Open'} Dropdown
                </button>
            </p>

            <DropdownMenu
                items={[
                    { label: 'Item 1', onClick: () => console.log('Item 1 clicked') },
                    { label: 'Item 2', onClick: () => console.log('Item 2 clicked') },
                ]}
                open={isOpen}
                onOpenChange={setIsOpen}
                closeOnClick={false}
                placement="bottom"
            >
                <DotsThreeOutlineVertical
                    size={16}
                    weight="fill"
                    color={colors.gray[1800]}
                    style={{ cursor: 'pointer' }}
                />
            </DropdownMenu>
        </div>
    );
};
