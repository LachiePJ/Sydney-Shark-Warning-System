/**
 * Live Shark Risk - Premium Design System
 * Coastal Risk Intelligence Platform
 */

export const premiumDesign = {
  colors: {
    // Base palette - Deep navy / ink
    navy: {
      900: '#0a1628', // Deep ink
      800: '#0f1f3a', // Dark navy
      700: '#1a2f4f', // Navy
      600: '#2a4163', // Muted navy
      500: '#3a5477', // Mid navy
      400: '#516a8b', // Light navy
    },
    
    // Ocean blue - Muted, sophisticated
    ocean: {
      700: '#2b5876', // Deep ocean
      600: '#3a6d8c', // Ocean
      500: '#4a829f', // Mid ocean
      400: '#6b9bb3', // Light ocean
      300: '#8cb4c7', // Pale ocean
    },
    
    // Surfaces - Cool grey-blue
    surface: {
      900: '#1a1f2e', // Darkest surface
      800: '#252b3a', // Dark surface
      700: '#2f3647', // Surface
      600: '#3f4757', // Mid surface
      500: '#525968', // Light surface
      400: '#6b7280', // Lighter surface
      50: '#f8f9fb',  // Pearl/off-white
      25: '#fcfdfe',  // Near white
    },
    
    // Risk scale - Calibrated, operational
    risk: {
      low: {
        primary: '#059669',   // Emerald
        bg: '#d1fae5',
        border: '#6ee7b7',
      },
      moderate: {
        primary: '#d97706',   // Amber
        bg: '#fef3c7',
        border: '#fcd34d',
      },
      high: {
        primary: '#ea580c',   // Orange
        bg: '#fed7aa',
        border: '#fdba74',
      },
      severe: {
        primary: '#dc2626',   // Red
        bg: '#fecaca',
        border: '#fca5a5',
      },
    },
    
    // Accents
    accent: {
      info: '#3b82f6',      // Blue
      warning: '#f59e0b',   // Amber
      danger: '#ef4444',    // Red
      success: '#10b981',   // Green
    },
  },
  
  typography: {
    // Premium type scale
    display: {
      size: '2.5rem',      // 40px
      weight: '700',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
    },
    h1: {
      size: '1.875rem',    // 30px
      weight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
    },
    h2: {
      size: '1.5rem',      // 24px
      weight: '600',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
    h3: {
      size: '1.25rem',     // 20px
      weight: '600',
      lineHeight: '1.4',
    },
    body: {
      size: '0.9375rem',   // 15px
      weight: '400',
      lineHeight: '1.6',
    },
    bodyLarge: {
      size: '1.0625rem',   // 17px
      weight: '400',
      lineHeight: '1.6',
    },
    caption: {
      size: '0.8125rem',   // 13px
      weight: '500',
      lineHeight: '1.5',
    },
    label: {
      size: '0.6875rem',   // 11px
      weight: '600',
      lineHeight: '1.4',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
  },
  
  spacing: {
    section: '4rem',       // 64px
    card: '1.5rem',        // 24px
    element: '1rem',       // 16px
    tight: '0.5rem',       // 8px
  },
  
  borders: {
    thin: '1px',
    medium: '2px',
    radius: {
      sm: '0.375rem',      // 6px
      md: '0.5rem',        // 8px
      lg: '0.75rem',       // 12px
      xl: '1rem',          // 16px
    },
  },
  
  shadows: {
    subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    soft: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
    medium: '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
    strong: '0 8px 24px 0 rgba(0, 0, 0, 0.16)',
  },
  
  layout: {
    maxWidth: '1440px',
    contentWidth: '1280px',
    narrowWidth: '960px',
  },
} as const;

export type PremiumDesign = typeof premiumDesign;
