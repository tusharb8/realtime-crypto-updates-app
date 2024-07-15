import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchCoinHistory } from "./currencyAPI";
import { createAppSlice } from "@/lib/createAppSlice";

export interface CurrencySliceState {
    value: {
        data: any[]
        coinName: string
    };
    status: "idle" | "loading" | "failed";
}

const initialState: CurrencySliceState = {
    value: {
        data: [],
        coinName: "bitcoin"
    },
    status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const currencySlice = createAppSlice({
    name: "currency",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: (create: any) => ({
        pushtoStart: create.reducer((state: any, action: PayloadAction<any>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const data = [...state.value.data]
            data.unshift(action.payload)
            data.pop()
            state.value.data = data;
        }),
        pop: create.reducer((state: any, action: PayloadAction<any>) => {
            state.value.data.pop(action.payload);
        }),
        setCoin: create.reducer((state: any, action: PayloadAction<any>) => {
            state.value.coinName = action.payload;
        }),

        addCoinHistory: create.reducer((state: any, action: PayloadAction<any>) => {
            state.value.data.push(action.payload);
        }),
        // Use the `PayloadAction` type to declare the contents of `action.payload`

        // The function below is called a thunk and allows us to perform async logic. It
        // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
        // will call the thunk with the `dispatch` function as the first argument. Async
        // code can then be executed and other actions can be dispatched. Thunks are
        // typically used to make async requests.
        getCurrencyHistory: create.asyncThunk(
            async (coinName: string) => {
                const response = await fetchCoinHistory(coinName);
                // The value we return becomes the `fulfilled` action payload
                return response.data;
            },
            {
                pending: (state: any) => {
                    state.status = "loading";
                },
                fulfilled: (state: any, action: PayloadAction<any>) => {
                    state.status = "idle";
                    console.log("fulfilled action", action)
                    state.value.data = action.payload;
                },
                rejected: (state: any) => {
                    state.status = "failed";
                },
            },
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectCurrency: (currency) => currency.value,
        selectCurrencyStatus: (currency) => currency.status,
    },
});

// Action creators are generated for each case reducer function.
export const { pushtoStart, pop, addCoinHistory, setCoin, getCurrencyHistory } =
    currencySlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCurrency, selectCurrencyStatus } = currencySlice.selectors;

