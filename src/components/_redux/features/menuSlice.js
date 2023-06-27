import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    menu: false,
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        showMenu(state) {
            state.menu = !state.menu;
        }
    }
})

export const { showMenu } = menuSlice.actions;
export default menuSlice.reducer;




