import type { IRegistrationService } from './apiContract';
import { MockRegistrationService, mockApiService } from './mockApiService';

export type ServiceMode = 'mock' | 'production';

let currentServiceInstance: IRegistrationService = mockApiService;

/**
 * Service factory allowing seamless transition between Mock API and real production backend
 * UI components depend only on IRegistrationService returned by this factory.
 */
export function getRegistrationService(mode: ServiceMode = 'mock'): IRegistrationService {
  if (mode === 'mock') {
    return currentServiceInstance;
  }
  // When production backend endpoint is configured, instantiate RealApiService here
  return currentServiceInstance;
}

/**
 * Allows switching the active service implementation at runtime (e.g. for testing)
 */
export function setRegistrationService(service: IRegistrationService): void {
  currentServiceInstance = service;
}

/**
 * Creates a fresh mock service instance with custom latency
 */
export function createMockRegistrationService(latencyMs?: number): IRegistrationService {
  return new MockRegistrationService(latencyMs);
}

/**
 * Default singleton instance used across application forms
 */
export const apiService: IRegistrationService = getRegistrationService();
