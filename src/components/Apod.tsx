import React from 'react';

import Button from './Button';

type ApodProps = {
  data: object;
};

const Apod: React.FC<ApodProps> = () => {
  return (
    <div>
      <div className='container apod'>
        <div>
          <Button classes='button--prev'>Prev Day</Button>
          <Button classes='button--next'>Next Day</Button>
        </div>
        <h2 className='apod__title'>
          Jupiter's Swmimming Storm by{' '}
          <span className='apod__copyright'>Andy Casely </span>
        </h2>
        <div className='apod__media'>
          <img
            src='https://apod.nasa.gov/apod/image/2009/Jupiters_swimmingstormsACasely1024.jpg'
            className=''
            alt=''
          />
        </div>
        <div>
          <p className='apod__explanation'>
            A bright storm head with a long turbulent wake swims across Jupiter
            in these sharp telescopic images of the Solar System's ruling gas
            giant. Captured on August 26, 28, and September 1 (left to right)
            the storm approximately doubles in length during that period.
            Stretching along the jetstream of the planet's North Temperate Belt
            it travels eastward in successive frames, passing the Great Red Spot
            and whitish Oval BA, famous storms in Jupiter's southern hemisphere.
            Galilean moons Callisto and Io are caught in the middle frame. In
            fact, telescopic skygazers following Jupiter in planet Earth's night
            have reported dramatic fast moving storm outbreaks over the past few
            weeks in Jupiter's North Temperate Belt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Apod;
