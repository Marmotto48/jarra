import { configureStore } from "@reduxjs/toolkit";
// import customerReducer from "./customers";
const store = configureStore({
  //   reducer: { customer: customerReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export default store;
