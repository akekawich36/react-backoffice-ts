import type React from "react";
import { Outlet } from "react-router-dom";

// Material UI
import { Box, AppBar, Toolbar } from "@mui/material";

// Projects Import
import MainContentStyled from "./MainContentStyle";
import Header from "./Header";
import Sidebar from "./SideBar";

// redux
import { useSelector } from "react-redux";
import { IRootState } from "@/types/Store";

type MainLayoutProps = {};

const MainLayout: React.FC<MainLayoutProps> = () => {
  const drawerOpen = useSelector((state: IRootState) => state.drawer.isOpen);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{ bgcolor: "background.default" }}
        >
          <Toolbar sx={{ p: 2 }}>
            <Header />
          </Toolbar>
        </AppBar>

        <Sidebar />

        <MainContentStyled {...{ borderRadius: 12, open: drawerOpen }}>
          <Box
            sx={{
              ...{ px: { xs: 0 } },
              minHeight: "calc(100vh - 128px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet />
          </Box>
        </MainContentStyled>
      </Box>
    </>
  );
};

export default MainLayout;
