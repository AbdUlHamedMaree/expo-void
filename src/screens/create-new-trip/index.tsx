import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import { Button, IconButton, SegmentedButtons, Surface, Text } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { number, object, string, date, coerce } from 'zod';
import * as z from 'zod';

import { useCreateTripMutation } from '$apis/trips';
import { mapRegionAtom } from '$atoms/map-region';
import { PaperBottomSheet } from '$components/dumb/paper-bottom-sheet';
import { TripMapMarkerCard } from '$components/dumb/trip-map-marker-card';
import { DateTimeField } from '$components/fields/date-time';
import { MaskedTextField } from '$components/fields/masked-text';
import { TextField } from '$components/fields/text';
import { MaterialCommunityIcon } from '$components/icons';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { getAddressComponent } from '$libs/geocoding/get-adress-component';
import {
  useDirectionPolylinePoints,
  useGoogleMapsDirectionsQuery,
} from '$libs/google-maps-direction/hook';
import { createKeyGetter } from '$libs/react-hook-form/create-key-getter';
import { toast } from '$modules/react-native-paper-toast';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import { throwIfGqlErrors } from '$tools/throw-if-gql-errors';

const addressValidation = object({
  city: string(),
  area: string(),
  street: string(),
});

const validationSchema = object({
  capacity: coerce.number(),
  // category: union([literal('one_time'), literal('routine')]),

  pickupAddress: addressValidation,
  formattedPickupAddress: string(),
  pickupLatitude: number(),
  pickupLongitude: number(),

  dropoffAddress: addressValidation,
  formattedDropoffAddress: string(),
  dropoffLatitude: number(),
  dropoffLongitude: number(),

  plannedAt: date().min(new Date()),
  // type: union([literal('in_app'), literal('group')]),
});

type ValidationSchema = Zod.infer<typeof validationSchema>;

const key = createKeyGetter<ValidationSchema>();

export type CreateNewTripScreenProps = {
  children?: React.ReactNode;
};

export const CreateNewTripScreen: React.FC<CreateNewTripScreenProps> = () => {
  const insets = useSafeAreaInsets();
  const [createTrip, createTripResult] = useCreateTripMutation();

  const [helperText, setHelperText] = useState<string | undefined>(
    'Choose the trip pickup location'
  );

  const theme = useAppTheme();
  const initialMapRegion = useAtomValue(mapRegionAtom);

  const bottomSheetRef = useRef<React.ComponentRef<typeof PaperBottomSheet>>(null);

  const firstSwitchRef = useRef(true);
  const firstDrawRef = useRef(true);

  const [activeButton, setActiveButton] = useState<'pickup' | 'dropoff'>('pickup');

  const methods = useForm<ValidationSchema>({
    defaultValues: {
      pickupLatitude: null,
      pickupLongitude: null,
      pickupAddress: null,

      dropoffLatitude: null,
      dropoffLongitude: null,
      dropoffAddress: null,

      capacity: null,
      plannedAt: null,
    } as any,
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const { getValues, setValue, watch, resetField } = methods;

  const [pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, plannedAt] =
    watch([
      'pickupLatitude',
      'pickupLongitude',
      'dropoffLatitude',
      'dropoffLongitude',
      'plannedAt',
    ]);
  const pickupLocation = useMemo(
    () =>
      pickupLatitude && pickupLongitude
        ? { latitude: pickupLatitude, longitude: pickupLongitude }
        : undefined,
    [pickupLatitude, pickupLongitude]
  );

  const dropoffLocation = useMemo(
    () =>
      dropoffLatitude && dropoffLongitude
        ? { latitude: dropoffLatitude, longitude: dropoffLongitude }
        : undefined,
    [dropoffLatitude, dropoffLongitude]
  );

  const googleMapsDirectionsResponse = useGoogleMapsDirectionsQuery(
    {
      origin: pickupLocation,
      destination: dropoffLocation,
      mode: 'driving',
      units: 'metric',
      language: 'en',
      departureTime: plannedAt?.getTime(),
    },
    { enabled: Boolean(pickupLocation && dropoffLocation) }
  );

  const directionPolyline = useDirectionPolylinePoints({
    response: googleMapsDirectionsResponse.data?.data,
  });

  const onSubmit = methods.handleSubmit(async data => {
    try {
      const result = await createTrip({
        variables: {
          createTripPayload: {
            ...data,
            googleDirectionsApiData: googleMapsDirectionsResponse.data?.data as any,
            type: 'in_app',
            category: 'one_time',
          },
        },
      });

      const {
        createTrip: { id: newTripId },
      } = throwIfGqlErrors(result);

      router.replace({
        pathname: '/(trips)/single-trip/[trip-id]/',
        params: { 'trip-id': newTripId },
      });

      toast.success('Trip created successfully!');
    } catch (err) {
      console.error(err);
    }
  });

  const snapPoints = useMemo(() => ['8%', '60%'], []);

  const onMapPress = useCallback(
    ({ nativeEvent: { coordinate } }: MapPressEvent) => {
      if (activeButton === 'pickup') {
        setValue('pickupLatitude', coordinate.latitude, {
          shouldTouch: true,
          shouldDirty: true,
        });
        setValue('pickupLongitude', coordinate.longitude, {
          shouldTouch: true,
          shouldDirty: true,
        });
        resetField('pickupAddress');
        resetField('formattedPickupAddress');
      } else {
        setValue('dropoffLatitude', coordinate.latitude, {
          shouldTouch: true,
          shouldDirty: true,
        });
        setValue('dropoffLongitude', coordinate.longitude, {
          shouldTouch: true,
          shouldDirty: true,
        });
        resetField('dropoffAddress');
        resetField('formattedDropoffAddress');
        if (firstDrawRef.current) {
          setTimeout(() => bottomSheetRef.current?.snapToIndex(1), 200);
          setHelperText('');
          firstDrawRef.current = false;
        }
      }
      if (firstSwitchRef.current) {
        setActiveButton(v => (v === 'pickup' ? 'dropoff' : 'pickup'));
        setHelperText('Great! now choose dropoff location');
        firstSwitchRef.current = false;
      }
    },
    [activeButton, resetField, setValue]
  );

  const onSnapChange = useCallback(
    (index: number) => {
      // if not open, stop.
      if (index !== 1) return;

      const formattedPickupAddress = getValues('formattedPickupAddress');
      const formattedDropoffAddress = getValues('formattedDropoffAddress');

      if (!formattedPickupAddress && pickupLocation)
        Geocoder.from(pickupLocation)
          .then(response => {
            const address = getAddress(response);

            setValue('pickupAddress', address, {
              shouldDirty: true,
              shouldTouch: true,
            });
            setValue(
              'formattedPickupAddress',
              `${address.street} - ${address.area} - ${address.city}`,
              {
                shouldDirty: true,
                shouldTouch: true,
              }
            );
          })
          .catch(err => console.error(err));

      if (!formattedDropoffAddress && dropoffLocation)
        Geocoder.from(dropoffLocation)
          .then(response => {
            const address = getAddress(response);

            setValue('dropoffAddress', address, {
              shouldDirty: true,
              shouldTouch: true,
            });
            setValue(
              'formattedDropoffAddress',
              `${address.street} - ${address.area} - ${address.city}`,
              {
                shouldDirty: true,
                shouldTouch: true,
              }
            );
          })
          .catch(err => console.error(err));
    },
    [dropoffLocation, pickupLocation, getValues, setValue]
  );

  return (
    <ScreenWrapper disablePadding>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={[commonStyles.flexFull]}
        initialRegion={initialMapRegion}
        onPress={onMapPress}
      >
        {pickupLocation && (
          <Marker coordinate={pickupLocation} tracksViewChanges={false}>
            <TripMapMarkerCard>
              <MaterialCommunityIcon name='car' size={18} />
            </TripMapMarkerCard>
          </Marker>
        )}
        {dropoffLocation && (
          <Marker coordinate={dropoffLocation} tracksViewChanges={false}>
            <TripMapMarkerCard>
              <MaterialCommunityIcon name='flag-checkered' size={18} />
            </TripMapMarkerCard>
          </Marker>
        )}
        <Polyline
          coordinates={directionPolyline}
          strokeWidth={4}
          strokeColor={theme.colors.primary}
        />
      </MapView>

      <View
        style={[
          styles.segmentedButtonsContainer,
          {
            top: 12 + insets.top,
          },
        ]}
      >
        <SegmentedButtons
          onValueChange={str => setActiveButton(str as 'pickup')}
          value={activeButton}
          style={{
            width: 200,
            backgroundColor: theme.colors.elevation.level2,
            borderRadius: 50,
          }}
          buttons={[
            { label: 'Pickup', value: 'pickup' },
            { label: 'Drop off', value: 'dropoff' },
          ]}
        />
        {helperText && (
          <Surface
            style={{
              padding: spacing.sm,
              borderRadius: spacing.sm,
              marginTop: spacing.lg,
            }}
          >
            <Text variant='bodyLarge'>{helperText}</Text>
          </Surface>
        )}
      </View>
      <IconButton
        icon='arrow-left'
        mode='contained'
        onPress={() => router.back()}
        style={{ position: 'absolute', left: 8, top: 8 + insets.top }}
      />

      <PaperBottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={onSnapChange}
      >
        <SafeAreaView
          style={[
            commonStyles.flexFull,
            commonStyles.screenPadding,
            { rowGap: spacing.sm },
          ]}
        >
          <FormProvider {...methods}>
            <TextField
              label='Pickup'
              name={key('formattedPickupAddress')}
              // disabled
            />

            <TextField
              label='Dropoff'
              name={key('formattedDropoffAddress')}
              // disabled
            />

            <MaskedTextField
              label='Car Capacity'
              name={key('capacity')}
              mask='99'
              keyboardType='number-pad'
            />

            <DateTimeField name={key('plannedAt')} label='Planned At' />

            {/* <RadioButtonGroupField name={key('type')}>
              <RadioButton.Item label='One time trip' value='one-time' />
              <RadioButton.Item label='Routine trip' value='routine' />
            </RadioButtonGroupField> */}

            <View style={{ flex: 1 }} />

            <Button
              mode='contained'
              onPress={onSubmit}
              loading={createTripResult.loading}
              disabled={createTripResult.loading}
            >
              Create
            </Button>
          </FormProvider>
        </SafeAreaView>
      </PaperBottomSheet>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  segmentedButtonsContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const getAddress = (
  response: Geocoder.GeocoderResponse
): z.infer<typeof addressValidation> => ({
  city: getAddressComponent(response, 'locality', 'UNKNOWN'),
  area: getAddressComponent(
    response,
    'sublocality',
    getAddressComponent(response, 'neighborhood', 'UNKNOWN')
  ),
  street: getAddressComponent(
    response,
    'route',
    getAddressComponent(response, 'street_number', 'UNKNOWN')
  ),
});
