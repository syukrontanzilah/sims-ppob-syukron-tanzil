/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHistory } from "@/utils/historyUtils";
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"

interface TransactionRecord {
    invoice_number: string;
    transaction_type: string;
    description: string;
    total_amount: number;
    created_on: string;
  }
  
  interface HistoryState {
    transactions: TransactionRecord[];
    offset: number;
    limit: number;
    hasMore: boolean;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: HistoryState = {
    transactions: [],
    offset: 0,
    limit: 5,
    hasMore: true,
    loading: false,
    error: null,
  };

export const fetchHistory = createAsyncThunk(
    "history/fetchHistory",
    async (offset:number, {getState}: any) => {
        const state: HistoryState = getState().history;
        const res = await getHistory(offset, state.limit);
        return res.data
    }
);

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        resetHistory(state){
            state.transactions = [];
            state.offset = 0;
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchHistory.fulfilled, (state, action) => {
            const newRecords = action.payload.records.filter(
                (record: TransactionRecord) =>
                    !state.transactions.some(
                        (item) => item.invoice_number === record.invoice_number
                    )
            );
            state.transactions = [...state.transactions, ...newRecords];
            state.hasMore = action.payload.records.length === state.limit;
            state.loading = false
        })
        .addCase(fetchHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error fetch history!"
        })
    }
})

export const {resetHistory} = historySlice.actions;
export default historySlice.reducer;