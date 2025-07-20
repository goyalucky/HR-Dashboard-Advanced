import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { generateMockUserData } from '../utils/mockData';

export const useUsers = () => {
  const { users, setUsers, isLoading, setIsLoading } = useStore();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/users?limit=20');
      const data = await response.json();

      const enhancedUsers = data.users.map((user) =>
        generateMockUserData(user)
      );

      setUsers(enhancedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Fallback to mock data
      const mockUsers = Array.from({ length: 20 }, (_, i) =>
        generateMockUserData({ id: i + 1 })
      );
      setUsers(mockUsers);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, []);

  return {
    users,
    isLoading,
    refetch: fetchUsers,
  };
};
