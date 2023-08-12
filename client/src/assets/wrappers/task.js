// Import the styled-components library

import styled from 'styled-components';

// Create a styled component called Wrapper using the styled-component library
const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  
  /* Styling for the header section */
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    background-color: #E4DCCF;
    grid-template-columns: auto 1fr;
    align-items: center;
    

    /* Styling for the title in the header */
    h5 {
      letter-spacing: 0;
    }
  }

  /* Styling for the main icon */
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: #0B666A;
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }

  /* Styling for the information section */
  .info {
    word-wrap: break-word;
    word-break: break-all;

    /* Styling for title within the information section */
    h5 {
      margin-bottom: 0.25rem;
    }

    /* Styling for paragraphs within the information section */
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }

  /* Status-specific styling */
  .InProgress {
    background: #fcefc7;
    color: #e9b949;
  }
  .Completed {
    background: #e0e8f9;
    color: #647acb;
  }
  .Abandoned {
    color: #d66a6a;
    background: #ffeeee;
  }

  /* Styling for the content section */
  .content {
    overflow: hidden;
    padding: 1rem 1.5rem 1rem 1rem;
  }

  /* Styling for the content center section (responsive grid layout) */
  .content-center {
    margin-right: 0;
    display: grid;
    width:70%;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    /* Responsive layout adjustments */
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr;
    }
  }

  /* Styling for the description section */
  .description {
    background-color: #CCEEBC;
    color: black;
    width: 145%;
    margin-top: 5px;
    margin-right: 0;
    word-wrap: break-word;
    word-break: break-all;
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    padding: 10px;
    display: block;
    white-space: pre-line;
  }

  /* Styling for the status section */
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }

  /* Styling for the footer section */
  footer {
    margin-top: 1rem;
  }

  /* Styling for edit and delete buttons */
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }

  /* Actions visibility on hover */
  &:hover .actions {
    visibility: visible;
  }

  /* Media query adjustments for mobile layout */
  @media (max-width: 700px) {
    .description {
      color: black;
      word-wrap: break-word;
      width: 100%;
      background-color: #CCEEBC;
      padding: 10px;
      /* Adjust grid columns for better mobile layout */
      grid-template-columns: 1fr;
    }
    .content-center{
      width:100%
    }
  }
`;

// Export the styled component Wrapper
export default Wrapper;
