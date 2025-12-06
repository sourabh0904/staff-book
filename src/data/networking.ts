export interface Story {
  id: string;
  name: string;
  avatar: string;
  isAdd?: boolean;
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    alt: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  canConnect?: boolean;
}

export interface SuggestedConnection {
  id: string;
  name: string;
  avatar: string;
  title: string;
  description: string;
}

export interface Reel {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  views: string;
  caption: string;
  timestamp: string;
}

export const stories: Story[] = [
  { id: '1', name: 'Vivek Singh', avatar: '/homePage/profile.png' },
  { id: '2', name: 'Naveen Tripathi', avatar: '/homePage/profile.png' },
  { id: '3', name: 'Aruna Devi Singh', avatar: '/homePage/profile.png' },
  { id: '4', name: 'Ashish Das', avatar: '/homePage/profile.png' },
  { id: '5', name: 'Prachi Gupta', avatar: '/homePage/profile.png' },
  { id: '6', name: 'Anu Prakash', avatar: '/homePage/profile.png' },
  { id: '7', name: 'Pappu Bhagat', avatar: '/homePage/profile.png' },
  { id: 'add', name: 'Add Story', avatar: '/homePage/profile.png', isAdd: true },
];

export const posts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Riya Goyal',
      avatar: '/homePage/profile.png',
      title: 'HR of appxone.com (2 yrs)',
    },
    content: "We're on the hunt for a Creative & Dynamic Graphic Design Intern. Location: Noida, Delhi. On-site. Read more",
    media: {
      type: 'video',
      url: '/homePage/job-photo.png',
      alt: 'Professionals collaborating around a laptop',
    },
    timestamp: '2h ago',
    likes: 20,
    comments: 20,
    shares: 5,
  },
  {
    id: '2',
    author: {
      name: 'Radhika Garg',
      avatar: '/homePage/profile.png',
      title: 'UI/UX Designer',
    },
    content: "We're on the hunt for a Creative & Dynamic Graphic Design Intern. Location: Noida, Delhi. On-site. Read more",
    media: {
      type: 'image',
      url: '/homePage/job-photo.png',
      alt: 'Hands typing on a laptop and WE ARE HIRING banner',
    },
    timestamp: '2h ago',
    likes: 20,
    comments: 20,
    shares: 5,
    canConnect: true,
  },
  {
    id: '3',
    author: {
      name: 'Radhika Garg',
      avatar: '/homePage/profile.png',
      title: 'UI/UX Designer',
    },
    content: "We're on the hunt for a Creative & Dynamic Graphic Design Intern. Location: Noida, Delhi. On-site. Read more",
    media: {
      type: 'image',
      url: '/homePage/job-photo.png',
      alt: 'Two women smiling and looking at a laptop',
    },
    timestamp: '2h ago',
    likes: 20,
    comments: 20,
    shares: 5,
    canConnect: true,
  },
];

export const reels: Reel[] = [
  {
    id: '1',
    author: {
      name: 'Radhika Garg',
      avatar: '/homePage/profile.png',
    },
    thumbnail: '/homePage/job-photo.png',
    views: '1.2K',
    caption: 'Networking tips for freelancers',
    timestamp: '2h ago',
  },
  {
    id: '2',
    author: {
      name: 'Manish Mishra',
      avatar: '/homePage/profile.png',
    },
    thumbnail: '/homePage/job-photo.png',
    views: '856',
    caption: 'How to build your professional network',
    timestamp: '3h ago',
  },
  {
    id: '3',
    author: {
      name: 'Anu Prakash',
      avatar: '/homePage/profile.png',
    },
    thumbnail: '/homePage/job-photo.png',
    views: '2.1K',
    caption: 'Freelancing success stories',
    timestamp: '1h ago',
  },
];

export const suggestedConnections: SuggestedConnection[] = [
  {
    id: '1',
    name: 'Riya Goyal',
    avatar: '/homePage/profile.png',
    title: 'HR Manager',
    description: 'I am a UI/UX Designer with 5+ years of experience in creating user-centered digital experiences.',
  },
  {
    id: '2',
    name: 'Radhika Garg',
    avatar: '/homePage/profile.png',
    title: 'UI/UX Designer',
    description: 'Passionate about creating beautiful and functional user interfaces.',
  },
  {
    id: '3',
    name: 'Manish Mishra',
    avatar: '/homePage/profile.png',
    title: 'Software Engineer',
    description: 'Full-stack developer with expertise in React and Node.js.',
  },
];

export const userStats = [
  { label: 'Applied jobs', value: 20 },
  { label: 'Resume downloads', value: 20 },
  { label: 'Profile viewed', value: 20 },
  { label: 'Who searched you', value: 20 },
  { label: 'Earned a reward', value: 20 },
  { label: 'Profile bookmarked', value: 20 },
]; 