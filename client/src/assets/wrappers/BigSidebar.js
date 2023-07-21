import styled from 'styled-components';

// Define a styled component named 'Wrapper' using styled-components.
// This component represents an aside element and its styles will be conditionally applied based on the media query.
const Wrapper = styled.aside`
  // By default, the aside element will not be displayed on the page.
  display: none;

  // Media query for screens with a minimum width of 992 pixels.
  @media (min-width: 992px) {
    // When the screen width is at least 992 pixels, the aside element will be displayed as a block.
    display: block;

    // Apply a box-shadow to the right side of the aside element to create a subtle shadow effect.
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

    // Styles for the container element within the aside.
    .sidebar-container {
      // Set the background color to a variable named '--white', which must be defined elsewhere.
      background: var(--white);

      // Ensure that the container takes up at least the full height of the viewport (100% viewport height).
      min-height: 100vh;

      // Set the height of the container to 100%.
      height: 100%;

      // Set the width of the container to 250 pixels.
      width: 250px;

      // Push the container to the left, effectively hiding it off-screen, using a negative margin.
      margin-left: -250px;

      // Apply a smooth transition effect for changes in the container's properties.
      transition: var(--transition);
    }

    // Styles for the content inside the aside.
    .content {
      // Position the content element as sticky, so it sticks to the top of the aside when scrolling down.
      position: sticky;
      top: 0;
    }

    // Class to toggle the visibility of the sidebar by adjusting the margin-left property.
    // When this class is applied, the sidebar will slide into view from the left.
    .show-sidebar {
      margin-left: 0;
    }

    // Styles for the header element inside the sidebar.
    header {
      // Set the height of the header to 5 rem.
      height: 5rem;

      // Display the header as a flex container with items aligned vertically at the center.
      display: flex;
      align-items: center;

      // Add padding to the left of the header content.
      padding-left: 2.5rem;

      // Add some top padding to the header content.
      padding-top: 10px;
    }

    // Styles for the navigation links inside the sidebar.
    .nav-links {
      // Add some top padding to the navigation links container.
      padding-top: 2rem;

      // Display the navigation links as a column, stacking them vertically.
      display: flex;
      flex-direction: column;
    }

    // Styles for each individual navigation link.
    .nav-link {
      // Display the navigation link as a flex container with items aligned vertically at the center.
      display: flex;
      align-items: center;

      // Set the text color to a variable named '--grey-500', which must be defined elsewhere.
      color: var(--grey-500);

      // Add some padding to the top and bottom of each navigation link.
      padding: 1rem 0;

      // Add padding to the left of each navigation link to create an indentation.
      padding-left: 2.5rem;

      // Transform the text to capitalize the first letter of each word.
      text-transform: capitalize;

      // Apply a smooth transition effect for changes in the link's properties.
      transition: var(--transition);
    }

    // Styles for the navigation links when hovered.
    .nav-link:hover {
      // Change the background color to a variable named '--grey-50' on hover, creating a highlight effect.
      background: var(--grey-50);

      // Increase the left padding when the link is hovered, creating a visual shift.
      padding-left: 3rem;

      // Change the text color to a variable named '--grey-900' on hover.
      color: var(--grey-900);
    }

    // Styles for the icon inside each navigation link when hovered.
    .nav-link:hover .icon {
      // Change the color of the icon to a variable named '--primary-500' on hover.
      color: var(--primary-500);
    }

    // Styles for the active navigation link.
    .active {
      // Change the text color to a variable named '--grey-900' when the link is active.
      color: var(--grey-900);
    }

    // Styles for the icon inside the active navigation link.
    .active .icon {
      // Change the color of the icon to a variable named '--primary-500' when the link is active.
      color: var(--primary-500);
    }
  }
`;

// Export the 'Wrapper' component as the default export.
export default Wrapper;
