import {API_BASE_URL, CONFIG} from './utils';

const SHOPPING_CART_API_URL = `${API_BASE_URL}/api/ShoppingCartItem`;

export const fetchShoppingCartItems = async () => {
  const response = await fetch(SHOPPING_CART_API_URL, {
    method: 'GET',
    headers: CONFIG,
  });
  const json = await response.json();
  return json;
};

export const deleteShoppingCartItem = async id => {
  await fetch(`${SHOPPING_CART_API_URL}/${id}`, {
    method: 'DELETE',
    headers: CONFIG,
  });
};

export const addUpdateShoppingCartItem = async ({plantId, quantity}) => {
  await fetch(`${SHOPPING_CART_API_URL}/Plant/${plantId}`, {
    method: 'POST',
    headers: CONFIG,
    body: JSON.stringify({quantity}),
  });
};
