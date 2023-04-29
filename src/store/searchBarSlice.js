import { createSlice } from '@reduxjs/toolkit'

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        current: {
            variety: null,
            favourite: null,
            gender: null,
            age: {
                min: null,
                max: null
            }
        }
    },
    reducers: {
        setSearchBarCurrentValue: (state, action) => {
            state.current = { ...state.current, ...action.payload }
        }
    },
})

export const selectSearchCurrentValue = (state) => state.searchBar.current
// Action creators are generated for each case reducer function
export const { setSearchBarCurrentValue  } = searchBarSlice.actions

export default searchBarSlice.reducer