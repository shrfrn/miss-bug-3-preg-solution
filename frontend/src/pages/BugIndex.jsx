import { BugList } from '../cmps/BugList.jsx'
import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useState, useEffect } from 'react'

export function BugIndex() {

    const [bugs, setBugs] = useState(null)
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [sortBy, setSortBy] = useState({ by: '', sortDir: '' })

    useEffect(() => {
        loadBugs()
    }, [filterBy, sortBy])

    async function loadBugs() {
        try {
            const bugs = await bugService.query(filterBy, sortBy)
            setBugs(bugs)
        } catch (err) {
            console.log('Cannot load bugs')
        }
    }

    function onSetFilterBy({ target }) {
        setFilterBy({ txt: target.value })
    }

    function onSetSortBy({ target }) {
        let field = target.name
        setSortBy({ ...sortBy, [field]: target.value })
    }

    async function onRemoveBug(bugId) {
        try {
            await bugService.remove(bugId)
            setBugs((prevBugs) => prevBugs.filter(bug => bug._id !== bugId))
            showSuccessMsg('Bug removed')
        } catch (err) {
            showErrorMsg('Cannot remove bug')
        }
    }

    async function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity')
        }
        try {
            const savedBug = await bugService.save(bug)
            setBugs(prevBugs => [...prevBugs, savedBug])
        } catch (err) {
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }

        try {
            const savedBug = await bugService.save(bugToSave)
            setBugs(prevBugs=>prevBugs.map(bug => bug._id === savedBug._id ? savedBug : bug))
        } catch (err) {
            showErrorMsg('Cannot update bug')
        }
    }

    return (
        bugs && <div>
            <section className="bugs-header">

                <h2>Bugs App</h2>

                <section className="bug-filter">
                    <input
                        placeholder="Search for bug"
                        type="text"
                        onChange={onSetFilterBy}
                    />

                    <select id="selectOption" name="by" onChange={onSetSortBy}>
                        <option value="">Sort by</option>
                        <option value="severity">severity</option>
                        <option value="title">title</option>
                    </select>

                    <select name="sortDir" onChange={onSetSortBy}>
                        <option value="">sorting order</option>
                        <option value="1">ascending</option>
                        <option value="-1">descending</option>
                    </select>
                    <button onClick={onAddBug}>Add Bug +</button>
                </section>
            </section>

            <BugList
                bugs={bugs}
                onRemoveBug={onRemoveBug}
                onEditBug={onEditBug} />
        </div>
    )
}

