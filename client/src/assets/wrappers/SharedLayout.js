import styled from 'styled-components';

// Define a styled component named 'Wrapper' using styled-components.
// This component represents a section element and contains styles for a dashboard layout.
const Wrapper = styled.section`
  // Styles for the dashboard container, which is a grid container.
  .dashboard {
    // Display the child elements as a grid.
    display: grid;

    // The grid has a single column that takes up the full available width.
    grid-template-columns: 1fr;
  }

  // Styles for the dashboard page container.
  .dashboard-page {
    // Set the width of the dashboard page container to 90% of the viewport width (vw).
    width: 90vw;

    // Center the dashboard page container horizontally by setting the left and right margins to 'auto'.
    margin: 0 auto;

    // Add padding to the top and bottom of the dashboard page container.
    padding: 2rem 0;
  }

  // Media query for screens with a minimum width of 992 pixels.
  @media (min-width: 992px) {
    // Adjust the layout for larger screens.

    // In the dashboard container, create a two-column grid layout.
    // The first column will be automatically sized to fit its content (auto) while the second column will take up the remaining space (1fr).
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    // For the dashboard page container, set its width to 90% of the available space within the second grid column.
    .dashboard-page {
      width: 90%;
      
    }
  }
`;

// Export the 'Wrapper' component as the default export.
export default Wrapper;
