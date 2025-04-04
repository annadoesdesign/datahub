import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    Divider,
    IconContainer,
    MenuContainer,
    MenuItem,
    MenuItemContent,
    MenuItemDescription,
    MenuItemLabel,
    TriggerContainer,
} from './components';
import { ActionMenuItemProps, DropdownMenuProps, MenuItemProps, Placement } from './types';
import './dropdown-menu.less';

/**
 * Calculate position for the dropdown menu based on placement
 */
const getPosition = (
    triggerRect: DOMRect,
    menuRect: DOMRect,
    placement: Placement = 'bottomRight',
): { top: number; left: number } => {
    const { top, left, bottom, right, width, height } = triggerRect;
    const { width: menuWidth, height: menuHeight } = menuRect;

    const positions: Record<Placement, { top: number; left: number }> = {
        topLeft: { top: top - menuHeight, left },
        top: { top: top - menuHeight, left: left + width / 2 - menuWidth / 2 },
        topRight: { top: top - menuHeight, left: right - menuWidth },
        leftTop: { top, left: left - menuWidth },
        left: { top: top + height / 2 - menuHeight / 2, left: left - menuWidth },
        leftBottom: { top: bottom - menuHeight, left: left - menuWidth },
        rightTop: { top, left: right },
        right: { top: top + height / 2 - menuHeight / 2, left: right },
        rightBottom: { top: bottom - menuHeight, left: right },
        bottomLeft: { top: bottom, left },
        bottom: { top: bottom, left: left + width / 2 - menuWidth / 2 },
        bottomRight: { top: bottom, left: right - menuWidth },
    };

    return positions[placement];
};

/**
 * DropdownMenu - A customizable dropdown menu component
 *
 * @example
 * ```tsx
 * <DropdownMenu
 *   items={[
 *     { label: 'Edit', onClick: () => console.log('Edit clicked'), leftIcon: <PencilSimple size={16} /> },
 *     { label: 'Copy', onClick: () => console.log('Copy clicked') },
 *     { label: 'Delete', onClick: () => console.log('Delete clicked'), isDestructive: true }
 *   ]}
 *   placement="bottomRight"
 * >
 *   <DotsThreeOutlineVertical size={16} weight="fill" />
 * </DropdownMenu>
 * ```
 */
export const DropdownMenu = ({
    items,
    menuClassName,
    menuItemClassName,
    children,
    trigger = 'click',
    placement = 'bottomRight',
    open: controlledOpen,
    onOpenChange,
    closeOnClick = true,
    width,
    minWidth,
    maxWidth,
}: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    // Memoize the triggers array to prevent useCallback dependencies from changing
    const triggers = useMemo(() => {
        return Array.isArray(trigger) ? trigger : [trigger];
    }, [trigger]);

    const isControlled = controlledOpen !== undefined;
    const menuOpen = isControlled ? controlledOpen : isOpen;

    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Function to update the position of the dropdown
    const updatePosition = useCallback(() => {
        if (triggerRef.current && menuRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const menuRect = menuRef.current.getBoundingClientRect();

            const { top, left } = getPosition(triggerRect, menuRect, placement);

            // Add scroll position
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

            setPosition({
                top: top + scrollTop,
                left: left + scrollLeft,
            });
        }
    }, [placement]);

    // Handle opening and closing the dropdown
    const handleOpenChange = useCallback(
        (open: boolean) => {
            if (!isControlled) {
                setIsOpen(open);
            }
            onOpenChange?.(open);

            if (open) {
                // Update position after state change
                setTimeout(updatePosition, 0);
            }
        },
        [isControlled, onOpenChange, updatePosition],
    );

    // Click event handler
    const handleClick = useCallback(() => {
        if (triggers.includes('click')) {
            handleOpenChange(!menuOpen);
        }
    }, [triggers, menuOpen, handleOpenChange]);

    // Mouse enter/leave handlers for hover trigger
    const handleMouseEnter = useCallback(() => {
        if (triggers.includes('hover')) {
            handleOpenChange(true);
        }
    }, [triggers, handleOpenChange]);

    const handleMouseLeave = useCallback(() => {
        if (triggers.includes('hover')) {
            handleOpenChange(false);
        }
    }, [triggers, handleOpenChange]);

    // Context menu handler
    const handleContextMenu = useCallback(
        (e: React.MouseEvent) => {
            if (triggers.includes('contextMenu')) {
                e.preventDefault();
                handleOpenChange(true);
            }
        },
        [triggers, handleOpenChange],
    );

    // Update dropdown position on window resize
    useEffect(() => {
        const handleResize = () => {
            if (menuOpen) {
                updatePosition();
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        };
    }, [menuOpen, updatePosition]);

    // Click outside handler to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuOpen &&
                triggerRef.current &&
                menuRef.current &&
                !triggerRef.current.contains(event.target as Node) &&
                !menuRef.current.contains(event.target as Node)
            ) {
                handleOpenChange(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen, handleOpenChange]);

    // Update position whenever menu is opened
    useLayoutEffect(() => {
        if (menuOpen) {
            updatePosition();
        }
    }, [menuOpen, updatePosition]);

    // Render menu items
    const renderActionItem = useCallback(
        (item: ActionMenuItemProps, index: number) => {
            const {
                label,
                description,
                onClick,
                leftIcon,
                rightIcon,
                isDestructive,
                disabled,
                key,
                ...otherItemProps
            } = item;

            const handleItemClick = () => {
                if (!disabled && onClick) {
                    onClick();
                    if (closeOnClick) {
                        handleOpenChange(false);
                    }
                }
            };

            return (
                <MenuItem
                    key={key || `item-${index}`}
                    isDestructive={isDestructive}
                    disabled={disabled}
                    onClick={handleItemClick}
                    className={menuItemClassName}
                    {...otherItemProps}
                >
                    {leftIcon && (
                        <IconContainer isLeft isDestructive={isDestructive}>
                            {leftIcon}
                        </IconContainer>
                    )}
                    <MenuItemContent>
                        <MenuItemLabel>{label}</MenuItemLabel>
                        {description && <MenuItemDescription>{description}</MenuItemDescription>}
                    </MenuItemContent>
                    {rightIcon && <IconContainer isDestructive={isDestructive}>{rightIcon}</IconContainer>}
                </MenuItem>
            );
        },
        [menuItemClassName, closeOnClick, handleOpenChange],
    );

    const renderItem = useCallback(
        (item: MenuItemProps, index: number) => {
            if ('type' in item && item.type === 'divider') {
                return <Divider key={item.key || `divider-${index}`} />;
            }

            return renderActionItem(item as ActionMenuItemProps, index);
        },
        [renderActionItem],
    );

    return (
        <TriggerContainer
            ref={triggerRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleContextMenu}
        >
            {children}

            {menuOpen &&
                createPortal(
                    <MenuContainer
                        ref={menuRef}
                        className={menuClassName}
                        style={{
                            top: position.top,
                            left: position.left,
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        width={width}
                        minWidth={minWidth}
                        maxWidth={maxWidth}
                    >
                        {items.map((item, index) => renderItem(item, index))}
                    </MenuContainer>,
                    document.body,
                )}
        </TriggerContainer>
    );
};
