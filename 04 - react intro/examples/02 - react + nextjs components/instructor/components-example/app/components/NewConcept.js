// Changed this from last commit to use destructuring in input props
export default function NewConcept({ concept }) {
    // This is not a static component; we'll be passing input props
    // and rendering dynamically based on that data.
    return (
        // I can write {inline javascript}   (thanks JSX!)
        <p>In this class, we'll learn: {concept}</p>
    )
}
