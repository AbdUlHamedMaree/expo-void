export const getAddressComponent = <T extends string | undefined>(
  response: Geocoder.GeocoderResponse,
  type:
    | 'country'
    | 'locality'
    | 'sublocality'
    | 'neighborhood'
    | 'street_number'
    | 'route',
  defaultValue: T = undefined as T
): string | T => {
  for (const result of response.results)
    for (const component of result.address_components)
      if (component.types.includes(type)) return component.long_name;

  return defaultValue;
};
