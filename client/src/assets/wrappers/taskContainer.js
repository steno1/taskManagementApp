import styled from 'styled-components';

const Wrapper = styled.section`

  margin-top: 4rem;
  
  h2 {
    text-transform: none;
  }
  
  & > h5 {
    font-weight: 700;
  }
  
  .tasks {
    display: grid;
    
    grid-template-columns: 1fr;
   
    gap: 2rem; /* Adjusted row-gap to gap for consistency */
    
  }
  
  @media (min-width: 992px) {
    .tasks {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default Wrapper;
