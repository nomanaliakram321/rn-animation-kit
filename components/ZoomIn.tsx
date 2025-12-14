import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { ZoomInProps } from '../types';
import { SPRING_CONFIGS } from '../config';

const ZoomIn: React.FC<ZoomInProps> = ({
  children,
  delay = 0,
  animate = true,
  style,
  initialScale = 0,
  overshoot = 1.1,
  onAnimationComplete,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      progress.value = withDelay(
        delay,
        withSpring(1, { ...SPRING_CONFIGS.bouncy, overshootClamping: false }, (finished) => {
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
      [0, 0.5, 1],
      [initialScale, overshoot, 1]
    );

    return {
      opacity: interpolate(progress.value, [0, 0.3, 1], [0, 1, 1]),
      transform: [{ scale }],
    };
  });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default ZoomIn;
