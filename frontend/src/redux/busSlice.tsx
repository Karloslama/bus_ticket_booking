import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Bus {
  id: string;
  number: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  fare: number;
  capacity: number;
  seatsBooked: string[];
}

interface BusState {
  buses: Bus[]; //holds the bus Data
  loading: boolean; //indicates whether the data is being fetched
  error: string | null; //stores error msg if fetching fails
}
const initialState: BusState = {
  buses: [
    // Adding some sample data until the API is connected
    {
      id: "1",
      number: "BUS001",
      from: "New York",
      to: "Los Angeles",
      departureDate: "2024-03-20",
      departureTime: "10:00 AM",
      fare: 150,
      capacity: 45,
      seatsBooked: ["A1", "A2", "B1"],
    },
    {
      id: "2",
      number: "BUS002",
      from: "Chicago",
      to: "Houston",
      departureDate: "2024-03-21",
      departureTime: "09:00 AM",
      fare: 120,
      capacity: 40,
      seatsBooked: ["C1", "C2"],
    },
    {
      id: "3",
      number: "BUS003",
      from: "San Francisco",
      to: "Seattle",
      departureDate: "2024-03-22",
      departureTime: "11:30 AM",
      fare: 100,
      capacity: 35,
      seatsBooked: ["D1"],
    },
  ],
  loading: false,
  error: null,
};

export const fetchBuses = createAsyncThunk(
  "bus/fetchBuses",
  async (params: { from?: string; to?: string; date?: string }) => {
    try {
      const response = await axios.get("/api/buses", { params });
      return response.data;
    } catch (error) {
      console.log(error);
      //return sample data if API fails
      return initialState.buses;
    }
  }
);
const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.loading = false;
        state.buses = action.payload;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch buses";
      });
  },
});

export default busSlice.reducer;
