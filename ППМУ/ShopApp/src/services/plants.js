import {API_BASE_URL, CONFIG} from './utils';

const PLANTS_API_URL = `${API_BASE_URL}/api/Plant`;

export const fetchAllPlants = async () => {
  const response = await fetch(PLANTS_API_URL, {
    method: 'GET',
    headers: CONFIG,
  });
  const json = await response.json();
  return json;
};

export const fetchPlantsByCategory = async categoryId => {
  const response = await fetch(`${PLANTS_API_URL}/Category/${categoryId}`, {
    method: 'GET',
    headers: CONFIG,
  });
  const json = await response.json();
  return json;
};

export const fetchLikedPlants = async () => {
  const response = await fetch(`${PLANTS_API_URL}/Liked`, {
    method: 'GET',
    headers: CONFIG,
  });
  const json = await response.json();
  return json;
};

export const updatePlant = async ({plantId, isLiked}) => {
  const response = await fetch(`${PLANTS_API_URL}/${plantId}`, {
    method: 'PUT',
    headers: CONFIG,
    body: JSON.stringify({isLiked}),
  });
  const json = await response.json();
  return json;
};
