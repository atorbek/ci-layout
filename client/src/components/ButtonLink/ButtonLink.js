import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../Button';

const ButtonLink = ({
  history,
  location,
  match,
  staticContext,
  to,
  children,
  ...rest
}) => {
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
