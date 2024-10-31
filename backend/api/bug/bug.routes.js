import express from 'express'
import { addBug, getBug, getBugs, removeBug, updateBug } from './bug.controller.js'
import { log } from '../../middlewares/logger.middleware.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()


router.get('/', log, getBugs)
router.get('/:bugId', log, getBug)
router.delete('/:bugId', requireAuth, removeBug)
router.post('/', requireAuth, addBug)
router.put('/', requireAuth, updateBug)




export const bugRoutes = router