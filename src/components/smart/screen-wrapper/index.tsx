import { useLocalSearchParams } from 'expo-router';
import { forwardRef, memo, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView, SafeAreaProviderProps } from 'react-native-safe-area-context';

import { PaperToastContainer, toast } from '$modules/react-native-paper-toast';
import { ToastOptionsModel } from '$modules/react-native-paper-toast/model';
import { commonStyles } from '$styles/common';

export type ScreenWrapperProps = {
  disablePadding?: boolean;
  disableFlexFull?: boolean;

  center?: boolean;
  verticalCenter?: boolean;
  horizontalCenter?: boolean;

  children?: React.ReactNode;
} & SafeAreaProviderProps;

export const ScreenWrapper = memo(
  forwardRef<React.ComponentRef<typeof SafeAreaView>, ScreenWrapperProps>(
    function ScreenWrapper(
      {
        children,
        disablePadding,
        disableFlexFull,
        center,
        verticalCenter,
        horizontalCenter,
        ...props
      },
      forwardRef
    ) {
      const params = useLocalSearchParams();

      useEffect(() => {
        if (!params) return;
        if (!('toast' in params)) return;

        const toastOptions = params.toast as ToastOptionsModel;

        toast(toastOptions);
      }, [params]);

      return (
        <View
          {...props}
          ref={forwardRef}
          style={[
            !disableFlexFull && commonStyles.flexFull,
            !disablePadding && commonStyles.screenPadding,
            center && commonStyles.flexCenter,
            verticalCenter && commonStyles.justifyCenter,
            horizontalCenter && commonStyles.itemsCenter,
            props.style,
          ]}
        >
          {children}
          <PaperToastContainer variant='contained' />
        </View>
      );
    }
  )
);
