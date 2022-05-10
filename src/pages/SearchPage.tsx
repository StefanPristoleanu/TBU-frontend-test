/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { CSSObject, jsx } from '@emotion/react';
import { AutocompleteResultList } from '../components/AutocompleteResultList';
import Button from '../components/Button';
import { SearchForm } from '../components/SearchForm';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const handleSearch = () => {};

const style: CSSObject = {
  display: 'flex',
  justifyContent: 'space-evenly',
  margin: '2rem 2rem',
  fontWeight: 600,
  borderRadius: '15px',
  border: '10px solid #FFDB58',
  padding: '20px',
  maxWidth: '850px',
};

export const SearchPage = () => {
  return (
    <React.Fragment>
      <div css={style}>
        <SearchForm />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <AutocompleteResultList />
    </React.Fragment>
  );
};
