import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
};

const drawer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    handleToggleDrawer(state) {
      state.isOpen = !state.isOpen;
    },
    handleCloseDrawer(state) {
      state.isOpen = false;
    },
  },
});

export const { handleToggleDrawer, handleCloseDrawer } = drawer.actions;
export default drawer.reducer;
