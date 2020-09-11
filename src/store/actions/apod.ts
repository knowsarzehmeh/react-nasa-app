import { FETCH_APOD, ERROR } from '../types';

export const fetchApod = (data: object) => ({
  type: FETCH_APOD,
  data,
});

export const throwError = (error: string) => ({
  type: ERROR,
  error,
});

export const startFetchApod = (date: string = '') => async (dispatch: any) => {
  let url: string = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`;

  if (date && date.length > 0) url += `&date=${date}`;

  try {
    let response = await fetch(url);
    response = await response.json();

    console.log(response);
    dispatch(fetchApod(response));
  } catch (error) {
    dispatch(throwError(error.message));
  }
};
