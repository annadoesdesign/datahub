import { ReactNode } from 'react';

export type Placement =
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight';

export type TriggerType = 'click' | 'hover' | 'contextMenu';

export interface BaseMenuItemProps {
    /**
     * Optional key to identify the menu item
     */
    key?: string;

    /**
     * Additional props to add to the menu item
     */
    [key: string]: any;
}

export interface DividerMenuItemProps extends BaseMenuItemProps {
    /**
     * Type of menu item - divider
     */
    type: 'divider';
}

export interface ActionMenuItemProps extends BaseMenuItemProps {
    /**
     * Text label to display for the menu item
     */
    label: string;

    /**
     * Secondary text to display below the label
     */
    description?: string;

    /**
     * Function to execute when menu item is clicked
     */
    onClick?: () => void;

    /**
     * Icon to display on the left side of the menu item
     */
    leftIcon?: ReactNode;

    /**
     * Icon to display on the right side of the menu item
     */
    rightIcon?: ReactNode;

    /**
     * Whether this is a destructive action (will display in red)
     */
    isDestructive?: boolean;

    /**
     * Whether the menu item is disabled
     */
    disabled?: boolean;
}

export type MenuItemProps = ActionMenuItemProps | DividerMenuItemProps;

export interface DropdownMenuProps {
    /**
     * Array of menu items to display
     */
    items: MenuItemProps[];

    /**
     * Custom className for the menu container
     */
    menuClassName?: string;

    /**
     * Custom className for menu items
     */
    menuItemClassName?: string;

    /**
     * The trigger element that opens the dropdown menu
     */
    children: ReactNode;

    /**
     * What action triggers the dropdown menu
     */
    trigger?: TriggerType | TriggerType[];

    /**
     * Placement of the dropdown menu
     */
    placement?: Placement;

    /**
     * Is the dropdown menu visible
     */
    open?: boolean;

    /**
     * Called when visibility changes
     */
    onOpenChange?: (open: boolean) => void;

    /**
     * Allow the dropdown to stay open after clicking an item
     */
    closeOnClick?: boolean;

    /**
     * Width of the menu
     */
    width?: string | number;

    /**
     * Minimum width of the menu
     */
    minWidth?: string | number;

    /**
     * Maximum width of the menu
     */
    maxWidth?: string | number;
}
