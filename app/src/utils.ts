import { faker } from '@faker-js/faker';

const getFleet = () => {
  const fleet = localStorage.getItem('fleet');
  if (fleet) {
    return fleet
  }

  const newFleet = faker.word.noun({ length: { min: 5, max: 7 } }).toLowerCase();
  localStorage.setItem('fleet', newFleet);
  return newFleet;
};

export { getFleet };  