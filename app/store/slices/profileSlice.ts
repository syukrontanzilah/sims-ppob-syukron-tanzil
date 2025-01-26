/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProfile } from "@/utils/profileUtils";
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

interface UserData {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  }
  
  interface ProfileState {
    data: UserData | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
  };

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
    const response = await getProfile();
    return response;
});

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Gagal fetch data profil!"
        })
    }
})

export default profileSlice.reducer;
