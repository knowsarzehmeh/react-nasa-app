import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  startFetchApod,
  fetchApodFromLocalStorage,
} from './store/actions/apod';

import { PICOFTHEDAY } from './store/types/index';

import Header from './components/Header';
import Apod from './components/Apod';

import './styles/App.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from './components/Loader';
import Error from './components/Error/Error';
// import Modal from './components/Modal';
import formatDate from './helper/formatDate';

function App(props: any) {
  const [loading, setLoading] = useState(true);
  let [date, setDate] = useState(new Date()),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  const today: string = formatDate(date);

  useEffect(() => {

   loadPictureOfTheDay()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const loadPictureOfTheDay = async () => {
      return await new Promise((resolve)=> {
        resolve(loadPicture());
       }) 
      
  }

   const loadPicture = async () => {
       // load picture of the day from local storage
       let picOfTheDay: any = localStorage.getItem('poftd');

       if (
         picOfTheDay === null ||
         new Date().getDate() !== new Date(today).getDate()
       ) {
         console.log('Fetching From Api...');
         props.fetchApod(today).then((result: any) => {
           if (
             date.getDate() === new Date().getDate() &&
             typeof result !== undefined
           ) {
      localStorage.setItem('poftd', JSON.stringify(result));
      setLoading(false)
             
           }
         });
       } else if (
         new Date().getDate() -
           new Date(JSON.parse(picOfTheDay).date).getDate() ===
         0
       ) {
         console.log('Fetching From Store...');
         picOfTheDay = JSON.parse(picOfTheDay);
     props.fetchFromStore(picOfTheDay);
     setLoading(false)
       }
   }

  const nextDay = () => {
    var day = new Date('Apr 30, 2000');
    console.log(day); // Apr 30 2000

    var nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    console.log(nextDay);
  };
  // props.apod &&  (props.apod.error || !props.apod.data)
//   <Error
//   errorMessage={props.apod.error}
//   onClick={() => window.location.reload()}
//   actionTitle='refresh'
// />

  if (loading) {
    return (
   
       <Loader />
 
    );
  } else {
    return (
      
      <div className='padding-left-right'>
        {
       props.apod &&  (props.apod.error || !props.apod.data) ? 
       <div className='center-flex'>
        <Error
          errorMessage={props.apod.error}
          onClick={() => window.location.reload()}
          actionTitle='refresh'
        />
       </div>
       :
     <>
     <Header date={date} setDate={setDate} />
     <Apod data={props.apod.data} />
    </>
        }
       
      </div> 
    );
  } //
  
}

const mapStateToProps = (state: any) => ({
  apod: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchApod: (date?: string) => dispatch(startFetchApod(date)),
  fetchFromStore: (data: object) => dispatch(fetchApodFromLocalStorage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
