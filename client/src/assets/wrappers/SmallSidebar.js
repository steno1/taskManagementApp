import styled from 'styled-components';

// Define a styled component named 'Wrapper' using styled-components.
// This component represents an aside element and its styles will be conditionally applied based on the media query.
const Wrapper = styled.aside`
  // Media query for screens with a minimum width of 992 pixels.
  @media (min-width: 992px) {
    // When the screen width is at least 992 pixels, the aside element will be hidden (not displayed).
    display: none;
  }

  // Styles for the header element inside the aside.
  header {
    // Set the height of the header to 80 pixels.
    height: 80px;
  }

  // Styles for the sidebar container.
  .sidebar-container {
    // Position the sidebar container as fixed to cover the entire viewport.
    position: fixed;
    inset: 0;

    // Set the background color of the sidebar container to a semi-transparent black.
    background: rgba(0, 0, 0, 0.7);

    // Center the contents of the sidebar container both horizontally and vertically.
    display: flex;
    justify-content: center;
    align-items: center;

    // Set a z-index of -1 to place the sidebar container below other elements on the page.
    z-index: -1;

    // Set the initial opacity of the sidebar container to 0, making it transparent.
    opacity: 0;

    // Apply a smooth transition effect for changes in the container's properties.
    transition: var(--transition);
  }

  // Class to toggle the visibility of the sidebar by adjusting the z-index and opacity properties.
  // When this class is applied, the sidebar will be brought to the front and become visible.
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }

  // Styles for the content inside the aside.
  .content {
    // Set the background color of the content area to a variable named '--white', which must be defined elsewhere.
    background: var(--white);

    // Set the width of the content area to a variable named '--fluid-width', which must be defined elsewhere.
    width: var(--fluid-width);

    // Set the height of the content area to 95% of the viewport height (vh).
    height: 95vh;

    // Apply a border radius to the content area to create rounded corners.
    border-radius: var(--borderRadius);

    // Add padding to the top and bottom (4rem) and left and right (2rem) of the content area.
    padding: 4rem 2rem;

    // Position the content area relative to its normal flow position.
    position: relative;

    // Center the contents of the content area both horizontally and vertically.
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  // Styles for the close button inside the content area.
  .close-btn {
    // Position the close button absolutely within the content area, 10 pixels from the top and left edges.
    position: absolute;
    top: 10px;
    left: 10px;

    // Set the background of the close button to transparent, making it invisible.
    background: transparent;

    // Set the border color of the close button to transparent, removing any visible border.
    border-color: transparent;

    // Set the font size of the close button to 2rem.
    font-size: 2rem;

    // Set the color of the close button to a variable named '--red-dark', which must be defined elsewhere.
    color: var(--red-dark);

    // Use the 'cursor: pointer' property to indicate that the close button is clickable.
    cursor: pointer;
  }

  // Styles for the navigation links inside the content area.
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

    // Transform the text to capitalize the first letter of each word.
    text-transform: capitalize;

    // Apply a smooth transition effect for changes in the link's properties.
    transition: var(--transition);
  }

  // Styles for the navigation links when hovered.
  .nav-link:hover {
    // Change the text color to a variable named '--grey-900' on hover.
    color: var(--grey-900);
  }

  // Styles for the icon inside each navigation link when hovered.
  .nav-link:hover .icon {
    // Change the color of the icon to a variable named '--primary-500' on hover.
    color: var(--primary-500);
  }

  // Styles for the icon inside each navigation link.
  .icon {
    // Set the font size of the icon to 1.5rem.
    font-size: 1.5rem;

    // Add some right margin to the icon.
    margin-right: 1rem;

    // Center the icon both horizontally and vertically within its container.
    display: grid;
    place-items: center;

    // Apply a smooth transition effect for changes in the icon's properties.
    transition: var(--transition);
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
`;

// Export the 'Wrapper' component as the default export.
export default Wrapper;
