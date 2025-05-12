import { ReactElement, ReactNode } from "react";

// Common Props
export interface ChipProps {
  color:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | undefined;
  variant: "filled" | "outlined";
  size: "small" | "medium";
  label: string;
  avatar?: ReactNode;
}

// Base Navigation Item Interface
interface BaseNavigationItem {
  id: string;
  title: string;
  type: string;
  caption?: string;
  icon?: React.ElementType;
  disabled?: boolean;
  link?: string;
  target?: boolean;
  chip?: ChipProps;
}

// Item Type
export interface NavChildItem extends BaseNavigationItem {
  type: string;
  url?: string;
  breadcrumbs?: boolean;
  children?: NavChildItem[];
}

// Collapse Type
export interface NavCollapseItem extends BaseNavigationItem {
  type: string;
  url?: string;
  children?: (NavChildItem | NavCollapseItem)[];
}

// Group Type
export interface NavGroupItem extends BaseNavigationItem {
  type: string;
  url?: string;
  children: (NavChildItem | NavCollapseItem)[];
}

// Menu Items
export interface MenuItems {
  items: NavGroupItem[];
}

// RemItem shape for NavGroup - compatible with the mapping operation
export interface RemItem {
  title: string;
  elements: (NavChildItem | NavCollapseItem)[];
  icon?: React.ElementType;
  url?: string;
}
export interface TransitionsProps {
  children: ReactElement;
  type?: "grow" | "fade" | "collapse" | "slide" | "zoom";
  position?:
    | "top-left"
    | "top-right"
    | "top"
    | "bottom-left"
    | "bottom-right"
    | "bottom";
  direction?: "up" | "down" | "left" | "right";
  in: boolean;
}

export type MenuItemType = {
  id: string;
  title: string;
  type: string;
  url?: string;
  link?: string;
  icon?: React.ElementType;
  children: Array<{
    id: string;
    title: string;
    type: string;
    url?: string;
    icon?: React.ElementType;
    breadcrumbs?: boolean;
    children?: any[];
  }>;
};

export type MenuItemsType = {
  items: MenuItemType[];
};
