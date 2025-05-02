import MainLayout from "@/layout/MainLayout";
import AuthGuard from "@/utils/AuthGuard";

import MainPage from "@/pages";

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "",
      element: <MainPage />,
    },
  ],
};

export default MainRoutes;
