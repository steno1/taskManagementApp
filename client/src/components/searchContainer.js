// Importing necessary components and dependencies

import FormRow from './formRow'; // Importing a form row component for text input
import FormRowSelect from './FormRowSelect'; // Importing a form row component for select input
import React from 'react'; // Importing React
import Wrapper from '../assets/wrappers/SearchContainer'; // Importing a wrapper component
import { useAppContext } from '../context/appContext'; // Importing the app context for state management

// Defining the SearchContainer component
const SearchContainer = () => {
  // Extracting necessary data and functions from the app context using the useAppContext hook
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChanges,
    clearFilters,
    statusTypeOption,
    priorityTypeOption,
    priority,
  } = useAppContext();

  // Function to handle changes in the search inputs
  const handleSearch = (e) => {
    if (isLoading) return; // If loading, prevent further changes
    handleChanges({
      name: e.target.name,
      value: e.target.value,
    });
  };

  // Function to handle form submission (clearing filters)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    clearFilters(); // Call the clearFilters function from the context
  };

  // Rendering the search form
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
          {/* FormRow component for text input */}
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />

          {/* FormRowSelect component for select input (status) */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusTypeOption]}
          />

          {/* FormRowSelect component for select input (priority) */}
          <FormRowSelect
            labelText='priority'
            name='priority'
            value={priority}
            handleChange={handleSearch}
            list={['all', ...priorityTypeOption]}
          />

          {/* FormRowSelect component for select input (sort) */}
          <FormRowSelect
            labelText='sort'
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={['all', ...sortOptions]}
          />

          {/* Button to clear filters */}
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading} // Disable the button if loading
            onClick={handleSubmit} // Handle the button click
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

// Exporting the SearchContainer component as the default export
export default SearchContainer;
