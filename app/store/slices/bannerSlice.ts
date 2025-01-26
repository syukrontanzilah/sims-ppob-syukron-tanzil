/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Banner {
    banner_name: string;
    banner_image: string;
    description: string;
  }
  
  export interface BannerState {
    banners: Banner[];
  }

  const initialState: BannerState = {
    banners: [],
  }

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        setBanners: (state, action: PayloadAction<Banner[]> ) => {
            state.banners = action.payload;
        }
    }
})

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;