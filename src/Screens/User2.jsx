import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
 
  
  Switch,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
 import { getUsersApi } from "../features/slicer/UsersSlicer";
 import axios from "axios";
import { baseUrl, getConfig } from "../features/slicer/Slicer";
import { toast } from "react-hot-toast";
import BlockReasonModal from "../component/RejectionReasonModal";

 import Loader from "../component/Loader";
// import RejectionReasonModal from "../component/RejectionReasonModal";
import { ApproveUserApi, RejectUserApi } from "../features/slicer/ActionUserSlicer";




const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
  
 
];

const TABLE_HEAD = [
    "Profile",
    "Full Name",
    "Phone Number",
    "Email",
    // "Block/Unblock",
    "Status",
    "Action",
  ];

 
  function ApproveRejectModal({ isOpen, onClose, userId }) {
    const dispatch  = useDispatch()
    const handleApprove = () => {
      console.log("Approved user with ID:", userId);
      dispatch(ApproveUserApi(userId));
      // Add your approve API call here
      onClose();
    };
    
    const handleReject = () => {
      console.log("Rejected user with ID:", userId);
      dispatch(RejectUserApi(userId));
      // Add your reject API call here
      onClose();
    };
  
    return (
      isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" color="blue-gray">
                Approve or Reject User
              </Typography>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <Button
                onClick={handleApprove}
                className="w-full bg-primary"
>
                Approve
              </Button>
              <Button
                onClick={handleReject}
                className="w-full"
                color="red"
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      )
    );
  }

function User2() {
  
  // Add this with other state declarations
  const dispatch = useDispatch()
  const {isLoading } = useSelector((state) => state.ActionUserSlicer);
  const { Users ,isLoading : alluserLoding} = useSelector((state) => state.UsersSlicer);
 
const [isApproveRejectModalOpen, setIsApproveRejectModalOpen] = useState(false);
const [selectedUserId, setSelectedUserId] = useState(null);
  const [status, setStatus] = useState("all");  // Set default value to the first tab
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
 
const [loading] = useState(false);


 




useEffect(() => {
  const savedStatus = localStorage.getItem("tabStatus");
  if (savedStatus) setStatus(savedStatus);
}, []);

const handleTabChange = (value) => {
  setStatus(value);
  localStorage.setItem("tabStatus", value); // Save tab state
};


  useEffect(() => {
    dispatch(getUsersApi());
  }, [dispatch]);



console.log(Users, "users");
  const [filteredData, setFilteredData] = useState([]);

   
 
  useEffect(() => {
    console.log("Current Status:", status);
    console.log("Search Query:", searchQuery);
  
    if (Users) {
      console.log("Filtering Data:", Users);
  
      const filteredBookings = Users?.filter((user) => {
        // Check status filter
        const matchesStatus =
          status === "all" ||
          user.status === status;  // Direct status comparison
  
        // Check search query (match client name, email)
        const matchesSearch =
          user.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase());
  
        // Return true if both status and search match
        return matchesStatus && matchesSearch;
      });
  
      console.log("Filtered Data:", filteredBookings);
      setFilteredData(filteredBookings);
    }
  }, [status, searchQuery, Users]);
  const [userIdToBlock, setUserIdToBlock] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

// Block/Unblock toggle karne ka function
// const handleToggleBlock = async (Id, isBlocked) => {
//   console.log(`Toggling block for ID: ${Id}, Status: ${isBlocked}`);
//   setLoading(true); // Show loader

//   if (isBlocked === false) {
//     console.log("Unblocking user...");
//     await unblockUser(Id);
//   } else if (isBlocked === true) {
//     console.log("Opening modal for blocking reason...");
//     setUserIdToBlock(Id);
//     setIsModalOpen(true);
//   }

//   setLoading(false); // Hide loader
// };

// const unblockUser = async (Id) => {
//   try {
//     setLoading(true); // Show loader

//     // Make the API call to unblock the user
//     await axios.post(
//       `${baseUrl}/users/unblock-client`,
//       { clientId: Id },
//       config
//     );

//     toast.success("User Unblocked Successfully");

//     // Update the local state to reflect the change
//     setFilteredData((prevData) =>
//       prevData.map((user) =>
//         user._id === Id ? { ...user, isBlocked: false } : user
//       )
//     );

//     // Optional: If you're storing all users in a global state (e.g., Redux), dispatch an action to update it
//     // dispatch(updateUserStatus({ id: Id, isBlocked: false }));
//   } catch (err) {
//     const errorMessage =
//       err.response?.data?.message || err.message || "An error occurred";
//     toast.error(errorMessage);
//   } finally {
//     setLoading(false); // Hide loader
//   }
// };
 

  return (
    <div className="min-h-screen overflow-y-auto flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Users
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={status} onChange={handleTabChange} className="mb-4">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={()=>setStatus(value)}  >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
            <div className="w-full md:w-72">
            <Input
      className="outline-none"
      label="Search"
      icon={<MagnifyingGlassIcon className="h-5 w-5" />}
      onChange={(e) => setSearchQuery(e.target.value)} // Update search query
    />            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto h-[500px] px-0">
  <table className="mt-4 w-full table-auto text-left">
    <thead>
      <tr>
        {TABLE_HEAD.map((head) => (
          <th
            key={head}
            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left"
          >
            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
              {head}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {/* Check if filteredData is empty */}
      {filteredData.length === 0 ? (
        <tr>
          <td colSpan={TABLE_HEAD.length} className="text-center p-4">
            <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
              No Data Found
            </Typography>
          </td>
        </tr>
      ) : (
        filteredData?.map((v, i) => {
          const isLast = i === filteredData.length - 1;
          const classes = isLast ? "p-4 " : " p-4 border-b border-blue-gray-50";

          return (
            <tr key={i} className="">
              <td className={`${classes} text-left`}>
                <div className="flex items-center gap-3">
                  <Avatar src={`https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg`} alt={"No Profile"} size="sm" />
               
                </div>
              </td>
<td>  <Typography variant="small" color="blue-gray" className="font-normal">
                      {v?.firstname + " " + v?.lastname}
                    </Typography></td>

              <td className={`${classes} `}>
                {v.phoneno}
              </td>
              <td className={`${classes} `}>
                {v?.email}
              </td>
          
              {/* <td className={`${classes} `}>
              <Switch
                    onChange={
                      () => handleToggleBlock(v?._id, !v?.isBlocked)
                    }
                    checked={v?.isBlocked === true}  // Check if user is blocked (false = not blocked)
             color="red"
          />
              </td> */}

              <td className={`${classes}`}>
                <Chip
                  className="text-center"
                  variant="ghost"
                  size="sm"
                  value={v.status}
                  color={  v.status == "Approved" && "green" || v.status == "Pending" && "yellow" || v.status == "Rejected" && "red"}
                />
              </td>

              <td className={`${classes}`}>
              <Button onClick={() => {
  setSelectedUserId(v._id);
  setIsApproveRejectModalOpen(true);
}}>
  Approve/Reject
</Button>
              </td>

            </tr>
          );
        })
      )}
    </tbody>
  </table>
</CardBody>


        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter> */}
      </Card>



      <BlockReasonModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userIdToBlock}
      />
<ApproveRejectModal
  isOpen={isApproveRejectModalOpen}
  onClose={() => setIsApproveRejectModalOpen(false)}
  userId={selectedUserId}
/>
      
{isLoading  && <Loader />}
{alluserLoding  && <Loader />}
{loading && (
<Loader/>
)}
    </div>
  );
}

export default User2;
