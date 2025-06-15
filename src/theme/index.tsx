const theme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#2196f3",
          light: "#e3f2fd",
          dark: "#1e88e5",
          200: "#90caf9",
          800: "#1565c0",
        },
        secondary: {
          light: "#ede7f6",
          main: "#673ab7",
          dark: "#5e35b1",
          200: "#b39ddb",
          800: "#4527a0",
        },
        common: {
          border: "#000",
        },
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        background: {
          paper: "#ffffff",
          default: "#ffffff",
        },
        action: {
          active: "rgba(0, 0, 0, 0.54)",
          hover: "rgba(0, 0, 0, 0.04)",
          hoverOpacity: 0.04,
          selected: "rgba(0, 0, 0, 0.08)",
          selectedOpacity: 0.08,
          disabled: "rgba(0, 0, 0, 0.26)",
          disabledBackground: "rgba(0, 0, 0, 0.04)",
          disabledOpacity: 0.38,
          focus: "rgba(0, 0, 0, 0.12)",
          focusOpacity: 0.12,
          activatedOpacity: 0.12,
        },
      },
    },
    dark: {
      palette: {
        common: {
          border: "#FFF",
        },
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9f9f9f",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        background: {
          paper: "#000",
          default: "#000",
        },
        action: {
          active: "#FFF",
          hover: "rgba(255, 255, 255, 0.08)",
          hoverOpacity: 0.08,
          selected: "rgba(255, 255, 255, 0.16)",
          selectedOpacity: 0.08,
          disabled: "rgba(255, 255, 255, 0.3)",
          disabledBackground: "rgba(255, 255, 255, 0.08)",
          disabledOpacity: 0.38,
          focus: "rgba(255, 255, 255, 0.12)",
          focusOpacity: 0.12,
          activatedOpacity: 0.24,
        },
      },
    },
  },
};

export default theme;
