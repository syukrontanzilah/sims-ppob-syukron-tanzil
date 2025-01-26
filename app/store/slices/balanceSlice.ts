import { getBalance } from "@/utils/balanceUtils";
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";


interface BalanceState {
    balance: number | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: BalanceState = {
    balance: 0,
    loading: false,
    error: null,
  };

export const fetchBalance = createAsyncThunk("balance/fetchBalance", async () => {
    const response = await getBalance();
    return response.balance;
});

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBalance.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBalance.fulfilled, (state, action) => {
            state.loading = false;
            state.balance = action.payload;
        })
        .addCase(fetchBalance.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Gagal fetch balance!"
        })
    }
})

export default balanceSlice.reducer