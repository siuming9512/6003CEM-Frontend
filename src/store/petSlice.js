import { createSelector, createSlice } from '@reduxjs/toolkit'
import { selectSearchCurrentValue } from './searchBarSlice'

export const petSlice = createSlice({
    name: 'pet',
    initialState: {
        pets: [],
        favourites: []
    },
    reducers: {
        setPets: (state, action) => {
            state.pets = action.payload
        },
        setFavourites: (state, action) => {
            state.favourites = action.payload
        }
    },
})

export const selectPets = (state) => state.pets
export const selectFavourites = (state) => state.favourites

export const selectFavouritedPets = createSelector(
    (state) => state.pets.pets,
    (state) => state.pets.favourites,
    (state) => state.searchBar.current,
    (pets, favourites, searchCurrentValue) => {
        let data = pets.map(p => ({ ...p, isFavourite: favourites.some(x => x == p.id) }))
        switch (searchCurrentValue.favourite) {
            case 0:
                data = data.filter(x => !x.isFavourite)
                break;
            case 1:
                data = data.filter(x => x.isFavourite)
                break;
        }

        return data;
    })

export const { setPets, setFavourites } = petSlice.actions

export default petSlice.reducer