import {createBrowserRouter} from "react-router-dom";

import {Layout} from "@/components";

import {
  Home,
  Memories,
  MyProducts,
  NotFound,
  NumberInput,
  ProductAdd,
  ProductDetail,
  ProductPhoto,
  ProductWrite,
  Search,
  Settings,
  Store,
} from "@/pages";

export const useRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {index: true, element: <Home />},
        {path: "my-products", element: <MyProducts />},
        {path: "product-detail", element: <ProductDetail />},
        {path: "product-photo", element: <ProductPhoto />},
        {path: "product-write", element: <ProductWrite />},
        {path: "product-add", element: <ProductAdd />},
        {path: "number-input", element: <NumberInput />},
        {path: "store", element: <Store />},
        {path: "memories", element: <Memories />},
        {path: "settings", element: <Settings />},
        {path: "search", element: <Search />},
      ],
    },
  ]);
