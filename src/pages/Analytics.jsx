import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { TrendingUp, Users, Award, Target } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useBookmarks } from '../hooks/useBookmarks';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export function Analytics() {
  const { users, isLoading } = useUsers();
  const { bookmarkedUsers } = useBookmarks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const departmentStats = users.reduce((acc, user) => {
    if (!acc[user.department]) {
      acc[user.department] = {
        count: 0,
        totalRating: 0,
        averageRating: 0,
      };
    }
    acc[user.department].count += 1;
    acc[user.department].totalRating += user.performanceRating;
    acc[user.department].averageRating = acc[user.department].totalRating / acc[user.department].count;
    return acc;
  }, {});

  const ratingDistribution = users.reduce((acc, user) => {
    const rating = Math.floor(user.performanceRating);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const bookmarkTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [5, 8, 12, 15, 18, bookmarkedUsers.length],
  };

  const ageGroups = users.reduce((acc, user) => {
    const ageGroup = user.age < 30 ? '20-29' : user.age < 40 ? '30-39' : user.age < 50 ? '40-49' : '50+';
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {});

  const departmentChartData = {
    labels: Object.keys(departmentStats),
    datasets: [
      {
        label: 'Average Rating',
        data: Object.values(departmentStats).map(stat => stat.averageRating),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(14, 165, 233, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const ratingDistributionData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        data: [1, 2, 3, 4, 5].map(rating => ratingDistribution[rating] || 0),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const bookmarkTrendsData = {
    labels: bookmarkTrends.labels,
    datasets: [
      {
        label: 'Bookmarked Employees',
        data: bookmarkTrends.data,
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const ageDistributionData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        data: Object.values(ageGroups),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const totalEmployees = users.length;
  const averageRating = users.reduce((sum, user) => sum + user.performanceRating, 0) / users.length;
  const topPerformers = users.filter(user => user.performanceRating >= 4.5).length;
  const bookmarkRate = (bookmarkedUsers.length / totalEmployees) * 100;

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive insights into employee performance and organizational metrics.
        </p>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Employees
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalEmployees}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Rating
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {averageRating.toFixed(1)}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Top Performers
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {topPerformers}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Bookmark Rate
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {bookmarkRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Department Performance
          </h2>
          <Bar data={departmentChartData} options={chartOptions} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Performance Rating Distribution
          </h2>
          <Doughnut data={ratingDistributionData} options={doughnutOptions} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Bookmark Trends
          </h2>
          <Line data={bookmarkTrendsData} options={lineOptions} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Age Distribution
          </h2>
          <Doughnut data={ageDistributionData} options={doughnutOptions} />
        </Card>
      </div>

     
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Department Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Employees</th>
                <th className="px-6 py-3">Average Rating</th>
                <th className="px-6 py-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(departmentStats)
                .sort(([, a], [, b]) => b.averageRating - a.averageRating)
                .map(([department, stats]) => (
                  <tr key={department} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {department}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {stats.count}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {stats.averageRating.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          stats.averageRating >= 4.5
                            ? 'success'
                            : stats.averageRating >= 3.5
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {stats.averageRating >= 4.5
                          ? 'Excellent'
                          : stats.averageRating >= 3.5
                          ? 'Good'
                          : 'Needs Improvement'}
                      </Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
