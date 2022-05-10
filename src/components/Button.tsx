/** @jsxRuntime classic */
/** @jsx jsx */
import React, { ReactNode } from 'react';
import { CSSObject, jsx } from '@emotion/react';
import { PRIMARY, WHITE } from '../utils/constants';

export type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
};

const baseStyle: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  border: 0,
  color: WHITE,
  fontSize: '14px',
  padding: '9px 24px',
  fontWeight: 600,
};

const Button = ({
  children,
  onClick,
  disabled = false,
  color = PRIMARY,
}: ButtonProps) => {
  const style: CSSObject = {
    ...baseStyle,
    ...{ backgroundColor: color },
  };

  return (
    <button onClick={onClick} disabled={disabled} css={style} type="button">
      {children}
    </button>
  );
};

export default React.memo(Button);
