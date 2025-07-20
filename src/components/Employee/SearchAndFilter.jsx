import React, { useState } from 'react';
import { Search, Filter, SortAsc, SortDesc, X } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';

const departments = [
  'Engineering', 'Marketing', 'Sales', 'HR', 'Finance',
  'Operations', 'Design', 'Product', 'Legal', 'Support'
];

const ratings = [1, 2, 3, 4, 5];

export function SearchAndFilter() {
  const { searchFilters, setSearchFilters } = useSearch();
  const [showFilters, setShowFilters] = useState(false);

  const handleQueryChange = (e) => {
    setSearchFilters({ query: e.target.value });
  };

  const handleDepartmentToggle = (department) => {
    const newDepartments = searchFilters.departments.includes(department)
      ? searchFilters.departments.filter(d => d !== department)
      : [...searchFilters.departments, department];
    setSearchFilters({ departments: newDepartments });
  };

  const handleRatingToggle = (rating) => {
    const newRatings = searchFilters.ratings.includes(rating)
      ? searchFilters.ratings.filter(r => r !== rating)
      : [...searchFilters.ratings, rating];
    setSearchFilters({ ratings: newRatings });
  };

  const handleSortChange = (sortBy) => {
    const newSortOrder = searchFilters.sortBy === sortBy && searchFilters.sortOrder === 'asc'
      ? 'desc'
      : 'asc';
    setSearchFilters({ sortBy, sortOrder: newSortOrder });
  };

  const clearFilters = () => {
    setSearchFilters({
      query: '',
      departments: [],
      ratings: [],
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const activeFiltersCount = searchFilters.departments.length + searchFilters.ratings.length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchFilters.query}
          onChange={handleQueryChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          icon={Filter}
          onClick={() => setShowFilters(!showFilters)}
          className={activeFiltersCount > 0 ? 'ring-2 ring-blue-500' : ''}
        >
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>

        {/* Sort Buttons */}
        <div className="flex items-center space-x-1">
          {[
            { key: 'name', label: 'Name' },
            { key: 'rating', label: 'Rating' },
            { key: 'department', label: 'Department' },
            { key: 'age', label: 'Age' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={searchFilters.sortBy === key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleSortChange(key)}
              icon={searchFilters.sortBy === key && searchFilters.sortOrder === 'desc' ? SortDesc : SortAsc}
              iconPosition="right"
            >
              {label}
            </Button>
          ))}
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            icon={X}
            onClick={clearFilters}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
          {/* Department Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Departments
            </h4>
            <div className="flex flex-wrap gap-2">
              {departments.map(department => (
                <button
                  key={department}
                  onClick={() => handleDepartmentToggle(department)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    searchFilters.departments.includes(department)
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Performance Rating
            </h4>
            <div className="flex flex-wrap gap-2">
              {ratings.map(rating => (
                <button
                  key={rating}
                  onClick={() => handleRatingToggle(rating)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    searchFilters.ratings.includes(rating)
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {rating}+ Stars
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {searchFilters.departments.map(department => (
            <Badge key={department} variant="info" className="flex items-center gap-1">
              {department}
              <button
                onClick={() => handleDepartmentToggle(department)}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {searchFilters.ratings.map(rating => (
            <Badge key={rating} variant="warning" className="flex items-center gap-1">
              {rating}+ Stars
              <button
                onClick={() => handleRatingToggle(rating)}
                className="ml-1 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
