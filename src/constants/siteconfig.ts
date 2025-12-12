export const SITE_CONFIG = {
  name: 'Staff Book',
  homepage: {
    heroTitle: 'India First AI-Powered Job Portal with Real-Time Hiring Near You.',
    heroHighlight: 'Job Portal',
    heroSubtitle: 'Real-Time Hiring Near You.',
    companiesTitle: 'Top companies Hiring',
    premiumTitle: 'Unlock Premium Access',
    premiumSubtitle: 'Get exclusive features and enhanced visibility with our premium membership.',
    resumeTitleGradient: 'ATS-Friendly',
    resumeTitleRest: 'Resume Builder',
    resumeSubtitle: 'Create a professional, Applicant Tracking System (ATS)-friendly CV that increases your chances of getting shortlisted.',
    liveChatTitle: 'Live Chat with Recruiters',
    liveChatSubtitle: 'Connect instantly with recruiters for quicker hiring decisions.',
    postJobTitle: 'Post a Job and Hire faster',
    postJobSubtitle: 'Post jobs and find suitable candidates quickly.',
    exploreNow: 'Explore Now',
    seeAll: 'See All',
    newsTitle: 'Professional media and industry news',
    newsDescription: 'Stay updated with the latest trends, updates, and news shared by industry experts.',
    connectionTitle: 'Nurture your professional relationships with industry experts',
  },
  services: {
    recruiterPlans: {
      title: 'Unlock Premium Access for Recruiters',
      plans: [
        {
          title: 'Get free of cost access to services to hire the right talent',
          features: [
            'Unlimited Job posting',
            'Live chat with job seekers',
            'Post your hiring requirements on social media',
            'Send unlimited connection requests'
          ],
          price: 'Free',
          image: '/homePage/professional.png',
          popular: true
        },
        {
          title: 'Hiring made easy',
          features: [
            'View & Share contact details 15 applicants',
            'Video conferencing with 15 job applicants',
            'Resume Downloads of all job applicants'
          ],
          price: '999/ month',
          image: '/homePage/premium.png',
          popular: true
        },
        {
          title: 'Bulk Hiring Plan',
          features: [
            '100 CV views per requirement',
            'Up to 500 search results',
            'Candidates active in last 6 months',
            '10+ advanced filters',
            'Single user access'
          ],
          price: '999/ month',
          image: '/homePage/premium (2).png',
          popular: true
        }
      ]
    },
    jobSeekerPlans: {
      title: 'Unlock Premium Access for Job seekers',
      plans: [
        {
          title: 'Get free of cost access to services to boost your career',
          features: [
            'Apply for unlimited jobs',
            'Live chat with recruiters',
            'Post on social media',
            'Send unlimited connection requests',
            'Post one job'
          ],
          price: 'Free',
          image: '/images/dummy.png',
          popular: true
        },
        {
          title: 'Increase your profile visibility & Be a priority applicant',
          features: [
            'Get the Listing of jobs near you',
            'Profile visibility on top'
          ],
          price: 'Rs. 300 for 1 month',
          image: '/homePage/chat1.png',
          popular: true
        },
        {
          title: 'Get access to jobs near you',
          features: [
            'Get the Listing of jobs near you'
          ],
          price: 'Rs. 250 for 1 month',
          image: '/images/dummy.png',
          popular: true
        }
      ]
    },
    additionalPlans: {
      plans: [
        {
          title: 'Stand out as an Early Applicant with instant access to jobs.',
          features: [
            'Get the Listing of jobs near you',
            'Profile visibility on top',
            'Share & view contact details of 25 recruiters',
            'Receive jobs within 24 hours of them being posted on Staff Book'
          ],
          price: 'Rs. 500 for 1 month',
          image: '/homePage/chat2.png',
          popular: true
        },
        {
          title: 'Live video conferencing with recruiters',
          features: [
            'Get the Listing of jobs near you',
            'Profile visibility on top',
            'Share & view contact details of 25 recruiters',
            'Receive jobs within 24 hours of them being posted on Staff Book',
            'Get the access of scheduled video conferencing with 10 recruiters'
          ],
          price: 'Rs. 750 for 1 month',
          image: '/homePage/chat3.png',
          popular: true
        },
        {
          title: 'Create your ATS Friendly Resume',
          features: [
            'Get the Listing of jobs near you',
            'Profile visibility on top',
            'Share & view contact details of 25 recruiters',
            'Receive jobs within 24 hours of them being posted on Staff Book',
            'Get the access of scheduled video conferencing with 10 recruiters',
            'Get the access of live video conferencing with 10 recruiters',
            'ATS Friendly Resume'
          ],
          price: 'Rs. 900 for 1 month',
          image: '/images/dummy.png',
          popular: true
        }
      ]
    },
    resumeWriting: {
      title: 'Need help with Resume Writing?',
      subtitle: 'Standout from the crowd with our professionally written Resume by expert.',
      features: [
        'Feature 1',
        'Feature 1',
        'Feature 1',
        'Feature 1'
      ],
      price: 'Rs. 300 only',
      image: '/images/resume_accepted.svg'
    },
    contactUs: {
      title: 'Contact Us',
      form: {
        name: 'Name',
        email: 'Email ID',
        phone: 'Phone no.',
        query: 'Your Query',
        button: 'Call Me Back'
      },
      image: '/homePage/chat1.png'
    }
  },
  footer: {
    tagline: 'Nearby Jobs, Live Chat with Recruiters & Networking',
    policies: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Location Policy', href: '/location-policy' },
      { label: 'Branding Policy', href: '/branding-policy' },
      { label: 'Fraud Alert Policy', href: '/fraud-alert' },
    ],
    menu: [
      { label: 'About Us', href: '/about' },
      { label: 'Vision & Mission', href: '/vision' },
      { label: 'Service', href: '/service' },
      { label: 'Careers', href: '/careers' },
    ],
    email: 'info@staffbook.in',
    phone: '+91 9009222192',
    social: {
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
      linkedin: 'https://linkedin.com/',
      google: 'https://google.com/',
    },
  },
  navbar: {
    navLinks: [
      {
        label: 'Jobs',
        href: '/job-market',
        submenu: [
          {
            label: 'Job Seeking Mode',
            href: '/job-market/seeker',
            submenu: [
              { label: "Find Job", href: "/profile/jobs" },
              { label: 'Recruiter Interest', href: '/profile/insights' },
              { label: 'Career Growth', href: '/profile/development' }
            ]
          },
          {
            label: 'Employer Mode',
            href: '/job-market/employer',
            submenu: [
              { label: 'Find Candidates', href: '/profile/find-candidates' },
              { label: 'Manage Job Posts', href: '/profile/manage-jobs' },
              { label: 'Candidate Interest', href: '/profile/candidate-insights' }
            ]
          },
        ]
      },
      { label: 'Networking', href: '/networks' },
      { label: 'My Connections', href: '/connections' },
      { label: 'Services', href: '/service' },
    ],
    signUp: 'Sign up',
  },
  subMenu: {
    inputPlaceholder: 'Enter preferred Role',
  },
  featuredJobsSection: {
    title: 'Featured Jobs',
    seeAll: 'See All',
  },
  profileHeader: {
    preferredRole: 'Preferred Role',
    preferredSalary: 'Preferred Salary',
    preferredLocation: 'Preferred Location',
    preferredShift: 'Preferred Shift',
    jobType: 'Job Type',
    workStatus: 'Work Status',
    progressLabel: 'Profile Completion',
  },
  profileSummary: {
    section: 'Profile Summary',
  },
  savedJobs: {
    title: 'Saved Jobs',
    subtitle: 'Your saved job opportunities',
    emptyState: {
      title: 'No saved jobs yet',
      subtitle: 'Start saving jobs you\'re interested in to see them here',
      buttonText: 'Browse Jobs',
    },
  },
  networking: {
    title: 'Networking',
    subtitle: 'Connect with professionals',
    writePost: 'Write a post',
    postTypes: {
      blog: 'Blog',
      image: 'Image',
      video: 'Video',
      reel: 'Reel',
    },
    reels: {
      title: 'Reels',
      refresh: 'Refresh',
      createReel: 'Create Reel',
      uploadVideo: 'Upload Video',
      recordVideo: 'Record Video',
      addCaption: 'Add caption...',
      addHashtags: 'Add hashtags...',
      publish: 'Publish',
      cancel: 'Cancel',
    },
    suggestedForYou: 'Suggested for networking',
    connect: 'Connect',
    viewProfile: 'View Profile',
    postActions: {
      editPost: 'Edit post',
      sharePost: 'Share post',
      muteNotifications: 'Mute Notifications',
      insights: 'Insights',
      deletePost: 'Delete Post',
    },
    recruitersOnline: {
      title: 'Recruiters Online',
      viewAll: 'View all',
      chat: 'Chat',
    },
  },
  personalInfo: {
    section: 'Personal Information',
    personal: 'Personal',
    dob: 'Date of Birth',
    category: 'Cateogry',
    workPermit: 'Work Permit',
    address: 'Address',
    addMore: 'Add more details',
    gender: 'Gender',
    maritalStatus: 'Marital Status',
    languages: 'Languages',
  },
  resume: {
    section: 'Resume',
    required: '*',
    upload: 'Upload Resume',
    helper: 'Upload Resume to auto fetch the details to automatically fill your profile',
  },
  skills: {
    section: 'Skills',
  },
  signup: {
    heading: 'Create your profile',
    subheading: "+Join india's no. 1 job portal",
    fullNameLabel: 'Full name',
    fullNamePlaceholder: 'Enter your full name',
    fullNameHelper: 'Enter your full name here. This will be visible to recruiters',
    emailLabel: 'Enter Email ID',
    emailPlaceholder: 'Enter your E-Mail Address',
    emailHelper: 'Enter Email ID for job updates',
    passwordLabel: 'Enter password',
    passwordPlaceholder: 'Enter new password',
    passwordHelper: 'Enter a strong password to stay protected',
    phoneLabel: 'Phone number',
    phonePlaceholder: '+91-0000000000',
    phoneHelper: 'Recruiters will reach out to you on this no.',
    workStatusLabel: 'Work Status',
    workStatusFresher: 'I am a fresher',
    workStatusFresherHelper: '(Experience might include internships)',
    workStatusExperienced: 'I am experienced',
    workStatusExperiencedHelper: '(this excludes internships)',
    resumeLabel: 'Resume',
    resumeButton: 'Upload Resume',
    resumeFileTypes: 'DOC, DOCX, PDF, RTF',
    resumeHelper: 'Maximum size of PDF 2mb',
    jobUpdatesLabel: 'Send job updates me through mail, whatsapp',
    registerButton: 'Register now',
  },
  basicDetails: {
    section: 'Basic Details',
    totalExperience: 'Total Experience',
    location: 'Location',
    currentSalary: 'Current Salary',
    noticePeriod: 'Notice Period',
    socialMedia: 'Social Media Links',
    personalEmail: 'Personal Email ID',
    workEmail: 'Work Email ID',
    personalContact: 'Personal Contact',
    workNoticePeriod: 'Notice Period',
  },
  experienceSection: {
    section: 'Experience',
  },
  educationSection: {
    section: 'Education',
  },
  projectsSection: {
    section: 'Projects',
  },
  certificationsSection: {
    section: 'Certifications',
  },
};
export const LOGGED_IN_LINKS = [
  { label: 'Networking', href: '/networking' },
  {
    label: 'Jobs',
    href: '/profile/jobs',
    submenu: [
      {
        label: 'Job Seeking Mode',
        href: '/profile/jobs?mode=seeker',
        submenu: [
          { label: "Find Job", href: "/profile/jobs", icon: "FiBriefcase" },
          { label: 'Recruiter Interest', href: '/profile/insights', icon: "FiEye" },
          { label: 'Career Growth', href: '/profile/development', icon: "FiTrendingUp" }
        ]
      },
      {
        label: 'Employer Mode',
        href: '/profile/jobs?mode=employer',
        submenu: [
          { label: 'Find Candidates', href: '/profile/find-candidates', icon: "FiUsers" },
          { label: 'Manage Job Posts', href: '/profile/manage-jobs', icon: "FiFileText" },
          { label: 'Candidate Interest', href: '/profile/candidate-insights', icon: "FiUserCheck" }
        ]
      },
    ]
  },
  { label: 'My Connections', href: '/connections' },
  { label: 'Services', href: '/services' },
];

export const PROFILE_PERFORMANCE_TITLE = 'Profile Performance';

export const PROFILE_MODAL = {
  title: 'Profile',
  viewUpdateProfile: 'View & Update Profile',
  profilePerformance: 'Profile performance',
  lastDays: 'Last 60 days',
  whoSearchedYou: 'See who searched you',
  connections: 'Connections',
  exploreSubscriptions: 'Explore Subscriptions',
  settings: 'Settings',
  faqs: 'FAQ\'s',
  logOut: 'Log Out',
};