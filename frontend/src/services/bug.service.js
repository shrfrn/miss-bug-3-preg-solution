import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/bug/' :
    '//localhost:3030/api/bug/'
    
export const bugService = {
    query,
    getById,
    save,
    remove
}


function query(filterBy = { txt: '' }, sortBy = {by:'', sortDir:''}) {
    const url = BASE_URL + `?txt=${filterBy.txt || ''}&severity=${filterBy.severity || ''}&ownerId=${filterBy.ownerId || ''}&sortBy=${sortBy.by || ''}&sortDir=${sortBy.sortDir || ''}`
    return axios.get(url).then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId).then(res => res.data)
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId)
}

async function save(bug) {
    // return (bug._id) ? _updateBug(bug) : _addBug(bug)
    const method = bug._id ? 'put' : 'post'
    const { data: savedBug } = await axios[method](BASE_URL,{ bug})
    return savedBug
}

// function _updateBug(bug) {
//     return axios.put(BASE_URL + bug._id, { bug }).then(res => res.data)
// }

// function _addBug(bug) {
//     return axios.post(BASE_URL, { bug }).then(res => res.data)
// }

