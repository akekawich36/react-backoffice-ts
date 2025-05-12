import { memo, useState } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project imports
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import menuItems from "@/menu-items";

import {
  MenuItemsType,
  MenuItemType,
  RemItem,
  NavChildItem,
  NavCollapseItem,
} from "@/types/SideBar";

// ==============================|| SIDEBAR MENU LIST ||============================== //

function MenuList() {
  const [selectedID, setSelectedID] = useState<string>("");

  const lastItem: number | null = null;
  const typedMenuItems = menuItems as unknown as MenuItemsType;

  let lastItemIndex = typedMenuItems.items.length - 1;
  let remItems: RemItem[] = [];
  let lastItemId: string | undefined;

  if (lastItem !== null && lastItem < typedMenuItems.items.length) {
    lastItemId = typedMenuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;

    remItems = typedMenuItems.items
      .slice(lastItem - 1, typedMenuItems.items.length)
      .map((item: MenuItemType) => {
        const typedElements = item.children as unknown as (
          | NavChildItem
          | NavCollapseItem
        )[];

        return {
          title: item.title,
          elements: typedElements,
          icon: item.icon,
          ...(item.url && {
            url: item.url,
          }),
        };
      });
  }

  const navItems = typedMenuItems.items
    .slice(0, lastItemIndex + 1)
    .map((item, index) => {
      switch (item.type) {
        case "group":
          if (item.url && item.id !== lastItemId) {
            return (
              <List key={item.id}>
                <NavItem
                  item={item}
                  level={1}
                  isParents
                  setSelectedID={() => setSelectedID("")}
                />
                {index !== 0 && <Divider sx={{ py: 0.5 }} />}
              </List>
            );
          }

          return (
            <NavGroup
              key={item.id}
              setSelectedID={setSelectedID}
              selectedID={selectedID}
              item={item}
              lastItem={lastItem}
              remItems={remItems}
              lastItemId={lastItemId}
            />
          );
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });

  return (
    <Box
      sx={{
        overflow: "hidden",
        mt: 1.5,
        "& .MuiList-root": {
          p: 0,
          mb: 1,
        },
      }}
    >
      {navItems}
    </Box>
  );
}

export default memo(MenuList);
