import { gql } from '$gql';
import { FragmentModel } from '$types/fragment-model';

export const TripCardFragment = gql(`
  fragment TripCard on TripOt {
    capacity
    occupiedSeats
    plannedAt

    pickupAddress {
      addressLineOne
      area
      city
    }

    dropoffAddress {
      addressLineOne
      area
      city
    }
  }
`);

export type TripCardModel = FragmentModel<typeof TripCardFragment>;

export const toTripCard = (obj: TripCardModel): TripCardModel => ({
  capacity: obj.capacity,
  occupiedSeats: obj.occupiedSeats,
  plannedAt: obj.plannedAt,

  pickupAddress: {
    addressLineOne: obj.pickupAddress.addressLineOne,
    area: obj.pickupAddress.area,
    city: obj.pickupAddress.city,
  },

  dropoffAddress: {
    addressLineOne: obj.dropoffAddress.addressLineOne,
    area: obj.dropoffAddress.area,
    city: obj.dropoffAddress.city,
  },
});
