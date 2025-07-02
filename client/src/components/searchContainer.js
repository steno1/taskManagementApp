
import FormRow from './formRow'; 
import FormRowSelect from './FormRowSelect'; 
import React from 'react'; 
import Wrapper from '../assets/wrappers/SearchContainer'; 
import { useAppContext } from '../context/appContext'; 

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    sort,
    sortOptions,
    handleChanges,
    clearFilters,
    statusTypeOption,
    priorityTypeOption,
    priority,
  } = useAppContext();
  
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChanges({
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    clearFilters(); 
  };

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
              
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusTypeOption]}
          />
              
          <FormRowSelect
            labelText='priority'
            name='priority'
            value={priority}
            handleChange={handleSearch}
            list={['all', ...priorityTypeOption]}
          />


          <FormRowSelect
            labelText='sort'
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={['all', ...sortOptions]}
          />

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit} 
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
