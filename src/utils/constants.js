// Color Scheme
export const COLORS = {
  // Primary Colors
  primary: '#00D4FF',
  secondary: '#7C3AED',
  accent: '#FF1493',

  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',

  // Backgrounds
  background: '#0F172A',
  card: '#1E293B',
  surface: '#334155',

  // Text Colors
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',

  // Additional
  border: '#475569',
  disabled: '#64748B',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Font Sizes
export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

// Border Radius
export const BORDER_RADIUS = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// Shadow Styles
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Animation Durations (in milliseconds)
export const ANIMATIONS = {
  quick: 150,
  normal: 300,
  slow: 500,
  slower: 700,
};

// Device Constants
export const DEVICE = {
  statusBarHeight: 44,
  bottomTabHeight: 49,
  screenPadding: 16,
};

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'https://api.aurawave.app',
  AUTH: '/auth',
  CHARGING: '/charging',
  STATS: '/stats',
  SETTINGS: '/settings',
};

// App Constants
export const APP = {
  name: 'AuraWave',
  version: '1.0.0',
  description: 'Wireless Energy Harvesting App',
};

// Charging Modes
export const CHARGING_MODES = {
  AUTO: 'Auto',
  ECO: 'Eco',
  BALANCED: 'Balanced',
  TURBO: 'Turbo',
};

// Battery Levels
export const BATTERY_LEVELS = {
  CRITICAL: 10,
  LOW: 25,
  MEDIUM: 50,
  HIGH: 75,
  FULL: 100,
};

// Default Settings
export const DEFAULT_SETTINGS = {
  theme: 'dark',
  notifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
  autoMode: true,
  distance: 2.5,
  battery: 88,
};
