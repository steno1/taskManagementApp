// Importing necessary components and dependencies

import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'; // Importing icons for pagination

import React from 'react'; // Importing React
import Wrapper from '../assets/wrappers/PageBtnContainer'; // Importing a wrapper component
import { useAppContext } from '../context/appContext'; // Importing the app context for state management

// Defining the PageBtnContainer component
const PageBtnContainer = () => {
  // Extracting necessary data and functions from the app context using the useAppContext hook
  const { numOfPages, page, changePage } = useAppContext();

  // Generating an array of page numbers based on the numOfPages
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  // Function to navigate to the next page
  const nextPage = () => {
    let newPage = page + 1;
    // Ensure that the new page does not exceed the total number of pages
    if (newPage > numOfPages) {
     // newPage = numOfPages; // Set the new page to the last page if exceeding
      // Alternatively, you can loop back to the first page:
       newPage = 1;
    }
    // Calling the changePage function from the context to update the page state
    changePage(newPage);
  }

  // Function to navigate to the previous page
  const prevPage = () => {
    let newPage = page - 1;
    // Ensure that the new page is not less than the first page
    if (newPage < 1) {
      newPage = 1; // Set the new page to the first page if less
      // Alternatively, you can loop to the last page:
      // newPage = numOfPages;
    }
    // Calling the changePage function from the context to update the page state
    changePage(newPage);
  }

  // Rendering the pagination component
  return (
    <Wrapper>
      {/* Button for navigating to the previous page */}
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft /> Prev
      </button>
      <div className='btn-container'>
        {/* Mapping through the array of page numbers to create buttons */}
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={
                pageNumber === page ? 'pageBtn-active' : 'pageBtn'
              } // Applying different styles for the active page button
              onClick={() => changePage(pageNumber)} // Clicking the button updates the page state
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      {/* Button for navigating to the next page */}
      <button className='prev-btn' onClick={nextPage}>
        Next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

// Exporting the PageBtnContainer component as the default export
export default PageBtnContainer;
