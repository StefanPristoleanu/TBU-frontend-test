/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { CSSObject, jsx } from '@emotion/react';
import { AutocompleteResultType } from '../utils/types';
import { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import { AutocompleteResult } from './AutocompleteResult';
import { Label } from './Label';

const baseStyle: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '0.2rem',
};

export const AutocompleteResultList = () => {
  const { autocompleteResultList, loading, error } = useSelector(
    (state: RootState) => state.autocompleteResults
  );

  if (loading) {
    return <Label style={{ margin: '0.5rem 3rem' }}>Loading...</Label>;
  }

  if (error !== null) {
    return <Label style={{ margin: '0.5rem 3rem' }}>{error}</Label>;
  }

  return (
    <div css={baseStyle}>
      {autocompleteResultList.map(
        (autocompleteResult: AutocompleteResultType, index: number) => {
          return (
            <div key={index} style={{ marginTop: '0.5rem' }}>
              <AutocompleteResult autocompleteResult={autocompleteResult} />
            </div>
          );
        }
      )}
    </div>
  );
};
