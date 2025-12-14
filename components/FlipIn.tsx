import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { FlipInProps } from '../types';
import { SPRING_CONFIGS } from '../config';

const FlipIn: React.FC<FlipInProps> = ({
  children,
  delay = 0,
  animate = true,
  style,
  axis = 'y',
  direction = 'forward',
  onAnimationComplete,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      progress.value = withDelay(
        delay,
        withSpring(1, SPRING_CONFIGS.default, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        })
      );
    } else {
      progress.value = 1;
    }
  }, [animate, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const rotationStart = direction === 'forward' ? 90 : -90;
    const rotation = interpolate(progress.value, [0, 1], [rotationStart, 0]);

    const transform: any[] = [];

    if (axis === 'x') {
      transform.push({ rotateX: `${rotation}deg` });
    } else {
      transform.push({ rotateY: `${rotation}deg` });
    }

    transform.push({ scale: interpolate(progress.value, [0, 1], [0.8, 1]) });

    return {
      opacity: interpolate(progress.value, [0, 0.5, 1], [0, 1, 1]),
      transform,
    };
  });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default FlipIn;
