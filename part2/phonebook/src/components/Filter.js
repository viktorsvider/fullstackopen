const Filter = ({ newFilter, handleNewFilterChange }) => {
  return (
    <div>
      filter shown with
      <input value={newFilter} onChange={handleNewFilterChange} />
    </div>
  );
};

export default Filter;
