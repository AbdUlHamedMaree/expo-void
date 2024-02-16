import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { useShowRootTabs } from '$hooks/use-show-root-tabs';
import { storage } from '$libs/async-storage/storage';
import { useStorageState } from '$libs/async-storage/use-storage-state';
import { queryClient } from '$libs/react-query/client';
import { AvailableLanguagesUnion } from '$models/available-languages';
import { AccountStackParamList } from '$navigation/main/profile/account/model';
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

export type MainProfileAccountMainProps = NativeStackScreenProps<
  AccountStackParamList,
  'AccountMain'
>;

export const MainProfileAccountMainScreen: React.FC<MainProfileAccountMainProps> = () => {
  useShowRootTabs();

  const { data } = useMeQuery();
  const user = data?.me;
  const { navigate } = useNavigation();

  const langStorage = useStorageState(storage.lang);

  const selectedItem = useMemo(() => {
    if (!langStorage.value) return [];
    const selectedLanguage = languages.find(
      language => language.value === langStorage.value
    );

    if (!selectedLanguage) return [];

    return [selectedLanguage];
  }, [langStorage.value]);

  const handleLogout = useCallback(() => {
    storage.accessToken.delete();
    storage.refreshToken.delete();

    queryClient.invalidateQueries({
      queryKey: [(meDocument.definitions[0] as ObjectTypeDefinitionNode).name],
    });
    navigate('Main', { screen: 'Profile', params: { screen: 'Login', params: {} } });
  }, [navigate]);

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
        <List.Item
          title='My Trips'
          onPress={() =>
            navigate('Main', {
              screen: 'Profile',
              params: { screen: 'Account', params: { screen: 'MyTrips', params: {} } },
            })
          }
        />
        <Divider style={{ marginVertical: spacing.md }} />
        <DropdownInput
          mode='outlined'
          label='Language'
          items={languages}
          selected={selectedItem}
          onSelectFinish={selected =>
            langStorage.set(selected[0].value as AvailableLanguagesUnion)
          }
        />
        <View style={{ flex: 1 }} />
        <PaperButton onPress={handleLogout} style={{ marginTop: spacing.lg }}>
          Logout
        </PaperButton>
      </View>
    </ScreenWrapper>
  );
};
