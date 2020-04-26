import React from 'react';
import { StaticContext } from 'react-router';
import { withRouter, match } from 'react-router-dom';
import Button from '../Button';
import * as H from 'history';

declare interface ButtonLinkProps {
  history: H.History;
  location: H.Location;
  match: match;
  staticContext: StaticContext;
  to?: string;
}

export interface ButtonProps {
  size?: string;
  color?: string;
  width?: string;
  form?: string;
  mix?: string[];
  indentR?: string;
}
const ButtonLink: React.FC<
  ButtonProps & ButtonLinkProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ history, location, match, staticContext, to, children, ...rest }) => {
  const handleClick = () => {
    to && history.push(to);
  };

  return (
    <Button onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
};

export default withRouter(ButtonLink);
