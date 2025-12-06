export const colors = {
  primary: '#8B8DF2',
  primaryLight: '#f3e8ff',
  gradient: {
    start: '#8B8DF2',
    end: '#C44BC2',
    sky: 'from-theme-bg-start to-theme-bg-end', // Theme gradient (Centralized)
    light: 'from-light-bg to-light-bg', // Light purple gradient
  },
  text: {
    main: 'text-gray-900', // Default for headings
    heading: 'text-gray-900',
    subheading: 'text-gray-700',
    body: 'text-gray-600',
    secondary: 'text-gray-600', // Deprecated, use body
    muted: 'text-gray-500',
    placeholder: 'placeholder-gray-500',
    link: 'text-purple-600',
  },
  border: 'border-gray-200',
  background: {
    card: 'bg-gradient-to-br from-white/60 via-gray-200/40 to-gray-100/30 backdrop-blur-md backdrop-saturate-150',
    page: 'bg-[#F7F7F8]',
    input: 'bg-[#f7f7fa]',
  }
};

export const layout = {
  spacing: {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-6',
  },
  padding: {
    card: 'p-4 sm:p-5', // Standard card padding
    section: 'py-6',
  },
  radius: {
    default: 'rounded-xl',
    sm: 'rounded-lg',
    full: 'rounded-full',
  }
};

export const components = {
  card: {
    base: 'bg-gradient-to-br from-white/60 via-gray-200/40 to-gray-100/30 backdrop-blur-md backdrop-saturate-150 border border-white/60 shadow-xl ring-1 ring-white/40 rounded-xl', // Mirror glass effect
    radius: 'rounded-xl',
    padding: 'p-4 sm:p-5',
    // Composite for convenience
    default: 'bg-gradient-to-br from-white/60 via-gray-200/40 to-gray-100/30 backdrop-blur-md backdrop-saturate-150 border border-white/60 shadow-xl ring-1 ring-white/40 rounded-xl p-4 sm:p-5',
  },
  button: {
    icon: 'w-9 h-9 rounded-full bg-light-bg flex items-center justify-center cursor-pointer',
    iconSmall: 'w-8 h-8 rounded-full bg-light-bg flex items-center justify-center cursor-pointer',
    primary: 'bg-gradient-to-r from-primary to-gradient-end text-white rounded-full font-medium hover:bg-purple-700 transition-colors',
    secondary: 'bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg font-medium transition-colors',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg font-medium transition-colors',
    success: 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 rounded-lg font-medium transition-colors',
    warning: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200 rounded-lg font-medium transition-colors',
  },
  typography: {
    sectionTitle: `text-lg font-bold ${colors.text.heading}`,
    cardTitle: `font-semibold ${colors.text.heading} text-base`,
    subheading: `font-medium ${colors.text.subheading} text-sm`,
    body: `text-sm ${colors.text.body}`,
    caption: `text-xs ${colors.text.muted}`, // Added caption
    meta: `text-xs ${colors.text.muted}`,
    link: `text-sm ${colors.text.link} hover:underline`,
  },
  badge: {
    skill: 'bg-[#ede6fa] text-[#18181b] px-3 py-1 rounded-full text-sm font-medium',
  },
  input: {
    default: `w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#a259e6] focus:border-transparent ${colors.background.input} ${colors.text.main} ${colors.text.placeholder} text-sm transition-all outline-none`,
    search: `w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#a259e6] focus:border-transparent bg-white ${colors.text.main} ${colors.text.placeholder} text-sm transition-all outline-none`,
  },
  glass: 'bg-gradient-to-br from-white/60 via-gray-200/40 to-gray-100/30 backdrop-blur-md backdrop-saturate-150 border border-white/60 shadow-xl ring-1 ring-white/40', // Mirror glass effect
};

export const THEME = {
  colors,
  layout,
  components
};
