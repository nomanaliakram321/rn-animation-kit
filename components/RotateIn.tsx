import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { RotateInProps } from '../types';
import { SPRING_CONFIGS } from '../config';

const RotateIn: React.FC<RotateInProps> = ({
  children,
  delay = 0,
  animate = true,
  style,
  rotation = 360,
  direction = 'clockwise',
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
    const rotationValue = direction === 'clockwise' ? rotation : -rotation;
    const rotate = interpolate(progress.value, [0, 1], [rotationValue, 0]);

    return {
      opacity: progress.value,
      transform: [
        { rotate: `${rotate}deg` },
        { scale: interpolate(progress.value, [0, 1], [0.5, 1]) },
      ],
    };
  });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default RotateIn;
