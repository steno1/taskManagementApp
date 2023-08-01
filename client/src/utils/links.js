// Importing necessary react-icons components

import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';

// Array of links with associated text, path, and icon
const links = [
  {
    id: 1,
    text: "stat",
    path: "/",
    icon: <IoBarChartSharp />
  },
  {
    id: 2,
    text: "allTask",
    path: "/allTask",
    icon: <MdQueryStats />
  },
  {
    id: 3,
    text: "addTask",
    path: "/addTask",
    icon: <FaWpforms />
  },
  {
    id: 4,
    text: "profile",
    path: "/profile",
    icon: <ImProfile />
  }
];

export default links;
