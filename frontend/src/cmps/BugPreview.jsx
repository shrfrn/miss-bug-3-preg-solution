export function BugPreview({ bug }) {
    return (
        <article >
            <h4>{bug.title}</h4>
            <p>Severity: <span>{bug.severity}</span></p>
            <p>owner: <span>{bug.owner?.fullname}</span></p>
        </article>
    )
}