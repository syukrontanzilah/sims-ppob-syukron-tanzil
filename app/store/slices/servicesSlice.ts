import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface ServicesState {
  services: Service[];
}

const initialState: ServicesState = {
  services: [],
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<Service[]>) {
      state.services = action.payload;
    },
  },
});

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
