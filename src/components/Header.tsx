import React, { useEffect, useState } from 'react';
import Button from './Button';
import Card from './Cards';
import Modal from './Modal';
import { FAVORITES } from '../store/types/index';
// import DatePicker from 'react-datepicker';

type HeaderProps = {
  date: Date;
  setDate: (initalState: Date | ((previousState: Date) => Date)) => void;
  disableButton: boolean;
  setDisabledButton: Function;
};

const Header: React.FC<HeaderProps> = ({
  date,
  setDate,
  setDisabledButton,
}) => {
  const [maxDate, setMaxDate] = useState('');
  const [showModal, setShowModal] = useState({ state: false, variant: 'small', type:'', message: [<></>]});
  // const [favourites , setFavourites] = useState([]);
  // const myDate:any = useRef();
  useEffect(() => {
    disableFutureDate();
    //@ts-ignore
    // setFavourites(JSON.parse(localStorage.getItem(FAVORITES)))
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
    if (new Date()) {
      setDisabledButton(true);
    }
    setDate(date);
  };

  const showFavoriteList = async () => {

    //@ts-ignore
    const favourites = JSON.parse(localStorage.getItem(FAVORITES))
    if(favourites === null) return alert("You have no favourites")
    setShowModal({
      state: true,
      variant: '',
      type:'',
      message: favourites.map((data:any) => <Card key={data.title} title={data.title} description={data.explanation} media_type={data.media_type} url={data.url} data={data}/>)

    })
  }

  const showClearDIalog = () => {
    setShowModal({
      state: true,
      variant: '',
      type:'dialog',
      message: []
    })
  }

  const clearFavoriteList = () => {
   
    localStorage.removeItem(FAVORITES)
    setShowModal({
      state: false,
      variant: '',
      type:'dialog',
      message: []
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
      >  {showModal.type === 'dialog' ? 
      
      <div className=''>
        <h3>Are you sure you want to clear your favourites</h3>
        <Button
         key={1}
          ClickHandler={(e) => { clearFavoriteList()}}
          classes='button--mini margin-left-5'
          title='view all favourites padding-left-right'
        >
          <i className='fa fa-eye my-auto' aria-hidden='true'> {" " } Yes</i> {/* fa-heart */}
        </Button>

       <Button
        key={2}
          ClickHandler={() => showClearDIalog()}
          classes='button--mini margin-left-5'
          title='view all favourites padding-left-right'
        >
          <i className='fa fa-eye my-auto' aria-hidden='true'> {" " } No</i> {/* fa-heart */}
        </Button>
      </div> :
      
      <div style={{ display: 'flex' , flexWrap:'wrap' }}>{showModal.message}</div>}
      </Modal>
      <div className='container space-between-header'>
        <h3 className='header__brand'>P-Hero Nasa Facts</h3>

        <div className='custom-date-picker'>
          <span>Select By Date: </span>
          <input
            type='date'
            // ref={myDate}
            max={maxDate}
            onChange={(e) => handleSetDate(e)}
          />
          <Button
          key={3}
          ClickHandler={() => showFavoriteList()}
          classes='button--mini margin-left-5'
          title='view all favourites padding-left-right'
        >
          <i className='fa fa-eye my-auto' aria-hidden='true'> {" " } View All Favourites</i> {/* fa-heart */}
        </Button>

        <Button
        key={4}
          ClickHandler={() => showClearDIalog()}
          classes='button--mini margin-left-5'
          title='view all favourites padding-left-right'
        >
          <i className='fa fa-window-close-o my-auto' aria-hidden='true'> {" " }Clear All Favourites</i> {/* fa-heart */}
        </Button>


          {/* <input type='date' max={maxDate} onChange={(e) => handleSetDate(e)} /> */}
        </div>

       
      </div>
    </header>
  );
};

export default Header;
