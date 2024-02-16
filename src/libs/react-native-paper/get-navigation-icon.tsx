import { Icon } from 'react-native-paper';

export const getNavigationIcon = (icon: string, focusedIcon: string = icon) =>
  function NavigationIcon({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) {
    return <Icon source={focused ? focusedIcon : icon} color={color} size={size} />;
  };
