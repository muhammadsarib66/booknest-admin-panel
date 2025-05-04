/* eslint-disable @typescript-eslint/no-explici*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  getConfig } from "./Slicer";
import { toast } from "react-hot-toast";
import { Approve_User_Api, Block_User_Api, Reject_User_Api } from "../../utils/api";
import { handleApiError } from "../../utils/errorHandler";
import { getUsersApi } from "./UsersSlicer";
// import { getBookingsApi } from "./EventManagerSlicer";

export const ApproveUserApi = createAsyncThunk(
  "Approveaction",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${Approve_User_Api + userId}` , {},getConfig());
      console.log(response);
      toast.success(response?.data?.message);
      dispatch(getUsersApi())
      return response?.data;
    }  catch (err) {
          return rejectWithValue(handleApiError(err));
        }
  }
);

export const RejectUserApi = createAsyncThunk(
  "Rejectaction",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${Reject_User_Api + userId}` , {},getConfig());
      console.log(response);
      toast.success(response?.data?.message);
      dispatch(getUsersApi())
      return response?.data;
    }  catch (err) {
          return rejectWithValue(handleApiError(err));
        }
  }
);
// export const BlockUserApi = createAsyncThunk(
//   "Rejectaction",
//   async (userId, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await axios.put(
//         `${Block_User_Api + userId}` , {},getConfig());
//       console.log(response);
//       toast.success(response?.data?.message);
//       dispatch(getUsersApi())
//       return response?.data;
//     }  catch (err) {
//           return rejectWithValue(handleApiError(err));
//         }
//   }
// );

const initialState = {
  isLoading: false,
  isError: false,
};
const ActionUserSlicer = createSlice({
  name: "userAction",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(ApproveUserApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ApproveUserApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(ApproveUserApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    // Reject User 
    builder.addCase(RejectUserApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RejectUserApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(RejectUserApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    })
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default ActionUserSlicer.reducer;
