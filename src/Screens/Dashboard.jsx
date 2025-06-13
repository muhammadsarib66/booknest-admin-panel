import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import Loader from "../component/Loader";
import { getUsersApi } from "../features/slicer/UsersSlicer";
import { GetAllBooksApi } from "../features/slicer/BookSlicer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { Users, isLoading, isError } = useSelector((state) => state.UsersSlicer);
  const { getUserBooksList, isLoading: booksLoading } = useSelector((state) => state.BookSlicer);
  const [userData, setUserData] = useState([]);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    if (Users && Array.isArray(Users)) {
      setUserData(Users);
    }
  }, [Users]);

  useEffect(() => {
    if (getUserBooksList && Array.isArray(getUserBooksList)) {
      setBooksData(getUserBooksList);
    }
  }, [getUserBooksList]);

  // Calculate user statistics
  const activeUsers = userData.filter(user => !user?.isBlocked && user?.isverified && user?.status === "Approved").length;
  const pendingUsers = userData.filter(user => !user?.isBlocked && (!user?.isverified || user?.status !== "Approved")).length;
  const blockedUsers = userData.filter(user => user?.isBlocked).length;

  // Calculate book statistics
  const approvedBooks = booksData.filter(book => book.status === "Approved").length;
  const pendingBooks = booksData.filter(book => book.status === "Pending").length;
  const rejectedBooks = booksData.filter(book => book.status === "Rejected").length;

  useEffect(() => {
    dispatch(getUsersApi());
    dispatch(GetAllBooksApi({ page: 1, limit: 1000 })); // Get all books for dashboard
  }, [dispatch]);

  const Cards = [
    { 
      title: "Total Users", 
      total: Users?.length ?? 0, 
      icon: "👥",
      gradient: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Active Users", 
      total: activeUsers, 
      icon: "✅",
      gradient: "from-green-500 to-teal-600",
      bgColor: "bg-green-50"
    },
    { 
      title: "Pending Users", 
      total: pendingUsers, 
      icon: "⏳",
      gradient: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50"
    },
    { 
      title: "Blocked Users", 
      total: blockedUsers, 
      icon: "🚫",
      gradient: "from-red-500 to-pink-600",
      bgColor: "bg-red-50"
    },
    { 
      title: "Total Books", 
      total: booksData?.length ?? 0, 
      icon: "📚",
      gradient: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-50"
    },
    { 
      title: "Approved Books", 
      total: approvedBooks, 
      icon: "📖",
      gradient: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50"
    },
    { 
      title: "Pending Books", 
      total: pendingBooks, 
      icon: "📋",
      gradient: "from-amber-500 to-yellow-600",
      bgColor: "bg-amber-50"
    },
    { 
      title: "Rejected Books", 
      total: rejectedBooks, 
      icon: "📕",
      gradient: "from-rose-500 to-red-600",
      bgColor: "bg-rose-50"
    },
  ];

  if (isLoading || booksLoading) {
    return <Loader/> // Loading state
  }

  if (isError) {
    return <div>Error: {isError.message}</div>; // Error state
  }

  // Charts with real data
  const userChartData = {
    series: [activeUsers, pendingUsers, blockedUsers],
    options: {
      chart: {
        type: 'donut',
        background: 'transparent',
      },
      labels: ['Active Users', 'Pending Users', 'Blocked Users'],
      colors: ['#10B981', '#F59E0B', '#EF4444'],
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                fontSize: '16px',
                fontWeight: 600,
              },
              value: {
                fontSize: '24px',
                fontWeight: 700,
                color: '#374151',
              },
              total: {
                show: true,
                label: 'Total Users',
                fontSize: '14px',
                color: '#6B7280',
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  };

  const booksChartData = {
    series: [{
      name: "Books Count",
      data: [approvedBooks, pendingBooks, rejectedBooks]
    }],
    options: {
      chart: {
        type: 'bar',
        background: 'transparent',
        toolbar: {
          show: false
        }
      },
      colors: ['#8B5CF6'],
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '60%',
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#374151']
        }
      },
      xaxis: {
        categories: ['Approved', 'Pending', 'Rejected'],
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 500,
            colors: ['#6B7280']
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            colors: ['#6B7280']
          }
        }
      },
      grid: {
        borderColor: '#F3F4F6',
        strokeDashArray: 4,
      },
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '14px',
        }
      }
    }
  };

  const monthlyTrendData = {
    series: [{
      name: "Users",
      data: [activeUsers, pendingUsers, blockedUsers, Users?.length ?? 0]
    }, {
      name: "Books", 
      data: [approvedBooks, pendingBooks, rejectedBooks, booksData?.length ?? 0]
    }],
    options: {
      chart: {
        type: 'area',
        background: 'transparent',
        toolbar: {
          show: false
        }
      },
      colors: ['#3B82F6', '#8B5CF6'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: {
        categories: ['Active', 'Pending', 'Blocked/Rejected', 'Total'],
        labels: {
          style: {
            fontSize: '14px',
            colors: ['#6B7280']
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            colors: ['#6B7280']
          }
        }
      },
      legend: {
        position: 'top',
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        borderColor: '#F3F4F6',
        strokeDashArray: 4,
      },
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '14px',
        }
      },
      dataLabels: {
        enabled: false
      }
    }
  };

  return (
    <section className="h-screen overflow-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome to BookNest Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
        {Cards.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} bg-white backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {item.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {item.total}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-green-600">+12%</span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Users Distribution Chart */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">User Distribution</h3>
          </div>
          <Chart
            options={userChartData.options}
            series={userChartData.series}
            type="donut"
            height={350}
          />
        </div>

        {/* Books Status Chart */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Books Status</h3>
          </div>
          <Chart
            options={booksChartData.options}
            series={booksChartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>

      {/* Trend Analysis Chart */}
      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Platform Analytics</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Books</span>
            </div>
          </div>
        </div>
        <Chart
          options={monthlyTrendData.options}
          series={monthlyTrendData.series}
          type="area"
          height={400}
        />
      </div>

    
    </section>
  );
};

export default Dashboard;
