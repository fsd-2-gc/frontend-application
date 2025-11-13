import React from 'react';
import { vi } from 'vitest';

// Mock next/link to render anchor tags during tests (as a plain <a>)
vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href, ...rest }: any) => {
      const resolved = typeof href === 'string' ? href : href?.pathname || '#';
      return React.createElement('a', { href: resolved, ...rest }, children);
    }
  };
});
