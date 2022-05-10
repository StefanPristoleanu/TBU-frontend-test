/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { CSSObject, jsx } from '@emotion/react';
import { AutocompleteResultType } from '../utils/types';
import { parseAddress, parseBookingId } from '../utils/utilities';
import { Label } from './Label';
import { locationTypeColorMap } from '../utils/constants';

type Props = {
  autocompleteResult: AutocompleteResultType;
  customStyle?: CSSObject;
};

const baseStyle: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '15px',
  border: '2px solid #D5D3D3',
  padding: '20px',
  margin: '1rem 2rem',
  maxWidth: '500px',
};

export const AutocompleteResult = ({
  autocompleteResult,
  customStyle,
}: Props) => {
  const style: CSSObject = {
    ...baseStyle,
    ...customStyle,
  };

  const { bookingId, name, iata, city, region, country } = autocompleteResult;
  const address = parseAddress({ city, region, country });
  const locationType = parseBookingId(bookingId);

  return (
    <React.Fragment>
      <div css={style}>
        <Label
          style={{
            marginRight: '2rem',
            backgroundColor: locationTypeColorMap.get(locationType),
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {locationType}
        </Label>
        <div css={{ display: 'flex', flexDirection: 'column' }}>
          {locationType === 'Airport' ? (
            <Label>{`${name} (${iata})`}</Label>
          ) : (
            <Label>{name}</Label>
          )}
          <Label>{address}</Label>
        </div>
      </div>
    </React.Fragment>
  );
};
