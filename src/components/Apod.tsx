import React from 'react';

import Button from './Button';
import { FAVORITES } from '../store/types/index';
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

const Apod: React.FC<ApodProps> = ({ data }) => {
  // if (!data) return <Loader />;

  const toggleFavorite = (data: any) => {
    let favorites: object[] = [];
    // check get item is the store
    let favoritesStore = localStorage.getItem(FAVORITES);

    if (favoritesStore === null) {
      alert('Store Empty');
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
        alert('Item Favorited');
      } else {
        //  remove from favorite
        favorites.splice(found, 1);
        localStorage.setItem(FAVORITES, JSON.stringify(favorites));
        alert('Items removed');
      }
    }
  };

  return (
    <div className='container-fluid'>
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
              <Button classes='button--prev cursor-pointer'>Prev Day</Button>
              <Button classes='button--next cursor-pointer'>Next Day</Button>
              {/* <Error /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apod;
