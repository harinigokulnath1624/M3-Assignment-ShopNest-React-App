# ShopNest (React)

A React-only version of ShopNest: React Router, Context API, Axios and Bootstrap.
The "backend" is a plain JSON file: `public/products.json`.

## Run it
```bash
npm install
# copy your original images/ folder contents into public/images/ (see public/images/README.txt)
npm run dev        # http://localhost:5173
```

Production build: `npm run build`, then `npm run preview`.

## Routes
- `/` Home
- `/products` Products (filters via `?category=` and `?search=`)
- `/products/:id` Product Detail
- `/cart` Cart
- `/contact` Contact

## How data loading works
`src/api/client.js` uses Axios to `GET /products.json`. The detail page loads the same file and picks the
product matching the `:id` from the URL. Edit `public/products.json` to change products.

## Structure
- `public/products.json` product data (the "backend")
- `src/api/` Axios instance + request functions
- `src/context/` CartContext (useReducer + localStorage)
- `src/hooks/` useFetch (loading / error / retry), useProducts, useProduct
- `src/components/` Navbar, ProductCard, ProductGrid, CategoryFilter, CartItem, ...
- `src/pages/` Home, Products, ProductDetail, Cart, Contact, NotFound
