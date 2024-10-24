function Stats({items}) {
    if (!items.length) return (
        <footer className={`stats`}>Start Adding Items</footer>
    )

    const totalItems = items.length
    const packedItems = items.filter(item => item.packed !== false).length
    const percentage = Math.round((packedItems / totalItems) * 100)

    return(
        <>
            <footer className={`stats`}>
                <em>
                    {percentage === 100 ?
                        `You're ready to go` :
                        `You have ${totalItems} items on your list, and you already packed ${packedItems} (${percentage}%)`
                    }
                </em>
            </footer>
        </>
    )
}

export default Stats