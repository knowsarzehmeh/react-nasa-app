import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  classes?: string;
  title?: string;
  onClick?: () => any
};

const Button: React.FC<ButtonProps> = ({ children, classes, title, onClick }) => {
  classes = classes && classes.length > 0 ? 'button ' + classes : 'button';
  return (
    <button onClick={onClick} title={title} className={classes}>
      {children}
    </button>
  );
};

export default Button;
