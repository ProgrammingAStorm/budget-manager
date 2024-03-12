import { configureStore } from "@reduxjs/toolkit";
import yearsReducer from "./slices/yearsSlice";
import transactionsReducer from "./slices/transactionsSlice";
import categoryReducer from "./slices/categorySlice";
import subCategoryReducer from "./slices/subCategorySlice";
import modalReducer from "./slices/modalSlice";
import budgetReducer from "./slices/budgetSlice";

export const store = configureStore({
  reducer: {
    budgets: budgetReducer,
    years: yearsReducer,
    transactions: transactionsReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
