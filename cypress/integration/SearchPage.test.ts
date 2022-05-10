/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupDb } from './utils/MockData';
import { setupMocks } from './utils/Mocks';

const setupTest = () => {
  cy.visit('http://localhost:3000');
  const mockData = setupMocks();
  return { ...mockData };
};

describe('Autocomplete Search Page', () => {
  it('Should render components', function () {
    setupTest();
    cy.findByText('Pick-up location').should('be.visible');
    cy.findByText('Pick-up date').should('be.visible');
    cy.findByText('Drop-off date').should('be.visible');
    cy.findAllByText('Time').should('have.length', 2);
    cy.findByText('Search').should('be.visible');

    const searchInput = cy.findByRole('textbox', { name: 'Pick-up location' });
    searchInput.should('be.visible');
    searchInput.type('man');
    cy.findByText('Loading...').should('be.visible');

    const { autocompleteResults } = setupDb();
    autocompleteResults.results.docs.map((autocompleteResult: any) => {
      const isAirport = autocompleteResult.bookingId.includes('airport');
      if (isAirport) {
        cy.findByText(
          `${autocompleteResult.name} (${autocompleteResult.iata})`
        ).should('be.visible');
      } else {
        cy.findByText(autocompleteResult.name).should('be.visible');
      }
    });
  });
});
