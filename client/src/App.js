// Importing necessary components from respective files
import {
  AddTask,
  AllTask,
  Profile,
  SharedLayout,
  Stat
} from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error, Landing, ProtectedRoute, Register } from "./pages";

function App() {
  return (
    <>
      {/* Wrapping the entire application with BrowserRouter to enable routing */}
      <BrowserRouter>
        {/* Defining the Routes for the application */}
        <Routes>
          {/* ProtectedRoute wraps the SharedLayout component */}
          <Route path="/" element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
            {/* Defining child routes under the main route */}
            <Route index element={<Stat />} /> {/* Renders the Stat component at the root path */}
            <Route path="profile" element={<Profile />} /> {/* Renders the Profile component at "/profile" */}
            <Route path="addTask" element={<AddTask />} /> {/* Renders the AddTask component at "/addTask" */}
            <Route path="allTask" element={<AllTask />} /> {/* Renders the AllTask component at "/allTask" */}
          </Route>
          {/* Additional routes */}
          <Route path="/register" element={<Register />} /> {/* Renders the Register component at "/register" */}
          <Route path="/landing" element={<Landing />} /> {/* Renders the Landing component at "/landing" */}
          <Route path="*" element={<Error />} /> {/* Renders the Error component for any undefined routes */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
