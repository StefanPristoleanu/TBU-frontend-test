/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo } from 'react';
import { CSSObject, jsx } from '@emotion/react';
import { OUTLINE } from '../utils/constants';

type Props = {
  onChange: (s: string) => void;
  value: string | undefined;
  label: string;
  ariaLabel: string;
  placeholder?: string;
  hasError?: boolean;
};

const style: CSSObject = {
  height: '36px',
  padding: '9px 16px',
  borderRadius: '4px',
  border: `1px solid ${OUTLINE}`,
  ':focus': {
    borderColor: 'black',
    outline: 'none',
  },
};

const labelStyle: CSSObject = {
  marginBottom: '6px',
};

const InputComponent: React.FC<Props> = ({
  onChange: onChangeFn,
  value,
  label,
  placeholder,
  ariaLabel,
}) => {
  const onChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) =>
      onChangeFn(e.target.value),
    [onChangeFn]
  );
  return (
    <label>
      <div css={labelStyle}>{label}</div>
      <input
        name="searchInput"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        css={{
          ...style,
        }}
        type="text"
        aria-label={ariaLabel}
        aria-required="true"
      />
    </label>
  );
};

export const Input = React.memo(InputComponent);
