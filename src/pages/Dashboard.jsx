import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  TrendingUp,
  Award,
  Bookmark,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useBookmarks } from '../hooks/useBookmarks';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { EmployeeCard } from '../components/Employee/EmployeeCard';


export function Dashboard() {
  const { users, isLoading } = useUsers();
  const { bookmarkedUsers } = useBookmarks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const totalEmployees = users.length;
  const averageRating =
    users.reduce((sum, user) => sum + user.performanceRating, 0) / users.length;

  const topPerformers = users
    .filter(user => user.performanceRating >= 4.5)
    .slice(0, 3);

  const recentHires = [...users]
    .sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime())
    .slice(0, 3);

  const departmentStats = users.reduce((acc, user) => {
    acc[user.department] = (acc[user.department] || 0) + 1;
    return acc;
  }, {});

  const topDepartments = Object.entries(departmentStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          HR Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your team's performance.
        </p>
      </div>

      {/* Stats Cards */}
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
                {topPerformers.length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Bookmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Bookmarked
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {bookmarkedUsers.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/employees">
            <Button variant="outline" fullWidth icon={Users} iconPosition="left">
              View All Employees
            </Button>
          </Link>
          <Link to="/bookmarks">
            <Button variant="outline" fullWidth icon={Bookmark} iconPosition="left">
              Manage Bookmarks
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="outline" fullWidth icon={BarChart3} iconPosition="left">
              View Analytics
            </Button>
          </Link>
        </div>
      </Card>

      {/* Department Overview */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Department Overview
          </h2>
          <Link to="/analytics">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View Details
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topDepartments.map(([department, count]) => (
            <div key={department} className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {count}
              </div>
              <Badge variant="info" size="sm">
                {department}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Performers */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Top Performers
          </h2>
          <Link to="/employees">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPerformers.map(user => (
            <EmployeeCard key={user.id} user={user} />
          ))}
        </div>
      </Card>

      {/* Recent Hires */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Hires
          </h2>
          <Link to="/employees">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentHires.map(user => (
            <EmployeeCard key={user.id} user={user} />
          ))}
        </div>
      </Card>
    </div>
  );
}
