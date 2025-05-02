import { memo, useState } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project imports
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import menuItems from "@/menu-items";

// Types
interface NavChildItem {
  id: string;
  title: string;
  type: "item";
  url: string;
  icon: React.ElementType;
  breadcrumbs?: boolean;
}

interface NavGroupItem {
  id: string;
  title: string;
  type: "group";
  children: NavChildItem[];
  icon?: React.ElementType;
  url?: string;
}

interface MenuItems {
  items: NavGroupItem[];
}

// ==============================|| SIDEBAR MENU LIST ||============================== //

function MenuList() {
  const [selectedID, setSelectedID] = useState<string>("");

  const lastItem = null;

  let lastItemIndex = menuItems.items.length - 1;
  let remItems: any[] = [];
  let lastItemId: string | undefined;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items
      .slice(lastItem - 1, menuItems.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
        ...(item.url && {
          url: item.url,
        }),
      }));
  }

  const navItems = menuItems.items
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

  return <Box sx={{ mt: 1.5 }}>{navItems}</Box>;
}

export default memo(MenuList);
