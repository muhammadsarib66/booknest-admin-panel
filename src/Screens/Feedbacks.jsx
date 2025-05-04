
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactApi } from "../features/slicer/GetAllContactForm";


// name
// phoneNumber
// email
// message

const Feedbacks = () => {
  const dispatch = useDispatch();
  // const {ContactForms} = useSelector((state) => state.GetAllContactForm);
  const ContactForms = [
    {
      _id: "1",
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      subject: "Feedback Subject 1",
      message: "This is the feedback message from John Doe This is the feedback message from John DoeThis is the feedback message from John DoeThis is the feedback message from John DoeThis is the feedback message from John Doe.",
    },
    {
      _id: "2",
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      subject: "Feedback Subject 2",
      message: "This is the feedback message from Jane Smith.",
    },
    // Add more objects as needed
  ];
  console.log(ContactForms);

  useEffect(() => {
    dispatch(getContactApi());
  }, []);
  return (
    /* From Uiverse.io by ParasSalunke */

    //   <div className="h-auto overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    //   {ContactForms.length > 0 && ContactForms[0]?.message ? (
    //     ContactForms.map((user) => {
    //       return (
    //         <Card
    //           key={user?._id}
    //           color="white"
    //           shadow={false}
    //           className="shadow-md hover:shadow-lg border border-gray-200 rounded-lg w-full p-4 max-w-[22rem] transition-shadow duration-300"
    //         >
    //           <CardHeader
    //             color="transparent"
    //             floated={false}
    //             shadow={false}
    //             className="flex flex-col gap-2 pt-0 pb-4"
    //           >
    //             <Typography variant="h5" color="blue-gray" className="font-semibold">
    //               {user?.firstname ? `${user.firstname} ${user.lastname}` : `${user.firstName} ${user.lastName}`}
    //             </Typography>
    //             <Typography color="gray" className="text-sm">
    //               {user?.email}
    //             </Typography>
    //             <Typography color="gray" className="text-sm">
    //               {user?.phone}
    //             </Typography>
    //             <Typography color="blue-gray" className="text-sm font-medium">
    //               Date: {new Date(user?.createdAt).toLocaleDateString()}
    //             </Typography>
    //           </CardHeader>
    //           <CardBody className="p-0">
    //             <Typography
    //               className="font-semibold text-gray-700 flex gap-2 max-h-24 overflow-y-auto break-words"
    //               style={{ lineHeight: '1.5rem' }}
    //             >
    //               MESSAGE: <span className="font-normal">{user?.message}</span>
    //             </Typography>
    //           </CardBody>
    //         </Card>
    //       );
    //     })
    //   ) : (
    //     <p className="absolute inset-0 flex justify-center items-center font-bold text-xl text-gray-500">
    //       No Data Found
    //     </p>
    //   )}
    // </div>

    <div className="h-screen overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {
        ContactForms && ContactForms.length > 0 && (
          ContactForms?.map((user,ind)=>{
            return(

      
      <div key={ind} className="group h-[50vh] relative cursor-pointer overflow-hidden bg-white rounded-2xl px-6 pt-12 pb-10 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl  sm:max-w-sm sm:px-12">
        <span className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 transition-all duration-500 transform group-hover:scale-[20]"></span>
        <div className="relative z-10 mx-auto max-w-md">
          <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500">
            <svg
              className="h-12 w-12 text-white transition-all"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
          <div className="space-y-6 pt-6 text-lg leading-8 text-gray-700 transition-all duration-500 group-hover:text-white">
            <p className="font-medium h-fit max-h-[120px] text-sm overflow-y-auto">
             {user?.message} </p>
          </div>
          <div className="pt-6 text-lg font-semibold leading-7">
            <p className="flex flex-col">
              <span className="text-purple-500 transition-all duration-500 group-hover:text-white">
                {user?.firstname} {user?.lastname}
              </span>
              <span className="text-purple-800 text-sm transition-all duration-500 group-hover:text-white">
                {user?.email} 
              </span>
            </p>
          </div>
        </div>
      </div>
            )
          })
        )
      }

    </div>
  );
};
export default Feedbacks;
