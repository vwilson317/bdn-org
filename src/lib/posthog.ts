import posthog from 'posthog-js';
import { Platform } from 'react-native';

let isPostHogInitialized = false;

// Initialize PostHog
export const initPostHog = () => {
  // Only initialize on web platform
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
    
    if (posthogKey) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        loaded: () => {
          isPostHogInitialized = true;
          if (process.env.NODE_ENV === 'development') {
            console.log('PostHog initialized');
          }
        },
        capture_pageview: false, // We'll manually track pageviews
        capture_pageleave: true,
      });
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog key not found. Set EXPO_PUBLIC_POSTHOG_KEY environment variable.');
    }
  }
};

// Helper to check if PostHog is available
const isPostHogAvailable = (): boolean => {
  return Platform.OS === 'web' && typeof window !== 'undefined' && isPostHogInitialized && typeof posthog.capture === 'function';
};

// Track events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (isPostHogAvailable()) {
    posthog.capture(eventName, properties);
  }
};

// Track page views
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (isPostHogAvailable()) {
    posthog.capture('$pageview', {
      page_name: pageName,
      ...properties,
    });
  }
};

// Identify users
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (isPostHogAvailable()) {
    posthog.identify(userId, properties);
  }
};

// Reset user (on logout)
export const resetUser = () => {
  if (isPostHogAvailable()) {
    posthog.reset();
    isPostHogInitialized = false;
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (isPostHogAvailable()) {
    posthog.setPersonProperties(properties);
  }
};
