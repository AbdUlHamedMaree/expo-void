export type GeocodingResults = Geocoder.GeocoderResponse['results'];

export const formateGeocodingResults =
  (strings: TemplateStringsArray, ...types: string[][] | string[]) =>
  (results: GeocodingResults) => {
    const found = [];
    for (const result of results) {
      const getComponent = getGeocodingComponent(result);

      const extracted = types.map(getComponent);

      const missingCount = extracted.reduce((acc, item) => (!item ? acc + 1 : acc), 0);

      const allGood = missingCount === 0;

      const str = mergeTaggedTemplates(strings, extracted);

      const item = {
        result: str,
        allGood,
        missingCount,
      };

      if (allGood) return item;

      found.push(item);
    }

    const index = found.reduce(
      (acc, cur, i) => (cur.missingCount < acc.m ? { i, m: cur.missingCount } : acc),
      { i: -1, m: Infinity }
    ).i;

    return found[index];
  };

export const getGeocodingComponent =
  (result: GeocodingResults[number]) => (types: string[] | string) => {
    if (!Array.isArray(types)) types = [types];

    for (const component of result.address_components) {
      if (component.types.some(type => types.includes(type))) return component.long_name;
    }

    return '';
  };

export const mergeTaggedTemplates = (strings: TemplateStringsArray, tagged: string[]) => {
  let result = '';

  for (let index = 0; index < tagged.length; index++) {
    const str = strings[index];
    const tag = tagged[index];

    result += str + tag;
  }

  result += strings[strings.length - 1];

  return result;
};
