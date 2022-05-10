/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode } from 'react';
import { CSSObject, jsx } from '@emotion/react';

const labelStyles: CSSObject = {
  paddingBottom: '0.3rem',
  borderRadius: '100px',
  fontWeight: 600,
};

export const Label = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSObject;
}) => <div css={{ ...labelStyles, ...style }}>{children}</div>;
