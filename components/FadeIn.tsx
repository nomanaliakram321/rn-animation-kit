import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { FadeInProps } from '../types';
import { SPRING_CONFIGS } from '../config';

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  animate = true,
  style,
  direction = 'top',
  distance = 75,
  scale = 1,
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
    const opacity = progress.value;
    const transforms: any[] = [];

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

      case 'top-left':
        transforms.push(
          { translateY: interpolate(progress.value, [0, 1], [distance, 0]) },
          { translateX: interpolate(progress.value, [0, 1], [distance * 0.5, 0]) }
        );
        break;

      case 'top-right':
        transforms.push(
          { translateY: interpolate(progress.value, [0, 1], [distance, 0]) },
          { translateX: interpolate(progress.value, [0, 1], [-distance * 0.5, 0]) }
        );
        break;

      case 'bottom-left':
        transforms.push(
          { translateY: interpolate(progress.value, [0, 1], [-distance, 0]) },
          { translateX: interpolate(progress.value, [0, 1], [distance * 0.5, 0]) }
        );
        break;

      case 'bottom-right':
        transforms.push(
          { translateY: interpolate(progress.value, [0, 1], [-distance, 0]) },
          { translateX: interpolate(progress.value, [0, 1], [-distance * 0.5, 0]) }
        );
        break;
    }

    if (scale !== 1) {
      transforms.push({
        scale: interpolate(progress.value, [0, 1], [scale, 1]),
      });
    }

    return {
      opacity,
      transform: transforms,
    };
  });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default FadeIn;
