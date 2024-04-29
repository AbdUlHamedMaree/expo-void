import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, IconButton, SegmentedButtons, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { number, object, string, date, coerce } from 'zod';

import { useCreateChatMutation } from '$apis/messages';
import { useCreateTripMutation } from '$apis/trips';
import { mapRegionAtom } from '$atoms/map-region';
import { PaperBottomSheet } from '$components/dumb/paper-bottom-sheet';
import { TripMapMarkerCard } from '$components/dumb/trip-map-marker-card';
import { DateTimeField } from '$components/fields/date-time';
import { MaskedTextField } from '$components/fields/masked-text';
import { TextField } from '$components/fields/text';
import { MaterialCommunityIcon } from '$components/icons';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { formateGeocodingResults } from '$libs/geocoding/formate-geocoding-results';
import { getAddressComponent } from '$libs/geocoding/get-adress-component';
import { createKeyGetter } from '$libs/react-hook-form/create-key-getter';
import { toast } from '$modules/react-native-paper-toast';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import { throwIfGqlErrors } from '$tools/throw-if-gql-errors';

const addressValidation = object({
  addressLineOne: string(),
  addressLineTwo: string(),
  area: string(),
  city: string(),
  country: string(),
  postCode: string(),
});

const validationSchema = object({
  pickupLatitude: number(),
  pickupLongitude: number(),
  pickupAddress: addressValidation,

  dropoffLatitude: number(),
  dropoffLongitude: number(),
  dropoffAddress: addressValidation,

  capacity: coerce.number(),
  plannedAt: date().min(new Date()),
  // type: union([literal('one-time'), literal('routine')]),
});

type ValidationSchema = Zod.infer<typeof validationSchema>;

const key = createKeyGetter<ValidationSchema>();

const formateGeocoder = formateGeocodingResults`${'route'} - ${'neighborhood'} - ${'sublocality'} - ${'locality'}`;

export type CreateNewTripScreenProps = {
  children?: React.ReactNode;
};

export const CreateNewTripScreen: React.FC<CreateNewTripScreenProps> = () => {
  const [createTrip, createTripResult] = useCreateTripMutation();
  const [createChat, createChatResult] = useCreateChatMutation();

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

  const onSubmit = methods.handleSubmit(async data => {
    try {
      const result = await createTrip({
        variables: {
          createTripPayload: {
            ...data,
            type: 'in_app',
            category: 'one_time',
          },
        },
      });

      const {
        createTrip: { id: newTripId },
      } = throwIfGqlErrors(result);

      await createChat({
        variables: {
          createChatTripId: newTripId,
        },
      });

      router.push({
        pathname: '/(trips)/single-trip/[trip-id]/',
        params: { 'trip-id': newTripId },
      });

      toast.success('Trip created successfully!');
    } catch (err) {
      console.error(err);
    }
  });

  const snapPoints = useMemo(() => ['8%', '60%'], []);

  const [pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude] = watch([
    'pickupLatitude',
    'pickupLongitude',
    'dropoffLatitude',
    'dropoffLongitude',
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

  const onMapPress = useCallback(
    ({ nativeEvent: { coordinate } }: MapPressEvent) => {
      if (activeButton === 'pickup') {
        setValue('pickupLatitude', coordinate.latitude);
        setValue('pickupLongitude', coordinate.longitude);
        resetField('pickupAddress');
      } else {
        setValue('dropoffLatitude', coordinate.latitude);
        setValue('dropoffLongitude', coordinate.longitude);
        resetField('dropoffAddress');
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

      const pickupAddress = getValues('pickupAddress');
      const dropoffAddress = getValues('dropoffAddress');

      if (!pickupAddress?.addressLineOne && pickupLocation)
        Geocoder.from(pickupLocation)
          .then(response => {
            console.log('pickup', response.results);
            const address = getAddress(response);

            setValue('pickupAddress', address, {
              shouldDirty: true,
              shouldTouch: true,
            });
          })
          .catch(err => console.error(err));

      if (!dropoffAddress?.addressLineOne && dropoffLocation)
        Geocoder.from(dropoffLocation)
          .then(response => {
            console.log('dropoff', response.results);
            const address = getAddress(response);

            setValue('dropoffAddress', address, {
              shouldDirty: true,
              shouldTouch: true,
            });
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
        {/* {pickupLocation && dropoffLocation && (
          <MapViewDirections
            origin={pickupLocation}
            destination={dropoffLocation}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_SERVICES_API_KEY}
            strokeWidth={4}
            strokeColor='#0005'
          />
        )} */}
      </MapView>

      <View style={styles.segmentedButtonsContainer}>
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
        style={{ position: 'absolute', left: 8, top: 8 }}
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
              name={key('pickupAddress.addressLineTwo')}
              disabled
            />

            <TextField
              label='Dropoff'
              name={key('dropoffAddress.addressLineTwo')}
              disabled
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
              loading={createTripResult.loading || createChatResult.loading}
              disabled={createTripResult.loading || createChatResult.loading}
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
    top: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const getAddress = (response: Geocoder.GeocoderResponse) => ({
  country: getAddressComponent(response, 'country'),
  city: getAddressComponent(response, 'locality'),
  area: getAddressComponent(
    response,
    'sublocality',
    getAddressComponent(response, 'neighborhood')
  ),
  addressLineOne: response.results[0].formatted_address,
  addressLineTwo: formateGeocoder(response.results).result,
  postCode: 'UNKNOWN',
});
