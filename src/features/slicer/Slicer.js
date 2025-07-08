import { createSlice } from "@reduxjs/toolkit";

// export const baseUrl = "http://192.168.100.3:3000/"; // change your Ip acording to your system
// export const baseUrl = "http://192.168.100.110:3000/"; // change your Ip acording to your system
export const baseUrl = "https://booknestbackend-production.up.railway.app/"; // change your Ip acording to your system

// const token = localStorage.getItem("NBAdminToken");



export const getConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("NBAdminToken")}`,
  },
});
export const  getConfigFormData = () => ({
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("NBAdminToken")}`,
  },
});
const initialState = {
  isLoading: false,
  isError: false,
  isModalOpen: false,
  isMainCatModal: false,
  isSubCatModal: false,
  isCustomerActionModalOpen: false,
  isEmployeeActionModalOpen: false,
};

const Slicer = createSlice({
  name: "slicer",
  initialState,
  reducers: {},
});

// export const {} = Slicer.actions;
export default Slicer.reducer;
