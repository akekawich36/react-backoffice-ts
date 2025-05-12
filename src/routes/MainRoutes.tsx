import MainLayout from "@/layout/MainLayout";
import AuthGuard from "@/utils/AuthGuard";

import MainPage from "@/pages";
import FormPage from "@/pages/form";

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
    {
      path: "/form",
      element: <FormPage />,
    },
  ],
};

export default MainRoutes;
