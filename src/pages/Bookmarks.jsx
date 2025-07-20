import React, { useState } from 'react';
import { Bookmark, Trash2, TrendingUp, FolderPlus } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';
import { EmployeeCard } from '../components/Employee/EmployeeCard';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';

export function Bookmarks() {
  const { bookmarkedUsers, toggleBookmark } = useBookmarks();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleRemoveBookmark = (user) => {
    setSelectedUser(user);
    setShowRemoveModal(true);
  };

  const confirmRemoveBookmark = () => {
    if (selectedUser) {
      toggleBookmark(selectedUser.id);
    }
    setShowRemoveModal(false);
    setSelectedUser(null);
  };

  const handlePromote = (user) => {
    setSelectedUser(user);
    setShowPromoteModal(true);
  };

  const handleAssignProject = (user) => {
    setSelectedUser(user);
    setShowAssignModal(true);
  };

  const confirmPromotion = () => {
    console.log('Promoting user:', selectedUser);
    setShowPromoteModal(false);
    setSelectedUser(null);
  };

  const confirmAssignProject = () => {
    console.log('Assigning project to user:', selectedUser);
    setShowAssignModal(false);
    setSelectedUser(null);
  };

  if (bookmarkedUsers.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bookmarked Employees
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your bookmarked employees and quick actions.
          </p>
        </div>

        <Card className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Bookmarked Employees
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start bookmarking employees to quickly access them later.
          </p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Browse Employees
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bookmarked Employees
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {bookmarkedUsers.length} bookmarked employee
          {bookmarkedUsers.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            fullWidth
            icon={TrendingUp}
            onClick={() => console.log('Bulk promote bookmarked users')}
          >
            Promote All
          </Button>
          <Button
            variant="outline"
            fullWidth
            icon={FolderPlus}
            onClick={() => console.log('Bulk assign project to bookmarked users')}
          >
            Assign Project
          </Button>
          <Button
            variant="outline"
            fullWidth
            icon={Trash2}
            onClick={() => bookmarkedUsers.forEach(user => toggleBookmark(user.id))}
          >
            Clear All
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedUsers.map(user => (
          <div key={user.id} className="relative">
            <EmployeeCard user={user} onPromote={handlePromote} />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                icon={FolderPlus}
                onClick={() => handleAssignProject(user)}
                className="bg-white dark:bg-gray-800 shadow-md"
                aria-label="Assign to project"
              />
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                onClick={() => handleRemoveBookmark(user)}
                className="bg-white dark:bg-gray-800 shadow-md text-red-600 hover:text-red-700"
                aria-label="Remove bookmark"
              />
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        title="Remove Bookmark"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to remove{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedUser.firstName} {selectedUser.lastName}
              </span>{' '}
              from your bookmarks?
            </p>
            <div className="flex space-x-3">
              <Button variant="danger" onClick={confirmRemoveBookmark} fullWidth>
                Remove Bookmark
              </Button>
              <Button variant="outline" onClick={() => setShowRemoveModal(false)} fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showPromoteModal}
        onClose={() => setShowPromoteModal(false)}
        title="Promote Employee"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Promote{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedUser.firstName} {selectedUser.lastName}
              </span>{' '}
              to a higher position?
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Position:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedUser.position} - {selectedUser.department}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="primary" onClick={confirmPromotion} fullWidth>
                Confirm Promotion
              </Button>
              <Button variant="outline" onClick={() => setShowPromoteModal(false)} fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title="Assign to Project"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Assign{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedUser.firstName} {selectedUser.lastName}
              </span>{' '}
              to a new project?
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Project
              </label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Choose a project...</option>
                <option value="project-alpha">Project Alpha</option>
                <option value="beta-initiative">Beta Initiative</option>
                <option value="customer-portal">Customer Portal</option>
                <option value="mobile-redesign">Mobile App Redesign</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role in Project
              </label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select role...</option>
                <option value="lead">Project Lead</option>
                <option value="member">Team Member</option>
                <option value="consultant">Consultant</option>
                <option value="reviewer">Reviewer</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <Button variant="primary" onClick={confirmAssignProject} fullWidth>
                Assign to Project
              </Button>
              <Button variant="outline" onClick={() => setShowAssignModal(false)} fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
