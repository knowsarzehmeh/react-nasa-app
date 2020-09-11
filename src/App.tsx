import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { startFetchApod } from './store/actions/apod';

import Header from './components/Header';
import Apod from './components/Apod';

import './styles/App.scss';

function App(props: any) {
  let date = new Date(),
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

  return (
    <div>
      <Header />
      <Apod data={{}} />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  apod: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchApod: (date?: string) => dispatch(startFetchApod(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
