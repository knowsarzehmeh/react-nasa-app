import React, { useEffect, useState } from 'react';

import Button from './Button';
import { FAVORITES } from '../store/types/index';
import Modal from './Modal';
import { startFetchApod } from '../store/actions/apod';
import { connect } from 'react-redux';

import formatDate from '../helper/formatDate';
// import Loader from './Loader';
// import Error from './Error/Error';

type ApodProps = {
  data: {
    title: string;
    copyright: string;
    date: string;
    media_type: string;
    url: string;
    hdurl: string;
    explanation: string;
  };
};

const Apod: React.FC<ApodProps> = ({ data, ...props }) => {
  // if (!data) return <Loader />;
  const [showModal, setShowModal] = useState({
    state: false,
    variant: 'small',
    message: '',
  });

  const [queryDate, setQueryDate] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const checkDateDiff = () => {
    const date = new Date(queryDate);
    const today = new Date();
    if (!queryDate && today) {
      setDisableButton(true);
    } else if (today.getDate() === date.getDate()) {
      setDisableButton(true);
    }
  };

  useEffect(() => {
    checkDateDiff();
  }, [queryDate]);

  const toggleFavorite = (data: any) => {
    let favorites: object[] = [];
    // check get item is the store
    let favoritesStore = localStorage.getItem(FAVORITES);

    if (favoritesStore === null) {
      favorites.push(data);
      localStorage.setItem(FAVORITES, JSON.stringify(favorites));
    } else {
      // item in the favorite store
      const storeData: string | null = localStorage.getItem(FAVORITES);

      favorites = storeData !== null && JSON.parse(storeData);

      // if item exist in the store
      const found: number = favorites.findIndex(
        (item: any) => item.title === data.title || item.url === data.url
      );

      // if item not in the store
      if (found === -1) {
        favorites.push(data);
        localStorage.setItem(FAVORITES, JSON.stringify(favorites));
        setShowModal({
          state: true,
          variant: 'small',
          message: 'Marked as Favourite',
        });
      } else {
        //  remove from favorite
        favorites.splice(found, 1);
        localStorage.setItem(FAVORITES, JSON.stringify(favorites));
        setShowModal({
          state: true,
          variant: 'small',
          message: 'Unmarked as Favourite',
        });
      }
    }
  };

  const loadFromPreviousDay = () => {
    let day: number = new Date().getDate();

    if (!queryDate) {
      day -= 1;
      day = new Date().setDate(day);
    } else {
      const prevDay = new Date(queryDate).getDate();
      day = prevDay - 1;
      day = new Date().setDate(day);
    }
    const date = formatDate(new Date(day));
    setQueryDate(date);
    setDisableButton(false);
    (props as any).queryApod(date);
  };

  const loadFromNextDay = () => {
    let today: Date = new Date();
    let day: number = today.getDate();

    checkDateDiff();

    if (!queryDate) {
      day += 1;
      day = new Date().setDate(day);
    } else {
      const nextDay = new Date(queryDate).getDate();
      day = nextDay + 1;
      day = new Date().setDate(day);
    }
    const date = formatDate(new Date(day));
    setQueryDate(date);
    (props as any).queryApod(date);
  };

  return (
    <div className='container-fluid'>
      <Modal
        showModal={showModal.state}
        variant={showModal.variant}
        closeModal={() => {
          setShowModal({ ...showModal, state: false });
        }}
      >
        <h2 style={{ color: 'black' }}>{showModal.message}</h2>
      </Modal>
      <aside className='brand-aside'>
        <h3>The Astronomical picture of the day</h3>
      </aside>
      <div className='apod'>
        <Button
          ClickHandler={() => toggleFavorite(data)}
          classes='button--favorite'
          title='mark as favorite'
        >
          <i className='fa fa-heart-o' aria-hidden='true'></i> {/* fa-heart */}
        </Button>
        <div className='apod__media col-7'>
          {data && data.media_type === 'image' ? (
            <img src={data.url} className='media' alt='' />
          ) : (
            <iframe
              title={data.title}
              src={data.url}
              frameBorder='0'
              // gesture="media"
              allow='encrypted-media'
              allowFullScreen
              className='media'
            />
          )}
        </div>

        <div className='apod__details col-4'>
          <h2 className='apod__title'> {data && data.title} </h2>
          <div style={{ position: 'relative' }}>
            <h3 className='apod__copyright'>
              {data && data.copyright} - <span>{data && data.date}</span>
            </h3>
            <p className='apod__explanation'>{data && data.explanation}</p>
            <div className='controls'>
              <Button
                ClickHandler={loadFromPreviousDay}
                classes='button--prev cursor-pointer'
              >
                Prev Day
              </Button>
              <Button
                disabled={disableButton}
                ClickHandler={loadFromNextDay}
                classes='button--next cursor-pointer'
              >
                Next Day
              </Button>
              {/* <Error /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  queryApod: (date?: string) => dispatch(startFetchApod(date)),
});

export default connect(undefined, mapDispatchToProps)(Apod);
