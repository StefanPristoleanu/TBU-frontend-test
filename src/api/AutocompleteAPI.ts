import { BASE_URL } from '../utils/constants';
import { ApiBridge } from '../utils/request';
import { AutocompleteResultType } from '../utils/types';

export type AutocompleteResultsResponse = {
  data: {
    results: {
      isGooglePowered: boolean;
      docs: AutocompleteResultType[];
      numFound: number;
    };
  };
};

type GetProps = {
  searchTerm: string;
  numberOfResultsRequired: number;
};

export const getAutocompleteResults = ({
  searchTerm,
  numberOfResultsRequired,
}: GetProps) => {
  return ApiBridge.get<AutocompleteResultsResponse>(
    `${BASE_URL}/FTSAutocomplete.do?solrIndex=fts_en&solrRows={${numberOfResultsRequired}&solrTerm={${searchTerm}}}`
  );
};
