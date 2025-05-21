import React, { useEffect, useRef, useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
// import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// assets
import { SvgIconComponent } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Types
import { ChipProps } from "@/types/SideBar";

// redux
import { IRootState } from "@/types/Store";
import { useSelector, useDispatch } from "react-redux";
import { handleCloseDrawer } from "@/store/reducer/drawer";

function isMuiIcon(icon: React.ElementType): icon is SvgIconComponent {
  return (
    !!(icon as any).muiName ||
    ((icon as any).$$typeof === Symbol.for("react.memo") &&
      (icon as any).type?.muiName === "SvgIcon")
  );
}

const borderRadius = 12;

interface NavItemProps {
  item: {
    id: string;
    title: string;
    type: string;
    url?: string;
    icon?: React.ElementType;
    link?: string;
    target?: boolean;
    disabled?: boolean;
    caption?: string;
    chip?: ChipProps;
    children?: any[];
  };
  level: number;
  isParents?: boolean;
  setSelectedID?: () => void;
}

export default function NavItem({
  item,
  level,
  isParents = false,
  setSelectedID,
}: NavItemProps) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const ref = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const drawerOpen = useSelector((state: IRootState) => state.drawer.isOpen);
  const isSelected = React.useMemo(() => {
    try {
      const itemPath = item?.link || item?.url;

      if (!itemPath || !pathname) {
        return false;
      }

      return !!matchPath({ path: itemPath, end: false }, pathname);
    } catch (error) {
      console.error("Error in matchPath:", error);
      return false;
    }
  }, [item, pathname]);

  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare =
      ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setHover(!!compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
    window.removeEventListener("resize", compareSize);
  }, []);

  let itemIcon;
  if (item.icon) {
    const IconComponent = item.icon;
    if (isMuiIcon(IconComponent)) {
      itemIcon = <IconComponent fontSize={drawerOpen ? "small" : "medium"} />;
    } else {
      itemIcon = (
        <IconComponent strokeWidth={1.5} size={drawerOpen ? "20px" : "24px"} />
      );
    }
  } else {
    itemIcon = (
      <FiberManualRecordIcon
        sx={{
          width: isSelected ? 8 : 6,
          height: isSelected ? 8 : 6,
        }}
        fontSize={level > 0 ? "inherit" : "medium"}
      />
    );
  }

  const itemHandler = () => {
    if (downMD) dispatch(handleCloseDrawer());
    if (item.url) navigate(item.url);
    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  const iconSelectedColor = "secondary.main";

  return (
    <>
      <ListItemButton
        disabled={item.disabled}
        disableRipple={!drawerOpen}
        sx={{
          zIndex: 1201,
          borderRadius: `${borderRadius}px`,
          minHeight: "48px",
          overflow: "hidden",
          "&:hover": {
            bgcolor: "secondary.light",
          },
          "&.Mui-selected": {
            bgcolor: "secondary.light",
            color: iconSelectedColor,
            "&:hover": {
              color: iconSelectedColor,
              bgcolor: "secondary.light",
            },
          },
          ...(drawerOpen && level !== 1 && { ml: `${level * 18}px` }),
          ...(!drawerOpen ? { px: 1.5, py: 0 } : { px: 1.5 }),
          // ...(drawerOpen &&
          //   level === 1 && {
          //     "&:hover": {
          //       bgcolor: "secondary.light",
          //     },
          //     "&.Mui-selected": {
          //       bgcolor: "secondary.light",
          //       color: iconSelectedColor,
          //       "&:hover": {
          //         color: iconSelectedColor,
          //         bgcolor: "secondary.light",
          //       },
          //     },
          //   }),
          // ...((!drawerOpen || level !== 1) && {
          //   py: level === 1 ? 0 : 1,
          //   "&:hover": {
          //     bgcolor: "transparent",
          //   },
          //   "&.Mui-selected": {
          //     "&:hover": {
          //       bgcolor: "transparent",
          //     },
          //     bgcolor: "transparent",
          //   },
          // }),
        }}
        selected={isSelected}
        onClick={() => itemHandler()}
      >
        <ButtonBase
          aria-label="theme-icon"
          sx={{ borderRadius: `${borderRadius}px` }}
          disableRipple={drawerOpen}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 1.5,
              // minWidth: level === 1 ? 36 : 18,
              color: isSelected ? iconSelectedColor : "text.primary",
              ...(!drawerOpen && level === 1
                ? {
                    borderRadius: `${borderRadius}px`,
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
            {itemIcon}
          </ListItemIcon>
        </ButtonBase>

        {(drawerOpen || (!drawerOpen && level !== 1)) && <></>}
        <Tooltip title={item.title} disableHoverListener={!hoverStatus}>
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
                  width: 160,
                }}
              >
                {item.title}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    display: "block",
                  }}
                >
                  {item.caption}
                </Typography>
              )
            }
          />
        </Tooltip>
      </ListItemButton>
    </>
  );
}
