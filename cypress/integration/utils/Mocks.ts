import { setupDb } from './MockData';

export const setupMocks = () => {
  const { autocompleteResults } = setupDb();

  const mockAutocompleteGet = () => {
    const autocompleteGetRequest = 'autocomplete-get-request';
    cy.intercept(
      {
        method: 'GET',
        pathname: new RegExp('.*'),
      },
      req => {
        req.reply(autocompleteResults);
      }
    ).as(autocompleteGetRequest);

    return {
      autocompleteGetRequest: `@${autocompleteGetRequest}`,
    };
  };

  const autocompleteRequest = mockAutocompleteGet();
  return { autocompleteRequest };
};
