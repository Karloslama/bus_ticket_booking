import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Booking {
  id: string;
  userId: string;
  busId: string;
  seats: string[];
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async () => {
    const response = await axios.get("/api/bookings/user");
    return response.data;
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (bookingId: string) => {
    const response = await axios.post(`/api/bookings/${bookingId}/cancel`);
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bookings";
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      });
  },
});

export default bookingSlice.reducer;
