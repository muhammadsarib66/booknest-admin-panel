import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  getConfig } from "./Slicer";
import { All_User_Api } from "../../utils/api";
import { handleApiError } from "../../utils/errorHandler";


export const getUsersApi = createAsyncThunk(
  "admin/alluser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(All_User_Api, getConfig());
      console.log(response.data?.allusers, "all user");
      return response?.data?.allusers;
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  Users: '',
};

const UsersSlicer = createSlice({
  name: 'Users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Users = action.payload;
    });
    builder.addCase(getUsersApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

  }
})




export default UsersSlicer.reducer;

