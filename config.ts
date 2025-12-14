import { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';

export const SPRING_CONFIGS = {
  default: {
    damping: 14,
    stiffness: 75,
  } as WithSpringConfig,
  
  gentle: {
    damping: 20,
    stiffness: 90,
  } as WithSpringConfig,
  
  bouncy: {
    damping: 8,
    stiffness: 100,
  } as WithSpringConfig,
  
  stiff: {
    damping: 26,
    stiffness: 180,
  } as WithSpringConfig,
  
  slow: {
    damping: 20,
    stiffness: 50,
  } as WithSpringConfig,
};

export const TIMING_CONFIGS = {
  default: {
    duration: 300,
  } as WithTimingConfig,
  
  fast: {
    duration: 150,
  } as WithTimingConfig,
  
  slow: {
    duration: 500,
  } as WithTimingConfig,
};

export const DEFAULT_DELAYS = {
  none: 0,
  short: 100,
  medium: 200,
  long: 300,
};

export const DEFAULT_DISTANCES = {
  small: 20,
  medium: 50,
  large: 100,
};
