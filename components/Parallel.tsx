import React from 'react';
import { View } from 'react-native';
import { ParallelProps } from '../types';

const Parallel: React.FC<ParallelProps> = ({
  children,
  delay = 0,
  style,
}) => {
  return (
    <View style={style}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Clone the child and add the same delay to all
          return React.cloneElement(child, {
            ...child.props,
            delay,
          } as any);
        }
        return child;
      })}
    </View>
  );
};

export default Parallel;
