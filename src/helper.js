export const splitWord = (word) => word.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, word[0].toUpperCase());
export const descriptionLength = (description) => description.slice(0, 150);
export const getProfilePicURL = (profilePic) => process.env.REACT_APP_PROFILE_URL + profilePic;
export const getImageURL = (image) => process.env.REACT_APP_IMAGE_URL + image;
