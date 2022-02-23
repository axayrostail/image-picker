export const LOAD_DEFAULT_IMAGES = 'LOAD_DEFAULT_IMAGES';
export const LOAD_DEFAULT_IMAGES_SUCCESS = 'LOAD_DEFAULT_IMAGES_SUCCESS';
export const LOAD_DEFAULT_IMAGES_FAILED = 'LOAD_DEFAULT_IMAGES_FAILED';


export const LoadDefaultImages = () => ({
    type: LOAD_DEFAULT_IMAGES
});

export const LoadDefaultImagesSuccess = (images) => ({
    type: LOAD_DEFAULT_IMAGES_SUCCESS,
    payload: images
});

export const LoadDefaultImagesFailed = (error) => ({
    type: LOAD_DEFAULT_IMAGES_FAILED,
    payload: error
});
