import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from '../state/store';
import { SearchPage } from './SearchPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  rest.get('https://www.rentalcars.com/FTSAutocomplete.do', (_, res, ctx) => {
    return res(ctx.json(autocompleteMock));
  }),
];
const server = setupServer(...handlers);

const autocompleteMock = {
  results: {
    docs: [
      {
        country: 'United Kingdom',
        lng: -2.27472,
        city: 'Manchester',
        searchType: 'L',
        alternative: ['GB,UK,England,Manchester Airport'],
        index: 1,
        bookingId: 'airport-38566',
        placeType: 'A',
        placeKey: '1472187',
        iata: 'MAN',
        countryIso: 'gb',
        locationId: '38566',
        name: 'Manchester Airport',
        ufi: 900038550,
        isPopular: true,
        region: 'Greater Manchester',
        lang: 'en',
        lat: 53.3536,
      },
      {
        country: 'United Kingdom',
        lng: -2.23615,
        searchType: 'L',
        alternative: ['GB,UK,England'],
        index: 2,
        bookingId: 'city-2623580',
        placeType: 'C',
        placeKey: '441725',
        countryIso: 'gb',
        locationId: '20951',
        name: 'Manchester',
        ufi: -2602512,
        isPopular: false,
        region: 'Greater Manchester',
        lang: 'en',
        lat: 53.4812,
      },
      {
        country: 'United Kingdom',
        lng: -2.2309,
        city: 'Manchester',
        searchType: 'L',
        alternative: ['GB,UK'],
        index: 3,
        bookingId: 'train-1158',
        placeType: 'T',
        placeKey: '992437021',
        countryIso: 'gb',
        locationId: '129213',
        name: 'Manchester - Piccadilly Train Station',
        ufi: 1158,
        isPopular: false,
        region: 'England',
        lang: 'en',
        lat: 53.4767,
      },
      {
        lng: -4.63451,
        city: 'Derbyhaven',
        searchType: 'L',
        alternative: ['IM'],
        index: 4,
        bookingId: 'airport-19471',
        placeType: 'A',
        placeKey: '1472264',
        iata: 'IOM',
        countryIso: 'im',
        locationId: '19471',
        name: 'Ronaldsway Airport',
        ufi: 900038781,
        isPopular: false,
        region: 'Isle of Man',
        lang: 'en',
        lat: 54.0868,
      },
      {
        country: 'United Kingdom',
        lng: -2.11667,
        searchType: 'L',
        alternative: ['GB,UK,England'],
        index: 5,
        bookingId: 'city-2624987',
        placeType: 'C',
        placeKey: '442845',
        countryIso: 'gb',
        locationId: '21041',
        name: 'Oldham',
        ufi: -2604617,
        isPopular: false,
        region: 'Greater Manchester',
        lang: 'en',
        lat: 53.55,
      },
      {
        country: 'United Kingdom',
        lng: -2.43333,
        searchType: 'L',
        alternative: ['GB,UK,England'],
        index: 6,
        bookingId: 'city-2615373',
        placeType: 'C',
        placeKey: '435024',
        countryIso: 'gb',
        locationId: '20256',
        name: 'Bolton',
        ufi: -2590356,
        isPopular: false,
        region: 'Greater Manchester',
        lang: 'en',
        lat: 53.5833,
      },
    ],
  },
};

export const initialStoreState = {
  loading: false,
  error: null,
  autocompleteResultList: [],
};

const renderComponent = () => {
  const store = getStore();
  return render(
    <Provider store={store}>
      <SearchPage />
    </Provider>
  );
};

describe('Autocomplete Search Page', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('Should render correctly', () => {
    renderComponent();

    expect(screen.getByText('Pick-up location')).toBeTruthy();

    const searchInput = screen.getByRole('textbox', {
      name: 'Pick-up location',
    });
    expect(searchInput).toBeTruthy();

    expect(screen.getByText('Pick-up date')).toBeTruthy();
    expect(screen.getByText('Drop-off date')).toBeTruthy();
    expect(screen.getAllByText('Time')).toHaveLength(2);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeTruthy();
  });

  it('Should render autocomplete results', async () => {
    renderComponent();

    const searchInput = screen.getByRole('textbox', {
      name: 'Pick-up location',
    });
    expect(searchInput).toBeTruthy();

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'man' } });
    });
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    autocompleteMock.results.docs.forEach(async ({ name }) => {
      expect(await screen.findByText(name)).toBeInTheDocument();
    });
  });
});
