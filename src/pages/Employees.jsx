import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useSearch } from '../hooks/useSearch';
import { SearchAndFilter } from '../components/Employee/SearchAndFilter';
import { EmployeeCard } from '../components/Employee/EmployeeCard';
import { LoadingCard } from '../components/UI/LoadingSpinner';
import { Modal } from '../components/UI/Modal';
import { Button } from '../components/UI/Button';

export function Employees() {
  const { isLoading } = useUsers();
  const { filteredUsers } = useSearch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPromoteModal, setShowPromoteModal] = useState(false);

  const handlePromote = (user) => {
    setSelectedUser(user);
    setShowPromoteModal(true);
  };

  const confirmPromotion = () => {
    console.log('Promoting user:', selectedUser);
    setShowPromoteModal(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Employees
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and view all employees in your organization.
        </p>
      </div>

      <SearchAndFilter />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredUsers.length} employees
        </p>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No employees found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <EmployeeCard 
              key={user.id} 
              user={user} 
              onPromote={handlePromote}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showPromoteModal}
        onClose={() => setShowPromoteModal(false)}
        title="Confirm Promotion"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to promote{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedUser.firstName} {selectedUser.lastName}
              </span>
              ?
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Current Position:
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedUser.position} - {selectedUser.department}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={confirmPromotion}
                fullWidth
              >
                Confirm Promotion
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPromoteModal(false)}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 
