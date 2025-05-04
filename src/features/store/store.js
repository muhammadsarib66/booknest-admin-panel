import { configureStore } from "@reduxjs/toolkit";
import Slicer from "../slicer/Slicer";
import UsersSlicer from "../slicer/UsersSlicer";
import LoginUserSlicer from "../slicer/LoginUserSlicer";
import ActionUserSlicer from "../slicer/ActionUserSlicer";
import GetAllContactForm from "../slicer/GetAllContactForm";
import DashboardSlicer from "../slicer/DashboardSlicer"
import BookSlicer from "../slicer/BookSlicer"



export const store = configureStore({
  reducer: {
    Slicer,
    UsersSlicer,
    LoginUserSlicer,
    ActionUserSlicer,
    GetAllContactForm,
    DashboardSlicer,
    BookSlicer
  },
});
