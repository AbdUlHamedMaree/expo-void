import React, { useCallback, useState, useEffect } from 'react';
import { LayoutChangeEvent, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type AnimatedStyle,
  type WithTimingConfig,
} from 'react-native-reanimated';

export type CollapsibleProps = {
  children?: React.ReactNode;
  expanded?: boolean;
  animatedContainerViewStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  wrapperViewStyle?: StyleProp<ViewStyle>;
  timingConfig?: WithTimingConfig;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  expanded,
  animatedContainerViewStyle,
  wrapperViewStyle,
  timingConfig,
}) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const onLayoutHeight = event.nativeEvent.layout.height;
      if (onLayoutHeight > 0 && height !== onLayoutHeight) {
        setHeight(onLayoutHeight);
      }
    },
    [height]
  );

  // Update the animated value when `expanded` or `height` changes
  useEffect(() => {
    animatedHeight.value = expanded
      ? withTiming(height, timingConfig)
      : withTiming(0, timingConfig);
  }, [expanded, height, timingConfig, animatedHeight]);

  const style = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <Animated.View style={[style, { overflow: 'hidden' }, animatedContainerViewStyle]}>
      <View style={[{ position: 'absolute' }, wrapperViewStyle]} onLayout={handleLayout}>
        {children}
      </View>
    </Animated.View>
  );
};
