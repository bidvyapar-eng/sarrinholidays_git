/**
 * Sarrin Holidays - Feature Flags Configuration
 * 
 * Centralized toggles to enable or hide international and NRI-facing capabilities
 * across the frontend and administrative dashboards.
 * 
 * Setting flags to `false` cleanly hides all overseas routing, foreign phone numbers,
 * passport/visa fields, and international filters, while preserving the underlying
 * data models and architecture for instantaneous reactivation.
 */

export const FEATURES = {
  // Global Concierge routing popover, international desk, and overseas hotline
  ENABLE_GLOBAL_CONCIERGE: false,

  // International expedition packages and cross-border itineraries
  ENABLE_INTERNATIONAL_PACKAGES: false,

  // Non-Resident Indian (NRI) specific routing, tags, and callback schedules
  ENABLE_NRI_ROUTING: false,

  // Passport capture, consular visa assistance, and foreign departure airport fields
  ENABLE_PASSPORT_VISA_FIELDS: false,
} as const

// Named export conveniences
export const ENABLE_GLOBAL_CONCIERGE = FEATURES.ENABLE_GLOBAL_CONCIERGE
export const ENABLE_INTERNATIONAL_PACKAGES = FEATURES.ENABLE_INTERNATIONAL_PACKAGES
export const ENABLE_NRI_ROUTING = FEATURES.ENABLE_NRI_ROUTING
export const ENABLE_PASSPORT_VISA_FIELDS = FEATURES.ENABLE_PASSPORT_VISA_FIELDS

export type FeatureFlagKey = keyof typeof FEATURES
