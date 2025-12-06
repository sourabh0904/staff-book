export interface ConnectionRequest {
  id: string;
  name: string;
  avatar: string;
  title: string;
  mutualConnections: number;
  timestamp: string;
}

export interface Connection {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company?: string;
  mutualConnections: number;
  isFollowing?: boolean;
  connectedDate?: string;
}

export interface PeopleYouMayKnow {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company?: string;
  mutualConnections: number;
  reason?: string;
}

export const connectionRequests: ConnectionRequest[] = [
  {
    id: 'req-1',
    name: 'Priya Sharma',
    avatar: '/homePage/profile.png',
    title: 'Senior Product Manager at Google',
    mutualConnections: 12,
    timestamp: '2 days ago',
  },
  {
    id: 'req-2',
    name: 'Rahul Verma',
    avatar: '/homePage/profile.png',
    title: 'Full Stack Developer at Microsoft',
    mutualConnections: 8,
    timestamp: '3 days ago',
  },
  {
    id: 'req-3',
    name: 'Anjali Mehta',
    avatar: '/homePage/profile.png',
    title: 'UX Designer at Amazon',
    mutualConnections: 15,
    timestamp: '5 days ago',
  },
  {
    id: 'req-4',
    name: 'Vikram Singh',
    avatar: '/homePage/profile.png',
    title: 'Data Scientist at Meta',
    mutualConnections: 6,
    timestamp: '1 week ago',
  },
];

export const myConnections: Connection[] = [
  {
    id: 'conn-1',
    name: 'Riya Goyal',
    avatar: '/homePage/profile.png',
    title: 'HR Manager',
    company: 'appxone.com',
    mutualConnections: 45,
    isFollowing: true,
    connectedDate: 'October 30, 2025',
  },
  {
    id: 'conn-2',
    name: 'Amit Kumar',
    avatar: '/homePage/profile.png',
    title: 'Software Engineer',
    company: 'Tech Solutions Inc',
    mutualConnections: 23,
    isFollowing: true,
    connectedDate: 'October 29, 2025',
  },
  {
    id: 'conn-3',
    name: 'Neha Patel',
    avatar: '/homePage/profile.png',
    title: 'Marketing Director',
    company: 'Digital World',
    mutualConnections: 67,
    isFollowing: false,
    connectedDate: 'October 29, 2025',
  },
  {
    id: 'conn-4',
    name: 'Karan Malhotra',
    avatar: '/homePage/profile.png',
    title: 'Product Designer',
    company: 'Creative Studios',
    mutualConnections: 34,
    isFollowing: true,
    connectedDate: 'October 28, 2025',
  },
  {
    id: 'conn-5',
    name: 'Pooja Reddy',
    avatar: '/homePage/profile.png',
    title: 'Business Analyst',
    company: 'Finance Corp',
    mutualConnections: 28,
    isFollowing: false,
    connectedDate: 'October 27, 2025',
  },
  {
    id: 'conn-6',
    name: 'Arjun Nair',
    avatar: '/homePage/profile.png',
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    mutualConnections: 41,
    isFollowing: true,
    connectedDate: 'October 26, 2025',
  },
];

export const peopleYouMayKnow: PeopleYouMayKnow[] = [
  {
    id: 'sugg-1',
    name: 'Sneha Gupta',
    avatar: '/homePage/profile.png',
    title: 'Frontend Developer',
    company: 'Web Innovations',
    mutualConnections: 18,
    reason: 'Works at Web Innovations',
  },
  {
    id: 'sugg-2',
    name: 'Rohit Sharma',
    avatar: '/homePage/profile.png',
    title: 'Sales Manager',
    company: 'Global Trade',
    mutualConnections: 9,
    reason: 'You both know Riya Goyal',
  },
  {
    id: 'sugg-3',
    name: 'Divya Iyer',
    avatar: '/homePage/profile.png',
    title: 'Content Writer',
    company: 'Creative Content',
    mutualConnections: 14,
    reason: 'Works in your industry',
  },
  {
    id: 'sugg-4',
    name: 'Manish Tiwari',
    avatar: '/homePage/profile.png',
    title: 'Backend Developer',
    company: 'Tech Giants',
    mutualConnections: 22,
    reason: 'You both know Amit Kumar',
  },
  {
    id: 'sugg-5',
    name: 'Kavya Reddy',
    avatar: '/homePage/profile.png',
    title: 'HR Specialist',
    company: 'People First',
    mutualConnections: 11,
    reason: 'Works at People First',
  },
  {
    id: 'sugg-6',
    name: 'Sanjay Pillai',
    avatar: '/homePage/profile.png',
    title: 'Project Manager',
    company: 'Agile Solutions',
    mutualConnections: 16,
    reason: 'Studied at IIT Delhi',
  },
];

export const sentRequests: Connection[] = [
  {
    id: 'sent-1',
    name: 'Meera Krishnan',
    avatar: '/homePage/profile.png',
    title: 'Engineering Manager',
    company: 'Tech Startups Inc',
    mutualConnections: 7,
  },
  {
    id: 'sent-2',
    name: 'Aditya Joshi',
    avatar: '/homePage/profile.png',
    title: 'Product Owner',
    company: 'Innovation Labs',
    mutualConnections: 13,
  },
  {
    id: 'sent-3',
    name: 'Simran Kaur',
    avatar: '/homePage/profile.png',
    title: 'Data Analyst',
    company: 'Analytics Pro',
    mutualConnections: 5,
  },
];

