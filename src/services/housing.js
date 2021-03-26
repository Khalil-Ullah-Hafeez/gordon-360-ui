/**
 * Housing API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module housing
 */

import http from './http';
import './user'; // Needed for typedef of StudentProfileInfo

/**
 * @global
 * @typedef boolean
 * @property {status}
 *
 */

/**
 * For some reason this feature works in all the other files, but not in src/services/housing.js
 * // @typedef { import('./user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * @global
 * @typedef ApartmentApplicant
 * @property {StudentProfileInfo} Profile The StudentProfileInfo object representing this applicant
 * @property {String} OffCampusProgram The name of department of this applicant's off-campus program, or 'None'
 */

/**
 * @global
 * @typedef ApplicantPartialInfo
 * @property {String} Username The username of this applicant
 * @property {String} OffCampusProgram The name of department of this applicant's off-campus program, or 'None'
 */

/**
 * Note: Properties 'HallRank' and 'HallName' must be capitalized to match the backend
 * @global
 * @typedef ApartmentChoice
 * @property {Number} HallRank The rank assigned to this hall by the user
 * @property {String} HallName The name of the apartment hall
 */

/**
 * @global
 * @typedef ApplicationDetails
 * @property {Number} AprtAppID Application ID number of this application
 * @property {*} DateSubmitted The date the application was submitted, or null if not yet submitted
 * @property {*} DateModified The date the application was last modified
 * @property {String} Username Username of the primary applicant
 * @property {ApplicantPartialInfo[]} Applicants Array of objects with applicant username and off-campus program
 * @property {ApartmentChoice[]} ApartmentChoices Array of ApartmentChoice objects
 */

/**
 * Check if the current user is authorized to view the housing staff page for applications
 * @return {Promise.<Boolean>} True if the user is authorized to view the housing application staff page
 */
const checkHousingStaff = async () => {
  try {
    return await http.get(`housing/staff`);
  } catch {
    return false;
  }
};

/**
 * Check if a given student is on an existing application from the current semester
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<Number>} Application's ID number
 */
const getCurrentApplicationID = async (username) => {
  let applicationID;
  let err;
  try {
    if (username) {
      applicationID = await http.get(`housing/apartment/${username}/`);
    } else {
      applicationID = await http.get('housing/apartment');
    }
  } catch (e) {
    // handle thrown 404 errors
    if (e.status !== 404) throw e;
    err = e;
    applicationID = false;
    console.log('A 404 code indicates that an application was not found for this applicant');
  }
  // handle "unhandled" requests, `this.status = 404`s, and 404 errors
  var status = (this.status = (err && err.status) || this.status || 404);
  if (status !== 404) return applicationID;
};

/**
 * Save the current state of the application to the database
 * @param {Number} applicationID the application ID number if it is known, else it is -1
 * @param {String} editorUsername the student username of the person filling out the application
 * @param {ApartmentApplicant[]} applicants Array of ApartmentApplicant objects
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
    Applicants: applicants.map((applicant) => applicant.Profile.AD_Username),
    // Applicants: applicants.map((applicant) => { Username: applicant.Profile.AD_Username, OffCampusProgram: applicant.OffCampusProgram }); // This is the correct code for when the backend has been updated expect the off-campus program info
    ApartmentChoices: apartmentChoices,
  };
  if (applicationID === -1) {
    return await http.post(`housing/apartment/save/`, applicationDetails);
  } else {
    return await http.put(`housing/apartment/save/`, applicationDetails);
  }
};

/**
 * Update the application editor of the application to the database
 * @param {Number} applicationID the application ID number
 * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
 * @return {Promise.<Boolean>} Status of whether or not the operation was successful
 */
const changeApartmentAppEditor = async (applicationID, newEditorUsername) => {
  let newEditorDetails = {
    AprtAppID: applicationID,
    Username: newEditorUsername,
  };
  return await http.put(`housing/apartment/change-editor/`, newEditorDetails);
};

/**
 * Get active apartment application for given application ID number
 * @param {String} applicationID the application ID number for the desired application
 * @return {Promise.<ApplicationDetails>} Application details
 */
const getApartmentApplication = async (applicationID) => {
  return await http.get(`housing/apartment/load/${applicationID}/`);
};

export default {
  checkHousingStaff,
  getCurrentApplicationID,
  saveApartmentApplication,
  changeApartmentAppEditor,
  getApartmentApplication,
};
