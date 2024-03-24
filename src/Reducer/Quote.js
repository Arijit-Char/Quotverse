import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading: true,
}
export const Reducer = createReducer(initialState, (builder) => {
    builder
        .addCase('Get_Quote_Request', (state) => {
            state.loading = true;
        })
        .addCase('Get_Quote_Success', (state, action) => {

            state.loading = false;
            state.quote = action.payload;
        })
        .addCase('Get_Quote_Failure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
});
