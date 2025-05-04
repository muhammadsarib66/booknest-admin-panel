import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { dashBoardApi } from "../features/slicer/DashboardSlicer";
import Loader from "../component/Loader";
import { getUsersApi } from "../features/slicer/UsersSlicer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { Users, isLoading, isError } = useSelector((state) => state.UsersSlicer);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (Users && Array.isArray(Users)) {
      setUserData(Users);
    }
  }, [Users]);

  // Calculate user statistics
  const activeUsers = userData.filter(user => !user?.isBlocked && user?.isverified && user?.status === "Approved").length;
  const pendingUsers = userData.filter(user => !user?.isBlocked && (!user?.isverified || user?.status !== "Approved")).length;
  const blockedUsers = userData.filter(user => user?.isBlocked).length;

  useEffect(() => {
    dispatch(getUsersApi());
  }, [dispatch]);

  const iconMapping = {
    "Users": "fa-user",
    "Active Users": "fa-user",
    "Pending Users": "fa-unlock-alt",
    "Total Active Books": "fa-check-circle",
    "Total Sold Books": "fa-times-circle",
  };

  const Cards = [
    { title: "Total Users", total: Users?.length ?? 0, icon: iconMapping["Users"] },
    { title: "Active Users", total: activeUsers, icon: iconMapping["Active Users"] },
    { title: "Pending Users", total: pendingUsers, icon: iconMapping["Pending Users"] },
    { title: "Blocked Users", total: blockedUsers, icon: "fa-ban" },
  ];

  if (isLoading) {
    return <Loader/> // Loading state
  }

  if (isError) {
    return <div>Error: {isError.message}</div>; // Error state
  }

  // Dummy data for the chart
  const chartData = {
    series: [30, 40, 45, 50],
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: ['Users', 'Event Managers', 'Blocked Users', 'Un-Blocked Users']
      }
    }
  };

  const chartData2 = {
    series: [{
      name: "Completed Bookings",
      data: [10, 30, 45, 55]
    }],
    options: {
      chart: {
        type: 'area',
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April']
      }
    }
  };

  return (
    <section className="p-4 flex flex-col gap-8 h-screen overflow-y-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Cards.map((item, index) => (
          <div
            key={index}
            className="hover:bg-gray-200 bg-white hover:scale-110 duration-300 transition ease-linear cursor-pointer flex items-center justify-between shadow-lg p-4 rounded-md"
          >
            <div>
              <h1 className="pb-4 text-lg font-bold text-gray-800">
                {item.title}
              </h1>
              <p className="text-[15px]">
                Total {item.title}: 
                <span className=" font-bold"> {item.total} </span>
              </p>
            </div>
            <div className="text-lg bg-purple-100 text-purple-600 p-3 rounded-md">
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 w-full h-screen gap-6">
     
        <Chart
          options={chartData2.options}
          series={chartData2.series}
          type="area"
          height={350}
        />
      </div>
     
    </section>
  );
};

export default Dashboard;
