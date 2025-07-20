import { useMemo } from 'react';
import { useStore } from '../store/useStore';

export const useSearch = () => {
  const { users, searchFilters, setSearchFilters } = useStore();

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

   
    if (searchFilters.query) {
      const query = searchFilters.query.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query)
      );
    }

   
    if (searchFilters.departments.length > 0) {
      filtered = filtered.filter(user =>
        searchFilters.departments.includes(user.department)
      );
    }

    if (searchFilters.ratings.length > 0) {
      filtered = filtered.filter(user =>
        searchFilters.ratings.includes(Math.floor(user.performanceRating))
      );
    }

   
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (searchFilters.sortBy) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'rating':
          aValue = a.performanceRating;
          bValue = b.performanceRating;
          break;
        case 'department':
          aValue = a.department;
          bValue = b.department;
          break;
        case 'age':
          aValue = a.age;
          bValue = b.age;
          break;
        default:
          return 0;
      }

      if (searchFilters.sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    return filtered;
  }, [users, searchFilters]);

  return {
    filteredUsers,
    searchFilters,
    setSearchFilters,
  };
};
