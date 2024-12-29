import { HeaderBackButton, HeaderBackButtonProps } from '@react-navigation/elements';
import { useRouter } from 'expo-router';

export type StackScreenBackButtonProps = HeaderBackButtonProps;

export const StackScreenBackButton: React.FC<StackScreenBackButtonProps> = props => {
  const router = useRouter();

  return <HeaderBackButton onPress={router.back} {...props} />;
};
