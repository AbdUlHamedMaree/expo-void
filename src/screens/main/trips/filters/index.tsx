import { zodResolver } from '@hookform/resolvers/zod';
import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { router, useNavigation } from 'expo-router';
import { useAtom } from 'jotai';
import { useCallback, useLayoutEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, IconButton, Text } from 'react-native-paper';
import { object, string, coerce, date } from 'zod';

import { TripsFiltersModel, tripsFiltersAtom } from '$atoms/trips-filters';
import { DateTimeField } from '$components/fields/date-time';
import { DropdownField } from '$components/fields/dropdown';
import { TextField } from '$components/fields/text';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { uaeCities } from '$constants/uae-cities';
import { createKeyGetter } from '$libs/react-hook-form/create-key-getter';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';

const addressObjectSchema = object({
  country: string().optional(),
  city: string().optional(),
  area: string().optional(),
});

const validationSchema = object({
  pickup: addressObjectSchema.optional(),
  dropoff: addressObjectSchema.optional(),
  fromAt: date().optional(),
  toAt: date().optional(),
  minAvailableSeats: coerce.number().min(1).optional(),
});

const key = createKeyGetter<TripsFiltersModel>();

export type TripsFiltersScreenProps = {
  //
};

export const TripsFiltersScreen: React.FC<TripsFiltersScreenProps> = () => {
  const { setOptions } = useNavigation();
  const [tripsFilters, setTripsFilters] = useAtom(tripsFiltersAtom);

  const defaultValues = useMemo<TripsFiltersModel>(
    () => ({
      minAvailableSeats: 1,
      ...tripsFilters,
      pickup: {
        country: '',
        city: '',
        area: '',
        ...tripsFilters?.pickup,
      },
      dropoff: {
        country: '',
        city: '',
        area: '',
        ...tripsFilters?.dropoff,
      },
    }),
    [tripsFilters]
  );

  const methods = useForm<TripsFiltersModel>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const handleApplyFilters = useMemo(
    () =>
      methods.handleSubmit(values => {
        setTripsFilters(values);
        router.back();
      }),
    [methods, setTripsFilters]
  );

  const handleClearFilters = useCallback(() => {
    setTripsFilters(undefined);
    router.back();
  }, [setTripsFilters]);

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <IconButton icon='filter-off-outline' onPress={handleClearFilters} />
          <IconButton icon='check' onPress={handleApplyFilters} />
        </View>
      ),
    } as NativeStackNavigationOptions);
  }, [handleApplyFilters, handleClearFilters, setOptions]);

  return (
    <ScreenWrapper disablePadding>
      <FormProvider {...methods}>
        <ScrollView>
          <View style={[{ flex: 1, gap: spacing.md }, commonStyles.screenPadding]}>
            <Text variant='headlineMedium'>Pickup</Text>

            <View style={{ flexDirection: 'row', flex: 1, gap: spacing.md }}>
              <DropdownField
                name={key('pickup.city')}
                label='City'
                items={uaeCities}
                viewContainerProps={{
                  style: { flex: 1 },
                }}
              />
              <TextField
                name={key('pickup.area')}
                label='Area'
                viewContainerProps={{
                  style: { flex: 1 },
                }}
              />
            </View>

            <Divider />

            <Text variant='headlineMedium'>Dropoff</Text>
            <View style={{ flexDirection: 'row', flex: 1, gap: spacing.md }}>
              <DropdownField
                name={key('dropoff.city')}
                label='City'
                items={uaeCities}
                viewContainerProps={{
                  style: { flex: 1 },
                }}
              />
              <TextField
                name={key('dropoff.area')}
                label='Area'
                viewContainerProps={{
                  style: { flex: 1 },
                }}
              />
            </View>

            <Divider />

            <Text variant='headlineMedium'>Date</Text>

            <View style={{ flexDirection: 'row', flex: 1, gap: spacing.md }}>
              <DateTimeField
                name={key('fromAt')}
                label='From'
                viewContainerProps={{
                  style: { flex: 1 },
                }}
              />
              <DateTimeField
                name={key('toAt')}
                label='To'
                viewContainerProps={{
                  style: { flex: 1 },
                }}
              />
            </View>

            <Divider />

            <Text variant='headlineMedium'>Seats</Text>

            <TextField
              name={key('minAvailableSeats')}
              label='Minimum Seats'
              keyboardType='numeric'
            />
          </View>
        </ScrollView>
      </FormProvider>
    </ScreenWrapper>
  );
};
