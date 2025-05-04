import { baseUrl } from "../features/slicer/Slicer";

export const Login_Api =  `${baseUrl}booknest/users/login`
export const All_User_Api =  `${baseUrl}booknest/users/admin/getallusers`
export const Approve_User_Api =  `${baseUrl}booknest/users/admin/approveuser/`
export const Reject_User_Api =  `${baseUrl}booknest/users/admin/rejectuser/`
export const Block_User_Api =  `${baseUrl}booknest/users/admin/blockuser/`

// Books Routes // 
export const Get_AllBook_Api =  `${baseUrl}booknest/books/admin/getallbooks`
export const Delete_Book_Api =  `${baseUrl}booknest/books/admin/deletebook`
export const Update_Book_Api =  `${baseUrl}booknest/books/admin/updatestatus`


