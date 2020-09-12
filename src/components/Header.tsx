import React, { useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker';

type HeaderProps = {
  date: Date;
  setDate: (initalState: Date | ((previousState: Date) => Date)) => void;
};

const Header: React.FC<HeaderProps> = ({ date, setDate }) => {
  const [maxDate, setMaxDate] = useState('');
  // const myDate:any = useRef();
  useEffect(() => {
    disableFutureDate();
  }, []);

  const disableFutureDate = () => {
    let dtToday = new Date();
    let month: any = dtToday.getMonth() + 1;
    let day: any = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10) month = '0' + month.toString();
    if (day < 10) day = '0' + day.toString();
    let maxDate = year + '-' + month + '-' + day;
    setMaxDate(maxDate);
  };

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
            // ref={myDate}
            max={maxDate}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
