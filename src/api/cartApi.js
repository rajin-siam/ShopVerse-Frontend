async function addToCart(productId, quantity) {
  const response = await fetch(
    `http://localhost:8081/api/carts/products/${productId}/quantity/${quantity}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add product to cart");
  }

  return await response.json();
}

async function fetchCart() {
  const response = await fetch(`http://localhost:8081/api/carts/users/cart`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return await response.json();
}

async function updateQuantity(productId, operation) {
  console.log(operation);
  const response = await fetch(
    `http://localhost:8081/api/carts/products/${productId}/quantity/${operation}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update quantity");
  }

  return await response.json();
}

async function removeFromCart(cartId, productId) {
  const response = await fetch(
    `http://localhost:8081/api/carts/${cartId}/product/${productId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove item from cart");
  }

  return true;
}

export { addToCart, fetchCart, updateQuantity, removeFromCart };
