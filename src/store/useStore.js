import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Users
      users: [],
      setUsers: (users) => set({ users }),

      // Bookmarks
      bookmarkedUsers: [],
      toggleBookmark: (userId) =>
        set((state) => ({
          bookmarkedUsers: state.bookmarkedUsers.includes(userId)
            ? state.bookmarkedUsers.filter((id) => id !== userId)
            : [...state.bookmarkedUsers, userId],
        })),

      // Search & Filters
      searchFilters: {
        query: '',
        departments: [],
        ratings: [],
        sortBy: 'name',
        sortOrder: 'asc',
      },
      setSearchFilters: (filters) =>
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        })),

      // Theme
      isDarkMode: false,
      toggleTheme: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),

      // Loading states
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      // Current user
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    {
      name: 'hr-dashboard-storage',
      partialize: (state) => ({
        bookmarkedUsers: state.bookmarkedUsers,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
