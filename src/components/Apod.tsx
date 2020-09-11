import React from 'react';

import Button from './Button';
import Loader from './Loader';

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

  return (
    <div className='container'>
      <aside className='brand-aside'>
        <h3>The Astronomical picture of the day</h3>
      </aside>
      <div className='apod'>
        <Button classes='button--favorite' title='mark as favorite'>
          <i className='fa fa-heart-o' aria-hidden='true'></i> {/* fa-heart */}
        </Button>
        <div className='apod__media'>
          <img src={data && data.url} className='' alt='' />
        </div>

        <div className='apod__details'>
          <h2 className='apod__title'> {data && data.title} </h2>
          <div style={{ position: 'relative' }}>
            <h3 className='apod__copyright'>
              {data && data.copyright} - <span>{data && data.date}</span>
            </h3>
            <p className='apod__explanation'>{data && data.explanation}</p>
            <div className='controls'>
              <Button classes='button--prev'>Prev Day</Button>
              <Button classes='button--next'>Next Day</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apod;
