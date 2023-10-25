/*
 * TODO: Fill this out with the routes layer for your toxic person! Hint: tale a look at admin.route.ts and see how that file
 * defines the routes that will be hit by the backend, and which functions they call from the controller layer to perform the
 * desired function.
 */

import Router from 'express'
import {
getAllToxicTraits, getToxicTraitFromID, deleteToxicTraitFromID, makeToxicTrait, updateToxicPersonFromID
} from '../controllers/toxicperson.controller'

const router = Router()

router.get('/get-all', getAllToxicTraits)

router.post('/get-trait-from-id', getToxicTraitFromID)

router.post('/delete', deleteToxicTraitFromID)

router.post('/create', makeToxicTrait)

router.post('/update', updateToxicPersonFromID)

export default router;