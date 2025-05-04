/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig } from "./Slicer";
import toast from "react-hot-toast";
import { Delete_Book_Api, Get_AllBook_Api, Update_Book_Api } from "../../utils/api";
import { handleApiError } from "../../utils/errorHandler";

export const GetAllBooksApi = createAsyncThunk(
  "books/getAllbooks",
  async (params: { page?: number; limit?: number; status?: string; query?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        Get_AllBook_Api,
        {
          ...getConfig(),
          params: {
            page: params.page || 1,
            limit: params.limit || 10,
            status: params.status !== 'all' ? params.status : undefined,
            query: params.query || undefined
          }
        }
      );
      console.log(response?.data , "response data books")
      return response.data;
    } catch (err: any) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// geting My books // 

// update Book //
export const UpdateBookApi = createAsyncThunk(
  "books/updateBook",
  async (updatedBookStatus: { bookId: string, status: 'Approved' | 'Rejected' }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(
        Update_Book_Api,
        updatedBookStatus,
        getConfig()
      );
      toast.success(response?.data?.message || "Book status updated successfully");
      dispatch(GetAllBooksApi({}));
      return { responseData: response?.data };
    } catch (err: any) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

export const DeleteBookApi = createAsyncThunk(
  "books/DeleteBook",
  async (bookId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${Delete_Book_Api}/${bookId}`,
        getConfig()
      );
      toast.success(response?.data?.message || "Book Delete successfully");
      dispatch(GetAllBooksApi({}));
      return { responseData: response?.data };
    } catch (err: any) {
      return rejectWithValue(handleApiError(err));
    }
  }
)

const initialState = {
  isLoading: false,
  isError: false,
  getUserBooksList: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0
  }
};

const BookSlicer = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get my books 
      .addCase(GetAllBooksApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllBooksApi.fulfilled, (state,action) => {
        state.isLoading = false;
        state.getUserBooksList = action.payload.books;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalBooks: action.payload.totalBooks
        };
      })
      .addCase(GetAllBooksApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update Book // 
      .addCase(UpdateBookApi.pending, (state) => {  
        state.isLoading = true;
      })
      .addCase(UpdateBookApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(UpdateBookApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // delete book api
      .addCase(DeleteBookApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteBookApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(DeleteBookApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export default BookSlicer.reducer;