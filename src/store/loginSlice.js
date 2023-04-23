import { createSelector, createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'loginPage',
  initialState: {
    requireLogin: false,
    returnUrl: "",
    actionRadio: {
        data: ["HAVEAC", "NOAC"],
        value: "HAVEAC"
    },
  },
  reducers: {
    setRequireLogin: (state, action) => {
        state.requireLogin = action.payload
    },
    setReturnUrl: (state, action) => {
        state.returnUrl = action.payload
    },
    setActionRadioValue: (state, action) => {
        state.actionRadio.value = action.payload
    }
  },
})

export const selectRequireLogin = (state) => state.loginPage.requireLogin
export const selectReturnUrl = (state) => state.loginPage.returnUrl
export const selectActionRadio = (state) => state.loginPage.actionRadio
export const selectHaveAc = (state) => state.loginPage.actionRadio.value == state.loginPage.actionRadio.data[0]
export const selectActionLabel = createSelector([selectHaveAc], (haveAc) => {
    if(haveAc) {
        return "Login"
    } else {
        return "Register"
    }
})

export const { setRequireLogin, setReturnUrl, setActionRadioValue } = loginSlice.actions

export default loginSlice.reducer