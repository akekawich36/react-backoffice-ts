// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

// project imports
// import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
// import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';

// assets
import MenuIcon from "@mui/icons-material/Menu";

// redux
import { useDispatch } from "react-redux";
import { handleToggleDrawer } from "@/store/reducer/drawer";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export default function Header() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  // const { menuMaster } = useGetMenuMaster();
  // const drawerOpen = menuMaster.isDashboardDrawerOpened;

  return (
    <>
      {/* logo & toggler button */}
      <Box sx={{ width: downMD ? "auto" : 228, display: "flex" }}>
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          Logo
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            cursor: "pointer",
            overflow: "hidden",
            transition: "all .2s ease-in-out",
            bgcolor: "secondary.light",
            color: "secondary.dark",
            "&:hover": {
              bgcolor: "secondary.dark",
              color: "secondary.light",
            },
          }}
          onClick={() => {
            dispatch(handleToggleDrawer());
          }}
          color="inherit"
        >
          <MenuIcon />
        </Avatar>
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification */}
      {/* <NotificationSection /> */}

      {/* profile */}
      {/* <ProfileSection /> */}
    </>
  );
}
