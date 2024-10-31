// Car CRUDL API
import { authService } from '../auth/auth.service.js';
import { bugService } from './bug.service.js';

// List
export async function getBugs(req, res) {
    try {
        const filterBy = { txt: req.query.txt || '', ownerId: req.query.ownerId || '' }
        const sortBy = { by: req.query.sortBy || '', sortDir: req.query.sortDir || '' }
        if (req.query.pageIdx) filterBy.pageIdx = req.query.pageIdx
        const bugs = await bugService.query(filterBy, sortBy)
        res.send(bugs)

    } catch (err) {
        res.status(400).send(`Couldn't get bugs`)
    }
}

// Get
export async function getBug(req, res) {
    const { bugId } = req.params
    let visitedBugIds = req.cookies.visitedBugIds || []
    try {
        if (!visitedBugIds.includes(bugId)) visitedBugIds.push(bugId)
        if (visitedBugIds.length > 3) return res.status(401).send('Wait for a bit')

        const bug = await bugService.getById(bugId)
        res.cookie('visitedBugIds', visitedBugIds, { maxAge: 1000 * 60 * 3 })
        res.send(bug)

    } catch (err) {
        res.status(400).send(`Couldn't get bug`)
    }
}

// // Delete
export async function removeBug(req, res) {
    // Replaced with middleware

    // const loggedinUser = authService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot update bug. Must be logged in')

    const { bugId } = req.params

    try {
        await bugService.remove(bugId, req.loggedinUser)
        res.send('Deleted OK')
    } catch (err) {
        res.status(400).send(`Couldn't remove car : ${err}`)
    }
}

// // Save
export async function addBug(req, res) {
    const { bug } = req.body

    // Replaced with middleware
    // const loggedinUser = authService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot add bug. Must be logged in')

    try {
        const savedBug = await bugService.save(bug, req.loggedinUser)
        res.send(savedBug)
    } catch (err) {
        res.status(400).send(`Couldn't save car`)
    }
}

export async function updateBug(req, res) {
    const { bug } = req.body

    // Replaced with middleware
    // const loggedinUser = authService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot update car. Must be logged in')

    try {
        const savedBug = await bugService.save(bug, req.loggedinUser)
        res.send(savedBug)
    } catch (err) {
        res.status(400).send(`Couldn't save bug`)
    }
}