import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { ScaleInProps } from '../types';
import { SPRING_CONFIGS } from '../config';

const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  animate = true,
  style,
  initialScale = 0,
  finalScale = 1,
  direction,
  onAnimationComplete,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      progress.value = withDelay(
        delay,
        withSpring(1, SPRING_CONFIGS.bouncy, (finished) => {
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
    const scale = interpolate(
      progress.value,
      [0, 1],
      [initialScale, finalScale]
    );

    const transforms: any[] = [{ scale }];

    // Add directional translation if specified
    if (direction) {
      const distance = 30;
      switch (direction) {
        case 'top':
          transforms.push({
            translateY: interpolate(progress.value, [0, 1], [distance, 0]),
          });
          break;
        case 'bottom':
          transforms.push({
            translateY: interpolate(progress.value, [0, 1], [-distance, 0]),
          });
          break;
        case 'left':
          transforms.push({
            translateX: interpolate(progress.value, [0, 1], [distance, 0]),
          });
          break;
        case 'right':
          transforms.push({
            translateX: interpolate(progress.value, [0, 1], [-distance, 0]),
          });
          break;
      }
    }

    return {
      opacity: progress.value,
      transform: transforms,
    };
  });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default ScaleIn;
