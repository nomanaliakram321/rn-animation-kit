import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { SlideInProps } from '../types';
import { SPRING_CONFIGS } from '../config';

const { width, height } = Dimensions.get('window');

const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  animate = true,
  style,
  direction = 'left',
  distance,
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
    let translateX = 0;
    let translateY = 0;

    const slideDistance = distance || width;

    switch (direction) {
      case 'left':
        translateX = interpolate(progress.value, [0, 1], [slideDistance, 0]);
        break;
      case 'right':
        translateX = interpolate(progress.value, [0, 1], [-slideDistance, 0]);
        break;
      case 'top':
        translateY = interpolate(progress.value, [0, 1], [height / 2, 0]);
        break;
      case 'bottom':
        translateY = interpolate(progress.value, [0, 1], [-height / 2, 0]);
        break;
      case 'top-left':
        translateX = interpolate(progress.value, [0, 1], [slideDistance / 2, 0]);
        translateY = interpolate(progress.value, [0, 1], [height / 3, 0]);
        break;
      case 'top-right':
        translateX = interpolate(progress.value, [0, 1], [-slideDistance / 2, 0]);
        translateY = interpolate(progress.value, [0, 1], [height / 3, 0]);
        break;
      case 'bottom-left':
        translateX = interpolate(progress.value, [0, 1], [slideDistance / 2, 0]);
        translateY = interpolate(progress.value, [0, 1], [-height / 3, 0]);
        break;
      case 'bottom-right':
        translateX = interpolate(progress.value, [0, 1], [-slideDistance / 2, 0]);
        translateY = interpolate(progress.value, [0, 1], [-height / 3, 0]);
        break;
    }

    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default SlideIn;
