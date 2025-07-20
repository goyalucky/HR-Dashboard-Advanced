import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, User } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { useStore } from '../store/useStore';
import { generateMockUserData } from '../utils/mockData';

const departments = [
  'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 
  'Operations', 'Design', 'Product', 'Legal', 'Support'
];

const positions = {
  Engineering: ['Software Engineer', 'Senior Engineer', 'Tech Lead', 'Engineering Manager'],
  Marketing: ['Marketing Specialist', 'Content Creator', 'Marketing Manager', 'Brand Manager'],
  Sales: ['Sales Representative', 'Account Manager', 'Sales Director', 'Business Development'],
  HR: ['HR Specialist', 'Recruiter', 'HR Manager', 'People Operations'],
  Finance: ['Financial Analyst', 'Accountant', 'Finance Manager', 'Controller'],
  Operations: ['Operations Specialist', 'Project Manager', 'Operations Manager', 'COO'],
  Design: ['UI Designer', 'UX Designer', 'Design Lead', 'Creative Director'],
  Product: ['Product Manager', 'Product Owner', 'Product Director', 'VP Product'],
  Legal: ['Legal Counsel', 'Paralegal', 'Legal Manager', 'General Counsel'],
  Support: ['Support Specialist', 'Customer Success', 'Support Manager', 'Head of Support']
};

export function CreateEmployee() {
  const navigate = useNavigate();
  const { users, setUsers } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    department: '',
    position: '',
    salary: '',
    bio: '',
    address: {
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'USA'
    }
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (users.some(user => user.email === formData.email)) {
      newErrors.email = 'Email already exists';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 100) {
      newErrors.age = 'Please enter a valid age between 18 and 100';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.position) {
      newErrors.position = 'Position is required';
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(Number(formData.salary)) || Number(formData.salary) < 0) {
      newErrors.salary = 'Please enter a valid salary';
    }

    if (!formData.address.address.trim()) {
      newErrors['address.address'] = 'Address is required';
    }

    if (!formData.address.city.trim()) {
      newErrors['address.city'] = 'City is required';
    }

    if (!formData.address.state.trim()) {
      newErrors['address.state'] = 'State is required';
    }

    if (!formData.address.postalCode.trim()) {
      newErrors['address.postalCode'] = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new user with enhanced data
      const newUser = generateMockUserData({
        id: Math.max(...users.map(u => u.id), 0) + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        age: Number(formData.age),
        address: formData.address,
        image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
      });

      // Override with form data
      newUser.department = formData.department;
      newUser.position = formData.position;
      newUser.salary = Number(formData.salary);
      newUser.bio = formData.bio || newUser.bio;
      newUser.hireDate = new Date().toISOString().split('T')[0];

      // Add to users list
      setUsers([...users, newUser]);

      // Navigate to employee details
      navigate(`/employee/${newUser.id}`);
    } catch (error) {
      console.error('Error creating employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availablePositions = formData.department ? positions[formData.department] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add New Employee
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a new employee profile with all necessary information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="100"
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.age ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter age"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.age}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Work Information */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Work Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position *
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                disabled={!formData.department}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.position ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select position</option>
                {availablePositions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              {errors.position && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.position}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Salary *
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                min="0"
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.salary ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter annual salary"
              />
              {errors.salary && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.salary}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter employee bio (optional)"
              />
            </div>
          </div>
        </Card>

        {/* Address Information */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Address Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                name="address.address"
                value={formData.address.address}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors['address.address'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter street address"
              />
              {errors['address.address'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['address.address']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City *
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors['address.city'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter city"
              />
              {errors['address.city'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['address.city']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State *
              </label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors['address.state'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter state"
              />
              {errors['address.state'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['address.state']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Postal Code *
              </label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors['address.postalCode'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter postal code"
              />
              {errors['address.postalCode'] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['address.postalCode']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country
              </label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter country"
              />
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={Save}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Employee...' : 'Create Employee'}
          </Button>
        </div>
      </form>
    </div>
  );
}