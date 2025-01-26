import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { omit } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Divider, IconButton, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { literal, object, string, union } from 'zod';

import { useSendOtpMutation } from '$apis/otp';
import { useSignUpMutation } from '$apis/user';
import { PaperButton } from '$components/dumb/paper-button';
import { DropdownField } from '$components/fields/dropdown';
import { MaskedTextField } from '$components/fields/masked-text';
import { TextField } from '$components/fields/text';
import { userRoles } from '$constants/user-roles';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';

const validationSchema = object({
  name: string().min(4),
  phone: string({ required_error: 'Phone is required field' }).regex(
    /^(50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/,
    'Phone should be a valid UAE number'
  ),
  email: string().email(),
  password: string({ required_error: 'Password is required field' }).min(
    8,
    'Password should be at least 8 characters'
  ),
  repeatPassword: string({ required_error: 'Repeat password is required field' }),
  role: union([literal('user'), literal('driver')]),
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  message: 'Repeat password should be same as password',
  path: ['repeatPassword'],
});

export type MainProfileSignUpScreenProps = {
  //
};

export const MainProfileSignUpScreen: React.FC<MainProfileSignUpScreenProps> = () => {
  const theme = useAppTheme();

  const [signUp, signUpResult] = useSignUpMutation();
  const [sendOTP, sendOtpResult] = useSendOtpMutation();

  const methods = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      repeatPassword: '',
      role: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const handleSubmit = methods.handleSubmit(async values => {
    const phoneWithCountryCode = '+971' + values.phone;

    try {
      await signUp({
        variables: {
          signUpPayload: {
            ...omit(values, 'repeatPassword'),
            phone: phoneWithCountryCode,
          },
        },
      });

      const otpResult = await sendOTP({
        variables: {
          sendOTPPayload: {
            phone: phoneWithCountryCode,
          },
        },
      });

      if (!otpResult.data) {
        if (otpResult.errors) console.error(...otpResult.errors);
        return;
      }

      const message = otpResult.data.sendOtp.message;

      // *(1234)*
      const otp = message.substring(message.indexOf('(') + 1, message.indexOf(')'));

      console.log('otp:', otp);

      router.push({
        pathname: '/(auth)/otp',
        params: { phone: phoneWithCountryCode, otp },
      });
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <ScrollView>
      <SafeAreaView
        style={[
          commonStyles.flexFull,
          commonStyles.justifyCenter,
          commonStyles.screenPadding,
        ]}
      >
        <Text variant='displayMedium' style={commonStyles.textCenter}>
          Sign Up Now
        </Text>
        <Text
          variant='bodyLarge'
          style={[commonStyles.textCenter, { paddingTop: spacing.md }]}
        >
          Please fill the details and create an account
        </Text>
        <FormProvider {...methods}>
          <TextField name='name' label='Full Name' style={{ marginTop: spacing.xxl }} />
          <MaskedTextField
            left={<TextInput.Affix text='+971' />}
            name='phone'
            label='Phone'
            mask='999999999'
            style={{ marginTop: spacing.md }}
          />
          <TextField name='email' label='Email' style={{ marginTop: spacing.md }} />
          <TextField
            name='password'
            label='Password'
            secureTextEntry
            style={{ marginTop: spacing.md }}
          />
          <TextField
            name='repeatPassword'
            label='Repeat Password'
            secureTextEntry
            style={{ marginTop: spacing.md }}
          />
          <DropdownField
            name='role'
            label='User Type'
            style={{ marginTop: spacing.md }}
            items={userRoles}
          />
        </FormProvider>

        <PaperButton
          onPress={handleSubmit}
          loading={signUpResult.loading || sendOtpResult.loading}
          style={{
            borderRadius: theme.roundness,
            padding: spacing.sm,
            marginTop: spacing.xl,
          }}
        >
          Sign Up
        </PaperButton>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing.lg,
          }}
        >
          <Text>Already have an account?</Text>
          <Button onPress={() => router.push('/(home)/profile/login')}>Login</Button>
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
      </SafeAreaView>
    </ScrollView>
  );
};
