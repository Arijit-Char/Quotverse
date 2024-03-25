import { configureStore } from "@reduxjs/toolkit";
import { LikeReducer, Reducer } from "./Reducer/Quote";
const store = configureStore({
    reducer: {
        quote: Reducer,
        likes: LikeReducer,
    }
});
export default store;
