import { createAction, createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { login, accInfo } from "../../_axiosRequests/requests"

const initialState = {
    active: false,
    loading: false,
    registration: false,
    companyCount: null,
    companyLimit: null,
}

export const requestUserInfo = createAsyncThunk(
    'token/requestUserInfo',
    async (userInfo) => {
        const responseToken = await login(userInfo.login, userInfo.password)
        localStorage.setItem('token', JSON.stringify(responseToken.data))
        const responseInfo = await accInfo();
        // console.log(response);
        return responseInfo.data.eventFiltersInfo;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.active = false;
            localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestUserInfo.pending, (state) => {state.loading = true;})
            .addCase(requestUserInfo.fulfilled, (state, action) => {
                state.active = true; 
                state.companyCount = action.payload.usedCompanyCount; 
                state.companyLimit = action.payload.companyLimit; 
                state.loading = false;
            })
            .addCase(requestUserInfo.rejected, (state, action) => {
                state.loading = false;
                alert('Ошибка авторизации')
                console.log(action.payload);
            })
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;




