import { createLogic } from 'redux-logic';
import { LOAD_DEFAULT_IMAGES, LoadDefaultImagesSuccess, LOAD_DEFAULT_IMAGES_FAILED, LoadDefaultImagesFailed  } from './action';

const customData = require('./../../assets/data.json');

export const createImagePickerLogic = createLogic({
  type: LOAD_DEFAULT_IMAGES,
  latest: true,
  async process({ action }, dispatch, done) {
    try {
      let url = 'https://dog.ceo/api/breeds/image/random';
     
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then(async (responseJson) => {
          if (responseJson) {
            dispatch(LoadDefaultImagesSuccess(customData));
            done();
          } else {
            dispatch(LoadDefaultImagesFailed(null));
            done();
          }
          done();
        })
        .catch((error) => console.log(error));
    } catch (error) {
      done();
    }
  }
})

export default [createImagePickerLogic];

