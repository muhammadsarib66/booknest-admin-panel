import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Login_Api } from "../../utils/api";
import { handleApiError } from "../../utils/errorHandler";

export const LoginUserApi = createAsyncThunk(
  "loginuser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        Login_Api,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.user?.isadmin === true) {
        
        localStorage.setItem("NBAdminToken", response?.data?.token);
        localStorage.setItem("NBAdminData", JSON.stringify(response?.data?.user));
        console.log(response.data);
      }
        

      return response?.data;

    }  catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  userLoginDetail: {},
};
const LoginUserSlicer = createSlice({
  name: "loginuser",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(LoginUserApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUserApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userLoginDetail = action.payload;
    });
    builder.addCase(LoginUserApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default LoginUserSlicer.reducer;
