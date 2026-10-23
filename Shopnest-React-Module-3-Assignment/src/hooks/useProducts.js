import useFetch from "./useFetch";
import { getProductById, getProducts } from "../api/client";

export function useProducts() {
  return useFetch((signal) => getProducts(signal), []);
}

export function useProduct(id) {
  return useFetch((signal) => getProductById(id, signal), [id]);
}
