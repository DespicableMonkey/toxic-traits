/*
 * TODO: Fill this out with the service layer for your toxic person! Hint: tale a look at user.service.ts and see how that service
 * uses the User model to save and update to the database.
 */
import { ToxicPerson } from '../models/toxicperson.model';

const getAllToxicTraitsFromDB = async () => {
  const toxicPersonList = await ToxicPerson.find({}).exec();
  return toxicPersonList;
};

const createToxicTrait = async (
  firstName: string,
  lastName: string,
  pictureURL: string,
  toxicTraits: [string],
) => {
  const newToxicPerson = new ToxicPerson({
    firstName,
    lastName,
    pictureURL,
    toxicTraits,
  });
  const toxicperson = await newToxicPerson.save();
  return toxicperson;
};

const getToxicTraitByID = async (id: string) => {
  const toxicPerson = await ToxicPerson.findById(id).exec();
  return toxicPerson;
};

const deleteToxicTraitByID = async (id: string) => {
  const toxicPerson = await ToxicPerson.findByIdAndDelete(id).exec();
  return toxicPerson;
};

const updateToxicPersonById = async (
  id: string,
  firstName: string,
  lastName: string,
  pictureURL: string,
  toxicTraits: [string],
) => {
  const toxicPerson = await ToxicPerson.findByIdAndUpdate(id, [
    {
      $set: {
        firstName,
        lastName,
        pictureURL,
        toxicTraits,
      },
    },
  ]).exec();
  return toxicPerson;
};

export {
  getAllToxicTraitsFromDB,
  createToxicTrait,
  getToxicTraitByID,
  deleteToxicTraitByID,
  updateToxicPersonById,
};
