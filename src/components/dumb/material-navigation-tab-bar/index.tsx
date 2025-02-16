import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';

import { isFunction, isString } from '$modules/checks';

export type MaterialNavigationTabBarProps = BottomTabBarProps;

export const MaterialNavigationTabBar: React.FC<MaterialNavigationTabBarProps> = ({
  navigation,
  state,
  descriptors,
  insets,
}) => {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 24 });
        }

        return null;
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        if (isFunction(options.tabBarLabel))
          return "[void] tabBarLabel doesn't support functions";

        if (isString(options.tabBarLabel)) return options.tabBarLabel;
        if (isString(options.title)) return options.title;

        return route.name;
      }}
    />
  );
};
