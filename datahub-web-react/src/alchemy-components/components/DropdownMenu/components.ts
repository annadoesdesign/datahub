import styled from 'styled-components';
import { colors } from '@components/theme';

export interface MenuContainerProps {
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
}

export const MenuContainer = styled.div<MenuContainerProps>`
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: ${(props) => (props.minWidth ? props.minWidth : '180px')};
    width: ${(props) => props.width || 'auto'};
    max-width: ${(props) => props.maxWidth || 'none'};
    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    padding: 8px;
    z-index: 1000;
    overflow: hidden;
`;

export const TriggerContainer = styled.div`
    display: inline-block;
    position: relative;
`;

export const MenuItem = styled.div<{ isDestructive?: boolean; disabled?: boolean }>`
    display: flex;
    align-items: center;
    padding: 8px 4px;
    color: ${(props) => (props.isDestructive ? colors.red[1000] : colors.gray[600])};
    font-size: 14px;
    font-weight: 400;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    border-radius: 4px;
    position: relative;
    min-height: 20px;

    &:hover {
        background-color: ${(props) => (props.disabled ? 'transparent' : colors.gray[1500])};
    }
`;

export const MenuItemContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

export const MenuItemLabel = styled.span`
    font-size: 14px;
    line-height: 20px;
`;

export const MenuItemDescription = styled.span`
    font-size: 12px;
    line-height: 16px;
    color: ${colors.gray[1700]};
    margin-top: 2px;
`;

export const IconContainer = styled.div<{ isLeft?: boolean; isDestructive?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-${(props) => (props.isLeft ? 'right' : 'left')}: 8px;
    color: ${(props) => (props.isDestructive ? colors.red[1200] : colors.gray[1800])};
`;

export const Divider = styled.div`
    height: 1px;
    background-color: ${colors.gray[100]};
    margin: 4px 0;
`;
