import React from 'react';
import DatePicker from 'react-datepicker';

type HeaderProps = {
  date: Date;
  setDate: (initalState: Date | ((previousState: Date) => Date)) => void;
};

const Header: React.FC<HeaderProps> = ({ date, setDate }) => {
  return (
    <header className='header'>
      <div className='container space-between-header'>
        <h3 className='header__brand'>P-Hero Nasa Facts</h3>
        {/* <DatePicker
          className='custom-date-picker'
          onChange={() => console.log('date')}
          selected={date}
        /> */}
        <div className='custom-date-picker'>
          <span>Select Date: </span>
          <input
            type='date'
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
