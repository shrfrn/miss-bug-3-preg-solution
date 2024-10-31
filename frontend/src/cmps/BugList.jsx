import { BugPreview } from "./BugPreview.jsx"
import { Link } from "react-router-dom";


export function BugList({ bugs, onRemoveBug, onEditBug }) {

    return (
        < ul className="bug-list" >
            {
                bugs.map(bug => {
                    return (
                        <li className="bug-preview" key={bug._id}>
                            < BugPreview bug={bug} />
                            <div className="actions">
                                <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
                                <button onClick={() => onRemoveBug(bug._id)}>x</button>
                                <button onClick={() => onEditBug(bug)}>Edit</button>
                            </div>
                        </li>
                    )
                })
            }
        </ul >
    )
}

