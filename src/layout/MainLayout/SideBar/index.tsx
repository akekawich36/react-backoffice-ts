import { memo, useMemo } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { Drawer, Box } from "@mui/material";

// third party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MenuList from "./MenuList";
// import LogoSection from "../LogoSection";
import MiniDrawerStyled from "./MiniDrawerStyled";

// redux
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/types/Store";
import { handleToggleDrawer } from "@/store/reducer/drawer";

const drawerWidth = 260;

// ==============================|| SIDEBAR DRAWER ||============================== //

function Sidebar() {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state: IRootState) => state.drawer.isOpen);
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const logo = useMemo(
    () => (
      <Box sx={{ display: "flex", p: 2 }}>
        Logo
        {/* <LogoSection /> */}
      </Box>
    ),
    []
  );

  const drawer = useMemo(() => {
    let drawerSX = {
      paddingLeft: "16px",
      paddingRight: "16px",
      marginTop: "0px",
    };
    // if (drawerOpen)
    //   drawerSX = {
    //     paddingLeft: "16px",
    //     paddingRight: "16px",
    //     marginTop: "0px",
    //   };

    return (
      <>
        {downMD ? (
          <Box sx={drawerSX}>
            <MenuList />
          </Box>
        ) : (
          <PerfectScrollbar
            style={{
              height: "calc(100vh - 88px)",
              ...drawerSX,
            }}
          >
            <MenuList />
          </PerfectScrollbar>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downMD, drawerOpen]);

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: { xs: "auto", md: 260 } }}
    >
      {downMD || (undefined && drawerOpen) ? (
        <>
          <Drawer
            variant={downMD ? "temporary" : "persistent"}
            anchor="left"
            open={drawerOpen}
            onClose={() => dispatch(handleToggleDrawer())}
            sx={{
              "& .MuiDrawer-paper": {
                mt: downMD ? 0 : 11,
                zIndex: 1099,
                width: drawerWidth,
                bgcolor: "background.default",
                color: "text.primary",
                borderRight: "none",
              },
            }}
            ModalProps={{ keepMounted: true }}
            color="inherit"
          >
            {downMD && logo}
            {drawer}
          </Drawer>
        </>
      ) : (
        <>
          <MiniDrawerStyled variant="permanent" open={drawerOpen}>
            <Box sx={{ mt: 10 }}>{drawer}</Box>
          </MiniDrawerStyled>
        </>
      )}
    </Box>
  );
}

export default memo(Sidebar);
