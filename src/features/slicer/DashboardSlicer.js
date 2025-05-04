import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";  // Ensure this is correctly imported

export const dashBoardApi = createAsyncThunk(
  "dashBoardApi",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/dashboard`);
      return response.data;  // Return the dashboard data
    } catch (error) {
      return error.message;  // Return error message in case of failure
    }
  }
);

// Initial state for the slice
const initialState = {
  isLoading: false,
  isError: false,
  dashboardDetails: null,  // Set initial state to null
  errorMessage: "",  // Optional: to store the error message
};

// Create the slice
const DashboardSlicer = createSlice({
  name: "dashboardSlicer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state
    builder.addCase(dashBoardApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;  // Reset error state
      state.errorMessage = "";  // Reset error message
    });

    // Handle fulfilled state
    builder.addCase(dashBoardApi.fulfilled, (state, action) => {
      state.isLoading = false;  // Stop loading
      state.dashboardDetails = action.payload;  // Update dashboard details
    });

    // Handle rejected state
    builder.addCase(dashBoardApi.rejected, (state, action) => {
      state.isLoading = false;  // Stop loading
      state.isError = true;  // Set error state
      state.errorMessage = action.payload || "Failed to load dashboard";  // Capture error message
    });
  },
});

// Export the reducer
export default DashboardSlicer.reducer;
