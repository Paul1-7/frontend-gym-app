import { pink, purple, teal, amber, deepOrange, green, blue, cyan } from '@mui/material/colors';

export const getRandomColor = () => {
  const COLOR = [pink, purple, teal, amber, deepOrange, green, blue, cyan];
  return COLOR[Math.floor(Math.random() * COLOR.length)];
};

export const dataSchedule = [
  {
    id: 0,
    title: 'Watercolor Landscape',
    roomId: 1,
    members: [1],
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10',
  },
  {
    id: 1,
    title: 'Oil Painting for Beginners',
    roomId: 2,
    members: [2],
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10',
  },
];

export const resourcesData = [
  {
    text: 'Room 101',
    id: 1,
    color: amber,
  },
  {
    text: 'Room 102',
    id: 2,
    color: pink,
  },
];

export const owners = [
  {
    text: 'Andrew Glover',
    id: 1,
    color: '#7E57C2',
  },
  {
    text: 'Arnie Schwartz',
    id: 2,
    color: '#FF7043',
  },
];
