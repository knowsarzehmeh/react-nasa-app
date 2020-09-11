import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  classes?: string;
};

const Button: React.FC<ButtonProps> = ({ children, classes }) => {
  classes = classes && classes.length > 0 ? 'button ' + classes : 'button';
  return <button className={classes}>{children}</button>;
};

export default Button;
