// material-ui
import { styled } from "@mui/material/styles";
import { type Theme } from "@mui/material";

// project imports
const drawerWidth = 260;

// ==============================|| MAIN LAYOUT - STYLED ||============================== //

type MainContentStyledProps = {
  theme?: Theme;
  open: boolean;
  borderRadius?: number;
};

const MainContentStyled = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "borderRadius",
})<MainContentStyledProps>(({ theme, open, borderRadius }) => ({
  backgroundColor: theme.palette.grey[100],
  minWidth: "1%",
  width: "100%",
  minHeight: "calc(100vh - 88px)",
  flexGrow: 1,
  padding: 20,
  marginTop: 88,
  marginRight: 20,
  borderRadius: `${borderRadius}px`,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    "margin",
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen + 200,
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen + 200,
        }
  ),
  ...(!open && {
    [theme.breakpoints.up("md")]: {
      marginLeft: -(drawerWidth - 80),
      width: `calc(100% - ${drawerWidth}px)`,
      marginTop: 88,
    },
  }),
  ...(open && {
    marginLeft: 0,
    marginTop: 88,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.up("md")]: {
      marginTop: 88,
    },
  }),
  [theme.breakpoints.down("md")]: {
    marginLeft: 20,
    padding: 16,
    marginTop: 88,
    ...(!open && {
      width: `calc(100% - ${drawerWidth}px)`,
    }),
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

export default MainContentStyled;
