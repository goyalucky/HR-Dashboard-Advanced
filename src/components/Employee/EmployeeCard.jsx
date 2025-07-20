import React from 'react';
import { Eye, Bookmark, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { StarRating } from '../UI/StarRating';
import { useBookmarks } from '../../hooks/useBookmarks';

export function EmployeeCard({ user, onPromote }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 3.5) return 'warning';
    return 'danger';
  };

  const handlePromote = () => {
    if (onPromote) onPromote(user);
  };

  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {user.position}
            </p>
            <Badge variant="info" size="sm" className="mt-1">
              {user.department}
            </Badge>
          </div>
          <button
            onClick={() => toggleBookmark(user.id)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isBookmarked(user.id)
                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            aria-label={isBookmarked(user.id) ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked(user.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Age: {user.age}</span>
          </div>
        </div>

        {/* Performance Rating */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Performance
            </span>
            <Badge variant={getRatingColor(user.performanceRating)} size="sm">
              {user.performanceRating.toFixed(1)}
            </Badge>
          </div>
          <StarRating rating={user.performanceRating} showValue />
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mt-auto">
          <Link to={`/employee/${user.id}`} className="flex-1">
            <Button variant="outline" size="sm" icon={Eye} fullWidth>
              View
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            icon={TrendingUp}
            onClick={handlePromote}
            className="flex-1"
          >
            Promote
          </Button>
        </div>
      </div>
    </Card>
  );
}
