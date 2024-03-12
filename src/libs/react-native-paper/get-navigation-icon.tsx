import { Icon } from 'react-native-paper';

export type NavigationIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export const getNavigationIcon = (
  icon: string,
  focusedIcon: string = icon
): React.FC<NavigationIconProps> =>
  function NavigationIcon({ focused, color, size }) {
    return <Icon source={focused ? focusedIcon : icon} color={color} size={size} />;
  };
