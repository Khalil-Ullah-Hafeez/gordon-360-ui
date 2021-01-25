/**
 * Housing API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module housing
 */

import http from './http';

/**
 * @global
 * @typedef boolean
 * @property {status}
 *
 */

/**
 * @typedef { import('./user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * @global
 * @typedef ApartmentChoice
 * @property {String} HallName The name of the apartment hall
 * @property {Number} HallRank The rank assigned to this hall by the user
 */
// NOTE: Properties 'HallName' and 'HallRank' must be capitalized to match the backend

/**
 * Save the current state of the application to the database
 * @param {Number} applicationID the application ID number if it is known, else it is -1
 * @param {String} editorUsername the student username of the person filling out the application
 * @param {StudentProfileInfo[]} applicants Array of StudentProfileInfo objects
 * @param {ApartmentChoice[]} apartmentChoices Array of ApartmentChoice objects
 * @return {Promise.<Number>} Application's ID number
 */
const saveApartmentApplication = async (
  applicationID,
  editorUsername,
  applicants,
  apartmentChoices,
) => {
  let applicationDetails = {
    AprtAppID: applicationID,
    Username: editorUsername,
    Applicants: applicants.map((profile) => profile.AD_Username),
    ApartmentChoices: apartmentChoices,
  };
  return await http.post(`housing/save/`, applicationDetails);
};

/**
 * Update the application editor of the application to the database
 * @param {Number} applicationID the application ID number
 * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
 * @return {Promise.<Boolean>} Status of whether or not the operation was successful
 */
const changeApplicationEditor = async (applicationID, newEditorUsername) => {
  let newModifierDetails = {
    AprtAppID: applicationID,
    Username: newEditorUsername,
  };
  return await http.post(`housing/change-modifier/`, newModifierDetails);
};

export default {
  saveApartmentApplication,
  changeApplicationEditor,
};
