import {API_BASE_URL, CONFIG} from './utils';

const CATEGORIES_API_URL = `${API_BASE_URL}/api/Category`;

export const fetchAllCategories = async () => {
  const response = await fetch(CATEGORIES_API_URL, {
    method: 'GET',
    headers: CONFIG,
  });
  const json = await response.json();
  return json;
};
