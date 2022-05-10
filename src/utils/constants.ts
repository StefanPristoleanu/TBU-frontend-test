export const PRIMARY = '#006064';

export const WHITE = '#FFFFFF';

export const OUTLINE = '#BDBDBD';

export const CRITICAL = '#B0132B';

export const CRITICAL_MUTED = '#FFD2D2';

export const BASE_URL = 'https://www.rentalcars.com';
export const NUMBER_OF_DISPLAYED_RESULTS = 6;

export const INITIAL_STORE_STATE = {
  loading: false,
  error: null,
  autocompleteResultList: [],
};

export const STATION = 'STATION';
export const AIRPORT = 'AIRPORT';
export const CITY = 'CITY';

export const locationTypeColorMap = new Map<string, string>([
  ['Airport', '#FED8B1'],
  ['City', '#ADD8E6'],
  ['Station', '#ADD8E6'],
]);
