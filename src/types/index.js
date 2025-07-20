const exampleUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  age: 30,
  phone: '1234567890',
  address: {
    address: '123 Street Name',
    city: 'CityName',
    state: 'StateName',
    postalCode: '123456',
    country: 'CountryName'
  },
  image: 'https://example.com/image.jpg',
  department: 'Engineering',
  position: 'Software Engineer',
  performanceRating: 4.5,
  salary: 75000,
  hireDate: '2021-01-01',
  bio: 'Lorem ipsum dolor sit amet.',
  projects: [],         // Array of Project objects
  feedback: [],         // Array of Feedback objects
  performanceHistory: [] // Array of PerformanceRecord objects
};

const exampleProject = {
  id: 'project1',
  name: 'Website Redesign',
  status: 'active', // 'active' | 'completed' | 'on-hold'
  progress: 70,
  deadline: '2024-12-31',
  description: 'Redesign the corporate website.'
};

const exampleFeedback = {
  id: 'feedback1',
  from: 'Jane Smith',
  date: '2024-06-15',
  rating: 4.8,
  comment: 'Great teamwork and communication.',
  type: 'manager' // 'peer' | 'manager' | 'self'
};

const examplePerformanceRecord = {
  id: 'record1',
  period: 'Q1 2024',
  rating: 4.3,
  goals: ['Improve code quality', 'Reduce bug count'],
  achievements: ['Decreased bugs by 30%', 'Improved code review process'],
  areas_for_improvement: ['Documentation', 'Time estimation']
};

const exampleDashboardStats = {
  totalEmployees: 50,
  averageRating: 4.2,
  departmentStats: {
    Engineering: 20,
    Marketing: 10,
    HR: 5
  },
  ratingDistribution: {
    1: 1,
    2: 2,
    3: 10,
    4: 25,
    5: 12
  }
};

const exampleSearchFilters = {
  query: '',
  departments: ['Engineering', 'HR'],
  ratings: [3, 4, 5],
  sortBy: 'name', // 'name' | 'rating' | 'department' | 'age'
  sortOrder: 'asc' // 'asc' | 'desc'
};

// Export examples if needed
module.exports = {
  exampleUser,
  exampleProject,
  exampleFeedback,
  examplePerformanceRecord,
  exampleDashboardStats,
  exampleSearchFilters
};