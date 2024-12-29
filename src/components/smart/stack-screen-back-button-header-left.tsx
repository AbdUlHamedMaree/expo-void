import type { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';

import { StackScreenBackButton } from './stack-screen-back-button';

export type StackScreenBackButtonHeaderLeftProps = HeaderBackButtonProps;

export const StackScreenBackButtonHeaderLeft: React.FC<
  StackScreenBackButtonHeaderLeftProps
> = props => <StackScreenBackButton {...props} />;
