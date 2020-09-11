import React from 'react';
import DatePicker from 'react-datepicker';

type HeaderProps = {
  date: Date;
  setDate?: (initalState: Date | ((previousState: Date) => Date)) => void;
};

const Header: React.FC<HeaderProps> = ({ date }) => {
  return (
    <header className='header'>
      <div className='container'>
        <h3 className='header__brand'>P-Hero Nasa Facts</h3>
        <DatePicker
          className='custom-date-picker'
          onChange={() => console.log('date')}
          selected={date}
        />
      </div>
    </header>
  );
};

export default Header;
