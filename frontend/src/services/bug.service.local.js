import { storageService } from './async-storage.service.js'

export const bugService = {
    query,
    getById,
    save,
    remove,
}
const STORAGE_KEY = 'bugDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
}

function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
}

function save(bug) {
    const method = (bug._id) ? 'put' : 'post'
    return storageService[method](STORAGE_KEY, bug)
}