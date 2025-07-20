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

const projectNames = [
  'Project Alpha', 'Beta Initiative', 'Customer Portal', 'Mobile App Redesign',
  'Data Migration', 'Security Audit', 'Performance Optimization', 'User Research',
  'Market Expansion', 'Product Launch', 'System Integration', 'Process Automation'
];

const feedbackComments = [
  'Excellent work on the recent project deliverables.',
  'Shows great leadership skills and team collaboration.',
  'Consistently meets deadlines and quality standards.',
  'Demonstrates strong problem-solving abilities.',
  'Great communication skills and attention to detail.',
  'Proactive in identifying and solving issues.',
  'Excellent technical skills and knowledge sharing.',
  'Strong analytical thinking and strategic planning.',
  'Outstanding customer service and relationship building.',
  'Innovative thinking and creative problem solving.'
];

const achievements = [
  'Led successful product launch',
  'Improved team productivity by 25%',
  'Reduced customer response time',
  'Implemented new process automation',
  'Mentored junior team members',
  'Completed certification program',
  'Exceeded quarterly targets',
  'Improved code quality metrics',
  'Enhanced user experience design',
  'Streamlined workflow processes'
];

const goals = [
  'Improve technical skills',
  'Lead cross-functional projects',
  'Enhance communication abilities',
  'Develop team management skills',
  'Complete advanced training',
  'Increase customer satisfaction',
  'Optimize process efficiency',
  'Build strategic partnerships',
  'Expand market knowledge',
  'Implement best practices'
];

export const generateMockUserData = (baseUser) => {
  const department = departments[Math.floor(Math.random() * departments.length)];
  const departmentPositions = positions[department];
  const position = departmentPositions[Math.floor(Math.random() * departmentPositions.length)];

  const performanceRating = Math.random() * 2 + 3;

  const numProjects = Math.floor(Math.random() * 4) + 1;
  const projects = Array.from({ length: numProjects }, (_, i) => ({
    id: `proj-${baseUser.id}-${i}`,
    name: projectNames[Math.floor(Math.random() * projectNames.length)],
    status: ['active', 'completed', 'on-hold'][Math.floor(Math.random() * 3)],
    progress: Math.floor(Math.random() * 100),
    deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: `Project description for ${projectNames[Math.floor(Math.random() * projectNames.length)]}`
  }));

  const numFeedback = Math.floor(Math.random() * 5) + 2;
  const feedback = Array.from({ length: numFeedback }, (_, i) => ({
    id: `feedback-${baseUser.id}-${i}`,
    from: `Colleague ${i + 1}`,
    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    rating: Math.floor(Math.random() * 2) + 4,
    comment: feedbackComments[Math.floor(Math.random() * feedbackComments.length)],
    type: ['peer', 'manager', 'self'][Math.floor(Math.random() * 3)]
  }));

  const performanceHistory = Array.from({ length: 4 }, (_, i) => ({
    id: `perf-${baseUser.id}-${i}`,
    period: `Q${4 - i} 2023`,
    rating: Math.random() * 2 + 3,
    goals: Array.from({ length: 3 }, () => goals[Math.floor(Math.random() * goals.length)]),
    achievements: Array.from({ length: 2 }, () => achievements[Math.floor(Math.random() * achievements.length)]),
    areas_for_improvement: Array.from({ length: 2 }, () => goals[Math.floor(Math.random() * goals.length)])
  }));

  const bio = `Experienced ${position} with ${Math.floor(Math.random() * 10) + 2} years in ${department}. 
    Passionate about delivering high-quality results and collaborating with cross-functional teams. 
    Strong background in project management and strategic planning.`;

  return {
    id: baseUser.id || Math.floor(Math.random() * 10000),
    firstName: baseUser.firstName || `User${baseUser.id}`,
    lastName: baseUser.lastName || `Last${baseUser.id}`,
    email: baseUser.email || `user${baseUser.id}@company.com`,
    age: baseUser.age || Math.floor(Math.random() * 30) + 25,
    phone: baseUser.phone || `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
    address: baseUser.address || {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    image: baseUser.image || `https://i.pravatar.cc/150?img=${baseUser.id}`,
    department,
    position,
    performanceRating,
    salary: Math.floor(Math.random() * 100000) + 50000,
    hireDate: new Date(Date.now() - Math.random() * 1000 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    bio,
    projects,
    feedback,
    performanceHistory
  };
};
