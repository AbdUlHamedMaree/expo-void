import { format } from 'date-fns';
import flow from 'lodash/fp/flow';
import pick from 'lodash/fp/pick';
import update from 'lodash/fp/update';
import { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardProps, Divider, IconButton, Text } from 'react-native-paper';

import { Collapsible } from '../collapsible';

import { MaterialCommunityIcon } from '$components/icons';
import { gql } from '$gql';
import { isStringFull } from '$modules/checks';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import type { FragmentModel } from '$types/fragment-model';

const fragment = gql(/* GraphQL */ `
  fragment mapToTripCard on TripOt {
    capacity
    occupiedSeats
    plannedAt
    pickupAddress {
      addressLineOne
      city
      area
    }
    dropoffAddress {
      addressLineOne
      city
      area
    }
  }
`);

type Trip = FragmentModel<typeof fragment>;
type TripAddress = Trip['pickupAddress'];

export const mapToTripCardAddress = pick<TripAddress, keyof TripAddress>([
  'addressLineOne',
  'area',
  'city',
]);

export const mapToTripCard = flow<Trip[], Trip, Trip, Trip>(
  pick<Trip, keyof Trip>([
    'capacity',
    'occupiedSeats',
    'plannedAt',
    'pickupAddress',
    'dropoffAddress',
  ]),
  update('pickupAddress', mapToTripCardAddress),
  update('dropoffAddress', mapToTripCardAddress)
);

export type TripProps = Trip & {
  onJoin?: () => void;
  onShowMap?: () => void;
  onClose?: () => void;
} & Omit<CardProps, 'children' | 'mode' | 'elevation' | 'id'>;

export const TripCard = memo<TripProps>(function Trip({
  capacity,
  occupiedSeats,
  plannedAt,
  pickupAddress,
  dropoffAddress,

  onJoin,
  onShowMap,
  onClose,
  ...props
}) {
  const theme = useAppTheme();

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => setExpanded(v => !v), []);

  const time = useMemo(() => new Date(plannedAt), [plannedAt]);

  const formattedTime = useMemo(
    () => (time ? format(time, 'Pp') : 'Unknown Time'),
    [time]
  );

  const emptySeatsCount = (capacity ?? 1) - (occupiedSeats ?? 1);

  return (
    <Card {...props} id={undefined}>
      <Card.Content style={styles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcon name='car' size={24} color={theme.colors.primary} />
          <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
            {getCityAreaAddress(pickupAddress) ?? 'Unknown Start'}
          </Text>
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}
        >
          <MaterialCommunityIcon
            name='flag-checkered'
            size={24}
            color={theme.colors.primary}
          />
          <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
            {getCityAreaAddress(dropoffAddress) ?? 'Unknown Destination'}
          </Text>
        </View>

        {onClose && (
          <IconButton
            icon='close'
            style={{ position: 'absolute', top: 0, right: 0 }}
            size={18}
            onPress={onClose}
          />
        )}

        <Divider style={{ marginVertical: spacing.sm }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcon
              name='clock-time-four-outline'
              size={24}
              color={theme.colors.primary}
            />
            <Text variant='titleMedium' style={{ marginLeft: spacing.md }}>
              {formattedTime}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcon
              name='car-seat'
              size={24}
              color={theme.colors.primary}
            />
            <Text variant='titleMedium' style={{ marginLeft: spacing.md }}>
              {emptySeatsCount} Seats left
            </Text>
          </View>
        </View>
        <Collapsible expanded={expanded}>
          <Text>pizza</Text>
        </Collapsible>
      </Card.Content>
      <Card.Actions style={{ marginTop: spacing.lg }}>
        {onShowMap && (
          <IconButton
            mode='contained'
            icon='map-marker-radius-outline'
            onPress={onShowMap}
          />
        )}
        <View style={{ flex: 1 }} />
        {onJoin && <IconButton mode='contained' icon='login-variant' onPress={onJoin} />}
        <IconButton
          mode='contained'
          icon={expanded ? 'chevron-up' : 'chevron-down'}
          onPress={toggleExpand}
        />
      </Card.Actions>
    </Card>
  );
});

const styles = StyleSheet.create({
  cardContent: {
    rowGap: spacing.md,
  },
});

const getCityAreaAddress = ({
  addressLineOne,
  area,
  city,
}: {
  addressLineOne?: string | null | undefined;
  area?: string | null | undefined;
  city?: string | null | undefined;
}) => {
  if (isStringFull(city) && isStringFull(area)) {
    return `${area} - ${city}`;
  }

  if (isStringFull(addressLineOne)) return addressLineOne;
};
