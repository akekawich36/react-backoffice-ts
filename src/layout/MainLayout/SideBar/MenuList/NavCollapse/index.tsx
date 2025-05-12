import { useEffect, useRef, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project imports
import NavItem from "../NavItem";
import Transitions from "@/components/Transitions";

// redux
import { useSelector } from "react-redux";
import { IRootState } from "@/types/Store";

// third party
const borderRadius = 12;

// assets
import { SvgIconComponent } from "@mui/icons-material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { NavCollapseItem, NavChildItem } from "@/types/SideBar";

function isMuiIcon(icon: React.ElementType): icon is SvgIconComponent {
  return (
    !!(icon as any).muiName ||
    ((icon as any).$$typeof === Symbol.for("react.memo") &&
      (icon as any).type?.muiName === "SvgIcon")
  );
}

interface NavCollapseProps {
  menu: NavCollapseItem;
  level: number;
  parentId: string;
}

export default function NavCollapse({
  menu,
  level,
  parentId,
}: NavCollapseProps) {
  const drawerOpen = useSelector((state: IRootState) => state.drawer.isOpen);
  const theme = useTheme();
  const ref = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickMini = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };
  const openMini = Boolean(anchorEl);

  const handleClosePopper = () => {
    setOpen(false);
    if (!openMini) {
      if (!menu.url) {
        setSelected(null);
      }
    }
    setAnchorEl(null);
  };

  const { pathname } = useLocation();

  const checkOpenForParent = (
    child: (NavChildItem | NavCollapseItem)[],
    id: string
  ) => {
    child.forEach((item) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    openMini ? setAnchorEl(null) : setSelected(null);
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }
        if (
          item.link &&
          !!matchPath({ path: item?.link, end: false }, pathname)
        ) {
          setSelected(menu.id);
          setOpen(true);
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);

  const [hoverStatus, setHover] = useState<boolean>(false);

  const compareSize = () => {
    const compare =
      ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setHover(Boolean(compare));
  };

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
    window.removeEventListener("resize", compareSize);
  }, []);

  useEffect(() => {
    if (menu.url === pathname) {
      setSelected(menu.id);
      setAnchorEl(null);
      setOpen(true);
    }
  }, [pathname, menu]);

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return (
          <NavCollapse
            key={item.id}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case "item":
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const isSelected = selected === menu.id;

  let menuIcon;
  if (menu.icon) {
    const IconComponent = menu.icon;
    if (isMuiIcon(IconComponent)) {
      menuIcon = <IconComponent fontSize={drawerOpen ? "small" : "medium"} />;
    } else {
      menuIcon = (
        <IconComponent strokeWidth={1.5} size={drawerOpen ? "20px" : "24px"} />
      );
    }
  } else {
    menuIcon = (
      <FiberManualRecordIcon
        sx={{
          width: isSelected ? 8 : 6,
          height: isSelected ? 8 : 6,
        }}
        fontSize={level > 0 ? "inherit" : "medium"}
      />
    );
  }

  const collapseIcon = drawerOpen ? (
    <KeyboardArrowUpIcon sx={{ display: drawerOpen ? "block" : "none" }} />
  ) : (
    <KeyboardArrowDownIcon sx={{ display: drawerOpen ? "block" : "none" }} />
  );

  const iconSelectedColor = "secondary.main";

  return (
    <>
      <ListItemButton
        sx={{
          zIndex: 1201,
          borderRadius: `${borderRadius}px`,
          mb: 0.5,
          minHeight: "46px",
          ...(drawerOpen && level !== 1 && { ml: `${level * 18}px` }),
          ...(!drawerOpen ? { pl: 0 } : {}),
          ...(drawerOpen &&
            level === 1 && {
              "&:hover": { bgcolor: "secondary.light" },
              "&.Mui-selected": {
                bgcolor: "secondary.light",
                color: iconSelectedColor,
                "&:hover": {
                  color: iconSelectedColor,
                  bgcolor: "secondary.light",
                },
              },
            }),
          ...((!drawerOpen || level !== 1) && {
            py: level === 1 ? 0 : 1,
            "&:hover": { bgcolor: "transparent" },
            "&.Mui-selected": {
              "&:hover": { bgcolor: "transparent" },
              bgcolor: "transparent",
            },
          }),
        }}
        selected={isSelected}
        {...(!drawerOpen
          ? {
              onMouseEnter: handleClickMini,
              onMouseLeave: handleClosePopper,
            }
          : {})}
        onClick={handleClickMini}
      >
        {menuIcon && (
          <ListItemIcon
            sx={{
              minWidth: level === 1 ? 36 : 18,
              color: isSelected ? iconSelectedColor : "text.primary",
              ...(!drawerOpen && level === 1
                ? {
                    borderRadius: `${borderRadius}px`,
                    width: 48,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "secondary.light",
                    },
                    ...(isSelected && {
                      bgcolor: "secondary.light",
                      "&:hover": {
                        bgcolor: "secondary.light",
                      },
                    }),
                  }
                : {}),
            }}
          >
            {menuIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && <></>}
        <Tooltip title={menu.title} disableHoverListener={!hoverStatus}>
          <ListItemText
            primary={
              <Typography
                ref={ref}
                noWrap
                variant="body2"
                color="inherit"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: 120,
                }}
              >
                {menu.title}
              </Typography>
            }
            secondary={
              menu.caption && (
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    display: "block",
                  }}
                >
                  {menu.caption}
                </Typography>
              )
            }
          />
        </Tooltip>

        {openMini || open ? (
          collapseIcon
        ) : (
          <KeyboardArrowDownIcon
            sx={{ display: drawerOpen ? "block" : "none" }}
          />
        )}

        {!drawerOpen && (
          <Popper
            open={openMini}
            anchorEl={anchorEl}
            placement="right-start"
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [-12, 0],
                },
              },
            ]}
            sx={{
              overflow: "visible",
              zIndex: 2001,
              minWidth: 180,
              // "&:before": {
              //   content: '""',
              //   bgcolor: "background.paper",
              //   transform: "translateY(-50%) rotate(45deg)",
              //   zIndex: 120,
              //   borderLeft: `1px solid`,
              //   borderBottom: `1px solid`,
              //   borderColor: "divider",
              // },
            }}
          >
            {({ TransitionProps }) => (
              <Transitions in={openMini} {...TransitionProps}>
                <Paper
                  sx={{
                    overflow: "hidden",
                    mt: 1.5,
                    boxShadow: theme.shadows[8],
                    backgroundImage: "none",
                    borderRadius: "12px",
                    px: 2,
                    py: 1,
                  }}
                >
                  <ClickAwayListener onClickAway={handleClosePopper}>
                    <Box>{menus}</Box>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
        )}
      </ListItemButton>
      {drawerOpen && (
        <Transitions type="collapse" in={open}>
          <List
            disablePadding
            sx={{
              position: "relative",
              "& .MuiListItemButton-root": {
                marginLeft: "0",
                paddingLeft: "46px",
                gap: "16px",
                "&:hover": { bgcolor: "secondary.light" },
              },
              // "&:after": {
              //   content: "''",
              //   position: "absolute",
              //   left: "16px",
              //   top: 0,
              //   height: "100%",
              //   width: "1px",
              //   opacity: 1,
              //   bgcolor: "primary.light",
              // },
            }}
          >
            {menus}
          </List>
        </Transitions>
      )}
    </>
  );
}
