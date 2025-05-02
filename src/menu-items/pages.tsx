import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: "Pages",
  caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Authentication",
      type: "collapse",
      icon: AccountBalanceWalletIcon,

      children: [
        {
          id: "login3",
          title: "Login",
          type: "item",
          // url: "/login",
          // target: true,
          icon: AccountBalanceWalletIcon,
        },
        {
          id: "register3",
          title: "Register",
          type: "item",
          // url: '/pages/register/register3',
          // target: true,
          icon: AccountBalanceWalletIcon,
        },
      ],
    },
  ],
};

export default pages;
