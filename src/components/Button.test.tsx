import { render } from '@testing-library/react';
import React from 'react';
import Button, { ButtonProps } from './Button';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const defaultProps = {
  children: 'Test',
  onClick: () => {
    return;
  },
};

const renderComponent = (props: ButtonProps) => {
  return render(<Button {...props} />);
};

const renderWithDefaultProps = () => renderComponent(defaultProps);

describe('Button Component', () => {
  it('Should render correctly', () => {
    const renderedObject = renderWithDefaultProps();

    expect(renderedObject).toMatchSnapshot();
  });

  it('Should not have any accessibility violations', async () => {
    const { baseElement } = renderWithDefaultProps();

    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
