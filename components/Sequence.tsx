import React from 'react';
import { View } from 'react-native';
import { SequenceProps } from '../types';

const Sequence: React.FC<SequenceProps> = ({
  children,
  delay = 0,
  stagger = 100,
  style,
}) => {
  return (
    <View style={style}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          // Clone the child and add delay prop
          return React.cloneElement(child, {
            ...child.props,
            delay: delay + index * stagger,
          } as any);
        }
        return child;
      })}
    </View>
  );
};

export default Sequence;
