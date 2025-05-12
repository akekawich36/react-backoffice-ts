// material-ui
import { styled, Theme } from "@mui/material/styles";
import { Drawer } from "@mui/material";

// project imports
const drawerWidth = 260;

// Styled component props
interface MiniDrawerStyledProps {
  theme?: Theme;
  open: boolean;
}

// Styled Drawer component
const MiniDrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<MiniDrawerStyledProps>(({ theme, open }) => ({
  width: open ? drawerWidth : 80, // Control width directly here
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: 1099,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen + 200,
  }),
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : 80, // Ensure transition applies here as well
    overflowX: "hidden",
    borderRight: "none",
    boxShadow: "none",
    zIndex: 1099,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen + 200,
    }),
  },
}));

export default MiniDrawerStyled;
