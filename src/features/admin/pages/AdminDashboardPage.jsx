import { 
  ChartBarIcon,
  UsersIcon,          // Correct icon name
  ShoppingBagIcon,
  CurrencyDollarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
const AdminDashboardPage = () => {
  const stats = [
    { title: "Total Users", value: "2,543", icon: UserGroupIcon, color: "bg-indigo-100", textColor: "text-indigo-600" },
    { title: "Total Products", value: "1,234", icon: ShoppingBagIcon, color: "bg-green-100", textColor: "text-green-600" },
    { title: "Total Orders", value: "892", icon: ChartBarIcon, color: "bg-blue-100", textColor: "text-blue-600" },
    { title: "Revenue", value: "$45,234", icon: CurrencyDollarIcon, color: "bg-purple-100", textColor: "text-purple-600" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <div className="h-64 bg-gray-50 rounded-lg p-4">
          {/* Replace with actual chart component */}
          <div className="flex items-center justify-center h-full text-gray-400">
            <ChartBarIcon className="w-12 h-12 mr-2" />
            <span>Sales Chart Area</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <ul className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Order #100{item}</p>
                  <p className="text-sm text-gray-500">2 items • $45{item}</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-600">All Systems Operational</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Storage Usage: 65%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;