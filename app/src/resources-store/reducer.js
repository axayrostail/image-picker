import {
  LOAD_DEFAULT_IMAGES,
  LOAD_DEFAULT_IMAGES_SUCCESS,
  LOAD_DEFAULT_IMAGES_FAILED,
} from "./action";

const initialState = {
  images: {},
};

const ImagePickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DEFAULT_IMAGES: {
      return { ...state };
    }

    case LOAD_DEFAULT_IMAGES_SUCCESS: {
      return { ...state, images: action.payload };
    }

    case LOAD_DEFAULT_IMAGES_FAILED: {
      return { ...state , images: {}};
    }

    default:
      return state;
  }
};

export default ImagePickerReducer;
