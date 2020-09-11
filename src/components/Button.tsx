import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  classes?: string;
  title?: string;
};

const Button: React.FC<ButtonProps> = ({ children, classes, title }) => {
  classes = classes && classes.length > 0 ? 'button ' + classes : 'button';
  return (
    <button title={title} className={classes}>
      {children}
    </button>
  );
};

export default Button;
