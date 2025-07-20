import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  Bookmark,
  Edit,
  TrendingUp
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useBookmarks } from '../hooks/useBookmarks';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { StarRating } from '../components/UI/StarRating';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'feedback', label: 'Feedback' },
];

export function EmployeeDetails() {
  const { id } = useParams();
  const { users } = useStore();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && users.length > 0) {
      const foundUser = users.find(u => u.id === parseInt(id));
      setUser(foundUser || null);
      setLoading(false);
    }
  }, [id, users]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Employee Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The employee you're looking for doesn't exist.
        </p>
        <Link to="/employees">
          <Button variant="primary" icon={ArrowLeft}>
            Back to Employees
          </Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'active': return 'info';
      case 'on-hold': return 'warning';
      default: return 'default';
    }
  };

  const getFeedbackTypeColor = (type) => {
    switch (type) {
      case 'manager': return 'success';
      case 'peer': return 'info';
      case 'self': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
    
      <div className="flex items-center space-x-4">
        <Link to="/employees">
          <Button variant="ghost" size="sm" icon={ArrowLeft}>
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Employee Details
        </h1>
      </div>

     
      <Card>
        <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 mx-auto md:mx-0"
          />
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  {user.position}
                </p>
                <Badge variant="info">{user.department}</Badge>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Button
                  variant={isBookmarked(user.id) ? 'primary' : 'outline'}
                  size="sm"
                  icon={Bookmark}
                  onClick={() => toggleBookmark(user.id)}
                >
                  {isBookmarked(user.id) ? 'Bookmarked' : 'Bookmark'}
                </Button>
                <Button variant="outline" size="sm" icon={Edit}>
                  Edit
                </Button>
              </div>
            </div>

          
            <div className="mb-4">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Performance Rating:
                </span>
                <Badge variant="success">{user.performanceRating.toFixed(1)}</Badge>
              </div>
              <div className="flex justify-center md:justify-start">
                <StarRating rating={user.performanceRating} showValue />
              </div>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{user.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Hired: {formatDate(user.hireDate)}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  ${user.salary.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

    
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

     
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {user.bio}
            </p>
          </Card>

         
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Address
            </h3>
            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="text-gray-600 dark:text-gray-400">
                <p>{user.address.address}</p>
                <p>{user.address.city}, {user.address.state} {user.address.postalCode}</p>
                <p>{user.address.country}</p>
              </div>
            </div>
          </Card>

        
          <Card className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance History
            </h3>
            <div className="space-y-4">
              {user.performanceHistory.map(record => (
                <div key={record.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {record.period}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={record.rating} size="sm" />
                      <Badge variant="success">{record.rating.toFixed(1)}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Goals
                      </h5>
                      <ul className="space-y-1">
                        {record.goals.map((goal, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400">
                            • {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Achievements
                      </h5>
                      <ul className="space-y-1">
                        {record.achievements.map((achievement, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400">
                            • {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Areas for Improvement
                      </h5>
                      <ul className="space-y-1">
                        {record.areas_for_improvement.map((area, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400">
                            • {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.projects.map(project => (
            <Card key={project.id}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h3>
                <Badge variant={getProjectStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  Deadline: {formatDate(project.deadline)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="space-y-6">
          {user.feedback.map(feedback => (
            <Card key={feedback.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    From: {feedback.from}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(feedback.date)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getFeedbackTypeColor(feedback.type)}>
                    {feedback.type}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <StarRating rating={feedback.rating} size="sm" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {feedback.rating}/5
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feedback.comment}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}