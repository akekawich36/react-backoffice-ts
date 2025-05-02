// material-ui
import { styled, Theme } from "@mui/material/styles";
import { Drawer } from "@mui/material";

// project imports
const drawerWidth = 260;

// Mixins for open and closed states
// const openedMixin = (theme: Theme) => ({
//   width: drawerWidth,
//   borderRight: "none",
//   zIndex: 1099,
//   background: theme.palette.background.default,
//   overflowX: "hidden",
//   boxShadow: "none",
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen + 200,
//   }),
// });

// const closedMixin = (theme: Theme) => ({
//   borderRight: "none",
//   zIndex: 1099,
//   background: theme.palette.background.default,
//   overflowX: "hidden",
//   width: 72,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen + 200,
//   }),
// });

// Styled component props
interface MiniDrawerStyledProps {
  theme?: Theme;
  open: boolean;
}

// Styled Drawer component
const MiniDrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<MiniDrawerStyledProps>(({ theme, open }) => ({
  width: drawerWidth,
  borderRight: "0px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(open
    ? {
        "& .MuiDrawer-paper": {
          width: 260,
          overflowX: "hidden",
        },
      }
    : {
        "& .MuiDrawer-paper": {
          width: 72,
          overflowX: "hidden",
        },
      }),
}));

export default MiniDrawerStyled;
