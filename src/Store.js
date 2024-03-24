import { configureStore } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer/Quote";
const store = configureStore({
    reducer: {
        quote: Reducer,
    }
});
export default store;
