import fs from 'fs'
import { utilService } from '../../services/util.service.js'

export const bugService = {
	query,
	getById,
	remove,
	save,
}

const PAGE_SIZE = 5
var gBugs = utilService.readJsonFile('./data/bug.json')

function query(filterBy = { txt: '' }, sortBy = { by: '', sortDir: '' }) {
	const regex = new RegExp(filterBy.txt, 'i')
	let bugs = gBugs.filter(bug => regex.test(bug.title))

	if (filterBy.ownerId) {
		bugs = bugs.filter(bug => bug.owner._id === filterBy.ownerId)
	}

	if (sortBy.by) {
		bugs = _sortBugs(bugs, sortBy)
	}

	if (filterBy.pageIdx !== undefined) {
		const startIdx = filterBy.pageIdx * PAGE_SIZE
		bugs = bugs.slice(startIdx, startIdx + PAGE_SIZE)
	}
	return Promise.resolve(bugs)
}

function save(bug, user) {
	if (bug._id) {
		if (user.isAdmin || user._id === bug.ownerId) {
			const idx = gBugs.findIndex(currBug => currBug._id === bug._id)
			gBugs[idx] = bug
		} else {
			return Promise.reject('edit not available')
		}
	} else {
		bug._id = utilService.makeId()
		bug.createdAt = Date.now()
		bug.owner = user
		gBugs.push(bug)
	}
	/// return promise
	return _saveBugsToFile().then(() => bug)
}

function remove(bugId, user) {
	const idx = gBugs.findIndex(bug => bug._id === bugId)
	const bug = gBugs[idx]

	if (user.isAdmin || user._id === bug.ownerId) {
		gBugs.splice(idx, 1)
		return _saveBugsToFile()
	} else {
		return Promise.reject('Cant remove bug')
	}
}

function getById(bugId) {
	const bug = gBugs.find(bug => bug._id === bugId)
	if (!bug) return Promise.reject('No bug found')
	
    return Promise.resolve(bug)
}

function _sortBugs(bugs, sortBy) {
	console.log('sortBy:', sortBy)
	if (sortBy.by) {
		let sortingFunction
		if (sortBy.by === 'severity') {
			sortingFunction = (bug1, bug2) => bug1.severity - bug2.severity
		} else {
			sortingFunction = (bug1, bug2) => bug1.title.localeCompare(bug2.title)
		}

		bugs = bugs.sort((bug1, bug2) => {
			const result = sortingFunction(bug1, bug2)
			return sortBy.sortDir === '-1' ? -result : result
		})
	}
	return bugs
}

function _saveBugsToFile() {
	return new Promise((resolve, reject) => {
		fs.writeFile('data/bug.json', JSON.stringify(gBugs, null, 2), err => {
			if (err) {
				console.log(err)
				reject('Cannot write to file')
			} else {
				console.log('Wrote Successfully!')
				resolve()
			}
		})
	})
}
