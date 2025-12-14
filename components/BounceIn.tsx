import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSequence,
  withTiming,
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { BounceInProps } from '../types';

const BounceIn: React.FC<BounceInProps> = ({
  children,
  delay = 0,
  animate = true,
  style,
  direction = 'bottom',
  bounceHeight = 100,
  onAnimationComplete,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      progress.value = withDelay(
        delay,
        withSequence(
          withTiming(1, {
            duration: 400,
            easing: Easing.out(Easing.quad),
          }),
          withTiming(1, { duration: 0 }, (finished) => {
            if (finished && onAnimationComplete) {
              runOnJS(onAnimationComplete)();
            }
          })
        )
      );
    } else {
      progress.value = 1;
    }
  }, [animate, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.3, 1], [0, 1, 1]);

    let translateY = 0;
    let translateX = 0;

    switch (direction) {
      case 'top':
        translateY = interpolate(
          progress.value,
          [0, 0.4, 0.6, 0.75, 0.85, 1],
          [bounceHeight, -bounceHeight * 0.3, bounceHeight * 0.15, -bounceHeight * 0.08, bounceHeight * 0.04, 0]
        );
        break;
      case 'bottom':
        translateY = interpolate(
          progress.value,
          [0, 0.4, 0.6, 0.75, 0.85, 1],
          [-bounceHeight, bounceHeight * 0.3, -bounceHeight * 0.15, bounceHeight * 0.08, -bounceHeight * 0.04, 0]
        );
        break;
      case 'left':
        translateX = interpolate(
          progress.value,
          [0, 0.4, 0.6, 0.75, 0.85, 1],
          [bounceHeight, -bounceHeight * 0.3, bounceHeight * 0.15, -bounceHeight * 0.08, bounceHeight * 0.04, 0]
        );
        break;
      case 'right':
        translateX = interpolate(
          progress.value,
          [0, 0.4, 0.6, 0.75, 0.85, 1],
          [-bounceHeight, bounceHeight * 0.3, -bounceHeight * 0.15, bounceHeight * 0.08, -bounceHeight * 0.04, 0]
        );
        break;
    }

    return {
      opacity,
      transform: [{ translateY }, { translateX }],
    };
  });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default BounceIn;
