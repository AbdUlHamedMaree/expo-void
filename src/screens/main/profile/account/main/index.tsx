import { router } from 'expo-router';
import { ObjectTypeDefinitionNode } from 'graphql';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Divider, IconButton, List, Text } from 'react-native-paper';

import { useMeQuery } from '$apis/user';
import { meDocument } from '$apis/user/queries/me';
import { PaperButton } from '$components/dumb/paper-button';
import { DropdownInput } from '$components/inputs/dropdown';
import { ListItem } from '$components/inputs/select/types';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { apolloClient } from '$libs/apollo-client/client';
import { storage } from '$libs/async-storage/storage';
import { useStorageState } from '$libs/async-storage/use-storage-state';
import { queryClient } from '$libs/react-query/client';
import { AvailableLanguagesUnion } from '$models/available-languages';
import { spacing } from '$theme/spacing';

const languages: ListItem[] = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'ar',
    label: 'العربية',
  },
];

export type MainProfileAccountMainProps = {
  //
};

export const MainProfileAccountMainScreen: React.FC<MainProfileAccountMainProps> = () => {
  const result = useMeQuery();
  const user = result.data?.me;

  const langStorage = useStorageState(storage.lang);

  const selectedItem = useMemo(() => {
    if (!langStorage.value) return [];
    const selectedLanguage = languages.find(
      language => language.value === langStorage.value
    );

    if (!selectedLanguage) return [];

    return [selectedLanguage];
  }, [langStorage.value]);

  const handleLogout = useCallback(async () => {
    await storage.accessToken.delete();
    await storage.refreshToken.delete();

    await apolloClient.clearStore();

    queryClient.invalidateQueries({
      queryKey: [(meDocument.definitions[0] as ObjectTypeDefinitionNode).name],
    });
    router.push('/(home)/profile/login');
  }, []);

  if (!user) return null;

  return (
    <ScreenWrapper>
      <IconButton
        icon='account'
        mode='contained'
        onPress={() => {}}
        size={128}
        style={{ alignSelf: 'center' }}
      />
      <Text variant='displaySmall' style={{ textAlign: 'center', marginTop: spacing.lg }}>
        {user.name}
      </Text>
      <Text style={{ textAlign: 'center', marginTop: spacing.sm }}>{user.phone}</Text>

      <View style={{ marginTop: spacing.xl, flex: 1 }}>
        <Text variant='displaySmall'>Subscription: Free Trail</Text>
        <Text style={{ marginTop: spacing.sm }}>
          App and Service will be free until further notice
        </Text>

        <Divider style={{ marginBottom: spacing.md, marginTop: spacing.xl }} />
        <List.Item title='My Trips' onPress={() => router.push('/(account)/my-trips')} />
        <Divider style={{ marginVertical: spacing.md }} />
        <DropdownInput
          mode='outlined'
          label='Language'
          items={languages}
          selected={selectedItem}
          onSelectFinish={selected =>
            selected[0] && langStorage.set(selected[0].value as AvailableLanguagesUnion)
          }
        />
        <Divider style={{ marginVertical: spacing.md }} />
        <View style={{ flex: 1 }} />
        <PaperButton onPress={handleLogout} style={{ marginTop: spacing.lg }}>
          Logout
        </PaperButton>
      </View>
    </ScreenWrapper>
  );
};
