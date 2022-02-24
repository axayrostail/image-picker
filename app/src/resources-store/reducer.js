import {
  LOAD_DEFAULT_IMAGES,
  LOAD_DEFAULT_IMAGES_SUCCESS,
  LOAD_DEFAULT_IMAGES_FAILED,
  SAVE_NEW_IMAGE,
  ADD_TO_GALLERY
} from "./action";

const initialState = {
  images: [],
  selectedImage: {}
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
      return { ...state , images: []};
    }

    case SAVE_NEW_IMAGE: {
      return { ...state, selectedImage: action.payload};
    }

    case ADD_TO_GALLERY: {
      return { ...state, images: [...state.images, action.payload]};
    }

    default:
      return state;
  }
};

export default ImagePickerReducer;
