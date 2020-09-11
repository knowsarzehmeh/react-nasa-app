import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { startFetchApod } from './store/actions/apod';

import Header from './components/Header';
import Apod from './components/Apod';

import './styles/App.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from './components/Loader';

function App(props: any) {
  let [date, setDate] = useState(new Date()),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  const addZeros = (num: number): string =>
    num < 10 ? `0${num}` : num.toString();

  const today: string = `${year}-${addZeros(month)}-${addZeros(day)}`;

  useEffect(() => {
    props.fetchApod(today);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.apod && props.apod.error) {
    return <Loader />;
  } else {
    return (
      <div>
        <Header date={date} setDate={setDate} />
        <Apod data={props.apod.data} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  apod: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchApod: (date?: string) => dispatch(startFetchApod(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
