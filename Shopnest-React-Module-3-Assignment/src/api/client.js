import axios from "axios";

// Our "backend" is the JSON file at public/products.json.
// Vite serves everything in /public from the site root, so the file
// is available at http://localhost:5173/products.json
const api = axios.create({
  baseURL: "/",
  timeout: 10000,
});

// Image paths in products.json are relative ("images/products/x.jpg").
// Make them absolute so they also work on /products/:id pages.
const normalize = (product) => ({
  ...product,
  imageUrl: /^(\/|https?:)/.test(product.imageUrl) ? product.imageUrl : `/${product.imageUrl}`,
});

// GET /products.json -> array of products
export async function getProducts(signal) {
  const response = await api.get("products.json", { signal });
  return { ...response, data: response.data.map(normalize) };
}

// A JSON file can't be queried by id, so we load the list and pick one.
// If it's missing we throw an Axios-style 404 so the UI can show "not found".
export async function getProductById(id, signal) {
  const response = await getProducts(signal);
  const product = response.data.find((p) => p.id === Number(id));

  if (!product) {
    const error = new Error("Product not found");
    error.response = { status: 404 };
    throw error;
  }

  return { ...response, data: product };
}

export default api;
