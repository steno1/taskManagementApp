
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'; 

import React from 'react';
import Wrapper from '../assets/wrappers/PageBtnContainer'; 
import { useAppContext } from '../context/appContext'; 

const PageBtnContainer = () => {

  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
 
    if (newPage > numOfPages) {
  
       newPage = 1;
    }

    changePage(newPage);
  }

  const prevPage = () => {
    let newPage = page - 1;
   
    if (newPage < 1) {
      newPage = 1;
    }
 
    changePage(newPage);
  }

  return (
    <Wrapper>

      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft /> Prev
      </button>
      <div className='btn-container'>
   
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={
                pageNumber === page ? 'pageBtn-active' : 'pageBtn'
              } 
              onClick={() => changePage(pageNumber)} 
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    
      <button className='prev-btn' onClick={nextPage}>
        Next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
