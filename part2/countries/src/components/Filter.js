// const Filter = ({newFilter, handleFilterChange}) => {
// return <input value={newFilter} onChange={handleFilterChange}></input>;
//
const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
