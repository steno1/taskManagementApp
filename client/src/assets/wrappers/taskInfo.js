import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    width: 100%;
    padding:3px 8px 3px 0px;
  }

  .Description {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: end;
    width: 100px;
    height: 30px;
   
  }

  @media (max-width: 767px) { /* Adjust the breakpoint as needed */
      
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    width: 100%;
    padding:2px 6px 2px 0px;
    
    
  }



    }

`
export default Wrapper
