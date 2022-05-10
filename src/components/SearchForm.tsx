/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { CSSObject, jsx } from '@emotion/react';
import DatePicker from 'react-datepicker';
import { Input } from './Input';
import { FaClock, FaCalendar } from 'react-icons/fa';

import 'react-datepicker/dist/react-datepicker.css';
import { Label } from './Label';
import { NUMBER_OF_DISPLAYED_RESULTS } from '../utils/constants';
import {
  fetchAutocompleteCallSuccess,
  useFetchAutocompleteResults,
} from '../state/actions/searchActions';
import { useDispatch } from 'react-redux';

const style: CSSObject = {
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
};

export const SearchForm = () => {
  const currentDate = new Date();
  const currentDatePlusOneDay = new Date();
  currentDatePlusOneDay.setDate(currentDate.getDate() + 1);

  const [pickUpDate, setPickUpDate] = useState(currentDate);
  const [dropOffDate, setDropOffDate] = useState(currentDatePlusOneDay);
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchAutocompleteResults } = useFetchAutocompleteResults();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchAutocompleteResults({
        searchTerm,
        numberOfResultsRequired: NUMBER_OF_DISPLAYED_RESULTS,
      });
    } else {
      dispatch(fetchAutocompleteCallSuccess([]));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (pickUpDate > dropOffDate) {
      setDropOffDate(pickUpDate);
    }
  }, [pickUpDate]);

  return (
    <div css={style}>
      <div>
        <Input
          onChange={setSearchTerm}
          label={'Pick-up location'}
          value={searchTerm}
          placeholder={'Pick-up location'}
          ariaLabel={'Pick-up location'}
        />
      </div>

      <div css={{ marginLeft: '3rem' }}>
        <div css={{ display: 'flex' }}>
          <FaCalendar css={{ marginRight: '0.3rem' }} />
          <Label>Pick-up date</Label>
          <FaClock css={{ marginRight: '0.3rem', marginLeft: '0.6rem' }} />
          <Label>Time</Label>
        </div>
        <DatePicker
          selected={pickUpDate}
          onChange={(date: Date) => setPickUpDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div css={{ marginLeft: '3rem' }}>
        <div css={{ display: 'flex' }}>
          <FaCalendar css={{ marginRight: '0.3rem' }} />
          <Label>Drop-off date</Label>
          <FaClock css={{ marginRight: '0.3rem', marginLeft: '0.6rem' }} />
          <Label>Time</Label>
        </div>
        <DatePicker
          selected={dropOffDate}
          onChange={(date: Date) => setDropOffDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
    </div>
  );
};
