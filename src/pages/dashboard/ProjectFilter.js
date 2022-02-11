const filterList = ['all', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter ({ mode, currentFilter, changeFilter}) {
    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

    return (
        <div className={`project-filter ${mode ? null:'dark'}`}>
            <nav>
                <p>Filter by:</p>
                {filterList.map(f => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active':''}
                    >
                        {f}
                    </button>
                ))}

            </nav>
        </div>
    )
}