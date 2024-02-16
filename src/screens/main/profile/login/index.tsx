import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Divider, IconButton, Text, TextInput } from 'react-native-paper';
import { object, string } from 'zod';

import { useLoginMutation } from '$apis/user';
import { PaperButton } from '$components/dumb/paper-button';
import { MaskedTextField } from '$components/fields/masked-text';
import { TextField } from '$components/fields/text';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { useShowRootTabs } from '$hooks/use-show-root-tabs';
import { storage } from '$libs/async-storage/storage';
import { PaperToastContainer, toast } from '$modules/react-native-paper-toast';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';

const validationSchema = object({
  phone: string({ required_error: 'Phone is required field' }).regex(
    /^(50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/,
    'Phone should be a valid UAE number'
  ),
  password: string({ required_error: 'Password is required field' }).min(
    8,
    'Password should be at least 8 digits'
  ),
});

export type MainProfileLoginScreenProps = {
  //
};

export const MainProfileLoginScreen: React.FC<MainProfileLoginScreenProps> = () => {
  useShowRootTabs();

  const loginMutation = useLoginMutation();

  const methods = useForm({
    defaultValues: {
      phone: '',
      password: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const { navigate } = useNavigation();

  const theme = useAppTheme();

  const handleSubmit = methods.handleSubmit(async values => {
    try {
      const phoneWithCountryCode = '+971' + values.phone;

      const {
        login: { accessToken, refreshToken },
      } = await loginMutation.mutateAsync({
        loginPayload: { username: phoneWithCountryCode, password: values.password },
      });

      await storage.accessToken.set(accessToken);
      await storage.refreshToken.set(refreshToken);

      navigate('Main', {
        screen: 'Profile',
        params: { screen: 'Account', params: { screen: 'AccountMain', params: {} } },
      });
    } catch (err) {
      console.error(err);

      if (isAxiosError(err)) {
        toast.error('Invalid Credentials!');
        return;
      }

      toast.error('Unknown Error!');
    }
  });

  return (
    <ScreenWrapper verticalCenter>
      <Text variant='displayMedium' style={commonStyles.textCenter}>
        Login Now
      </Text>
      <Text
        variant='bodyLarge'
        style={[commonStyles.textCenter, { paddingTop: spacing.md }]}
      >
        Please login to continue using the app
      </Text>
      <FormProvider {...methods}>
        <MaskedTextField
          name='phone'
          label='Phone'
          mask='999999999'
          left={<TextInput.Affix text='+971' />}
          style={{ marginTop: spacing.xxl }}
        />
        <TextField
          name='password'
          label='Password'
          secureTextEntry
          style={{ marginTop: spacing.lg }}
        />
      </FormProvider>

      <Button
        onPress={() => {}}
        style={{ alignSelf: 'flex-end', paddingTop: spacing.lg }}
      >
        Forgot Password?
      </Button>

      <PaperButton
        onPress={handleSubmit}
        style={{
          borderRadius: theme.roundness,
          padding: spacing.sm,
          marginTop: spacing.xl,
        }}
        loading={loginMutation.isPending}
      >
        Login
      </PaperButton>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: spacing.lg,
        }}
      >
        <Text>Don&apos;t have an account?</Text>
        <Button
          onPress={() =>
            navigate('Main', {
              screen: 'Profile',
              params: { screen: 'SignUp', params: {} },
            })
          }
        >
          Sign Up
        </Button>
      </View>

      <Divider style={{ marginVertical: spacing.lg }} />

      <Text style={commonStyles.textCenter}>Or connect with</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: spacing.lg,
        }}
      >
        <IconButton icon='google' mode='outlined' size={36} onPress={() => {}} />
      </View>
      <PaperToastContainer />
    </ScreenWrapper>
  );
};