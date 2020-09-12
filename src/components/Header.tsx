import React, { useEffect, useState } from 'react';
import Button from './Button';
import Card from './Cards';
import Modal from './Modal';
import { FAVORITES } from '../store/types/index';
// import DatePicker from 'react-datepicker';

type HeaderProps = {
  date: Date;
  setDate: (initalState: Date | ((previousState: Date) => Date)) => void;
};

const Header: React.FC<HeaderProps> = ({ date, setDate }) => {
  const [showModal, setShowModal] = useState({ state: false, variant: 'small', message: undefined});
  const [maxDate, setMaxDate] = useState('');
  const [favourites , setFavourites] = useState([]);
  // const myDate:any = useRef();
  useEffect(() => {
    disableFutureDate();
    //@ts-ignore
    setFavourites(localStorage.getItem(FAVORITES))
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

  const handleSetDate = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    const date = new Date(event.target.value);
    console.log('date', date);
    !date ? alert('Date not in the right format') : setDate(date);
  };

  const showFavoriteList = async () => {

 
   //@ts-ignore
    console.log(JSON.parse(favourites))
    // favorites.map(data => <Card title={data.copyright} />)
    setShowModal({
      state: true,
      variant: '',
      message: undefined

    })
  }

  return (
    
    <header className='header'>
       <Modal
        showModal={showModal.state}
        variant={showModal.variant}
        closeModal={() => {
          setShowModal({...showModal, state: false});
        }}
      >  <h2 style={{ color: 'black' }}>{showModal.message}</h2></Modal>
      <div className='container space-between-header'>
        <h3 className='header__brand'>P-Hero Nasa Facts</h3>

        <div className='custom-date-picker'>
          <span>Select Date: </span>
          <input
            type='date'
            // ref={myDate}
            max={maxDate}
            onChange={(e) => handleSetDate(e)}
          /> <Button
          ClickHandler={() => showFavoriteList()}
          classes='button--mini margin-left-5'
          title='view all favourites padding-left-right'
        >
          <i className='fa fa-eye my-auto' aria-hidden='true'>View All Favourites</i> {/* fa-heart */}
        </Button>


        </div>

       
      </div>
    </header>
  );
};

export default Header;
