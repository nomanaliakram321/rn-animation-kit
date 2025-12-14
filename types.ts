import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WithSpringConfig } from 'react-native-reanimated';

export type AnimationDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type AnimationConfig = WithSpringConfig;

export interface BaseAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  animate?: boolean;
  style?: StyleProp<ViewStyle>;
  onAnimationComplete?: () => void;
}

export interface FadeInProps extends BaseAnimationProps {
  direction?: AnimationDirection;
  distance?: number;
  scale?: number;
}

export interface SlideInProps extends BaseAnimationProps {
  direction?: AnimationDirection;
  distance?: number;
}

export interface ScaleInProps extends BaseAnimationProps {
  initialScale?: number;
  finalScale?: number;
  direction?: AnimationDirection;
}

export interface RotateInProps extends BaseAnimationProps {
  rotation?: number; // degrees
  direction?: 'clockwise' | 'counter-clockwise';
}

export interface BounceInProps extends BaseAnimationProps {
  direction?: AnimationDirection;
  bounceHeight?: number;
}

export interface FlipInProps extends BaseAnimationProps {
  axis?: 'x' | 'y';
  direction?: 'forward' | 'backward';
}

export interface ZoomInProps extends BaseAnimationProps {
  initialScale?: number;
  overshoot?: number;
}

export interface SequenceProps {
  children: ReactNode[];
  delay?: number;
  stagger?: number;
  style?: StyleProp<ViewStyle>;
}

export interface ParallelProps {
  children: ReactNode[];
  delay?: number;
  style?: StyleProp<ViewStyle>;
}
