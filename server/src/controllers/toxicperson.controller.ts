/*
 * TODO: Fill this out with the controller layer for your toxic person! Hint: Look at how admin.controller.ts
 * works in the controller layer, how it deals with the interface of IUser, and how it utilizes functions from the service layer.
 */

import express from 'express';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';
import { IToxicPerson } from '../models/toxicperson.model'

import {
  getAllToxicTraitsFromDB,
  getToxicTraitByName,
  createToxicTrait,
  getToxicTraitByID,
  deleteToxicTraitByID,
  updateToxicPersonById,
} from '../services/toxicperson.service';


const getAllToxicTraits = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    return (
      getAllToxicTraitsFromDB()
        .then((toxicList) => {
          res.status(StatusCode.OK).send(toxicList);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((e) => {
          next(ApiError.internal('Unable to retrieve all toxic traits'));
        })
    );
  };

   function isURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

  const getToxicTraitFromID = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.body
    if(!id) {
        next(
            // ApiError.missingFields(['id'])
            ApiError.badRequest("???" + id)
        );
        return
    }

    return (
        getToxicTraitByID(id)
        .then((toxicTrait) => {
            res.status(StatusCode.OK).send(toxicTrait)
        })
        .catch((e) => {
            next(ApiError.internal("Unable to fetch Toxic Trait by ID"))
        })
    )
  }

  const deleteToxicTraitFromID = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.body
    if(!id) {
        next(
            ApiError.missingFields(['id'])
        );
        return
    }

    return (
        deleteToxicTraitByID(id)
        .then((toxicTrait) => {
            res.status(StatusCode.OK).send(toxicTrait)
        })
        .catch((e) => {
            next(ApiError.internal("Unable to delete Toxic Trait by ID"))
        })
    )
  }

  const makeToxicTrait = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const {firstName, lastName, pictureUrl, toxictraits } = req.body;
    if ( !firstName || !lastName || !pictureUrl || !toxictraits) {
      next(
        ApiError.missingFields(['firstName', 'lastName', 'pictureUrl', 'toxictraits']),
      );
      return;
    }
  
    const nameRegex = /^[a-z ,.'-]+/i;
  
    if (
      !firstName.match(nameRegex) ||
      !lastName.match(nameRegex) ||
      !isURL(pictureUrl) ||
      !(toxictraits instanceof Array) ||
      !(toxictraits.length > 0)
    ) {
      next(ApiError.badRequest('Invalid id, firstname, lastname, picture, or toxic traits.'));
      return;
    }
  
    // Check if user exists
    const existingToxicTrait: IToxicPerson | null = await getToxicTraitByName(firstName, lastName)
    if (existingToxicTrait && 
        existingToxicTrait.firstName.trim().toLowerCase() == firstName.trim().toLowerCase() &&
        existingToxicTrait.lastName.trim().toLowerCase() == firstName.trim().toLowerCase()
        ) {
      next(
        ApiError.badRequest(
          `An account with email ${firstName} and ${lastName} already exists.`,
        ),
      );
      return;
    }
  
    // Create toxic trait
    try {
      const toxicTraits = await createToxicTrait(
        firstName,
        lastName,
        pictureUrl,
        toxictraits
      );
      await toxicTraits!.save()
      res.sendStatus(StatusCode.CREATED);
    } catch (err) {
      next(ApiError.internal('Unable to create Toxic Trait.'));
    }
  };

  const updateToxicPersonFromID = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id, firstName, lastName, pictureUrl, toxictraits } = req.body;
    if (!id || !firstName || !lastName || !pictureUrl || !toxictraits) {
      next(
        ApiError.missingFields(['id', 'firstName', 'lastName', 'pictureUrl', 'toxictraits']),
      );
      return;
    }
  
    const nameRegex = /^[a-z ,.'-]+/i;
  
    if (
      !firstName.match(nameRegex) ||
      !lastName.match(nameRegex) ||
      !isURL(pictureUrl) ||
      !(toxictraits instanceof Array) ||
      !(toxictraits.length > 0)
    ) {
      next(ApiError.badRequest('Invalid firstname, lastname, picture, or toxic traits.'));
      return;
    }
  
    // Check if user exists
    const existingToxicTrait: IToxicPerson | null = await getToxicTraitByID(id)
    if (!existingToxicTrait) {
      next(
        ApiError.badRequest(
          `No Toxic Trait with ID found`,
        ),
      );
      return;
    }
  
    // update toxic trait
    try {
      const toxicTraits = await updateToxicPersonById(
        id,
        firstName,
        lastName,
        pictureUrl,
        toxictraits
      );
      await toxicTraits!.save()
      res.sendStatus(StatusCode.CREATED);
    } catch (err) {
      next(ApiError.internal('Could not update Toxic Trait.'));
    }
  };

  export { getAllToxicTraits, getToxicTraitFromID, deleteToxicTraitFromID, makeToxicTrait, updateToxicPersonFromID }