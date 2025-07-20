import { useMemo } from 'react';
import { useStore } from '../store/useStore';

export const useBookmarks = () => {
  const { users, bookmarkedUsers, toggleBookmark } = useStore();

  const bookmarkedUsersList = useMemo(() => {
    return users.filter(user => bookmarkedUsers.includes(user.id));
  }, [users, bookmarkedUsers]);

  const isBookmarked = (userId) => {
    return bookmarkedUsers.includes(userId);
  };

  return {
    bookmarkedUsers: bookmarkedUsersList,
    bookmarkedIds: bookmarkedUsers,
    toggleBookmark,
    isBookmarked,
  };
};
