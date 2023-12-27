const Filter = ({showFilter, handleFilterChange}) => {
    return (
        <>
            <label>Filter shown with</label>
            <input value={showFilter}
                onChange={handleFilterChange} />
        </>
    )
}

export default Filter