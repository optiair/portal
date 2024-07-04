import './Typography.scss';

import { ReactNode } from 'react';

type FontVariant =
  | 'tiny'
  | 'small'
  | 'small-medium'
  | 'medium'
  | 'medium-large'
  | 'large'
  | 'extra-large'
  | 'extra-extra-large';

interface TypographyProps {
  id?: string;
  variant: FontVariant;
  color?: string;
  children:
    | string
    | string[]
    | JSX.Element
    | JSX.Element[]
    | number
    | undefined
    | null
    | (string | JSX.Element)[]
    | ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  id,
  variant,
  color,
  children,
}) => {
  return (
    <p id={id} className={variant} style={{ color }}>
      {children}
    </p>
  );
};
