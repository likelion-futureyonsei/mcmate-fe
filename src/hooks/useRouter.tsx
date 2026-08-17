import {createBrowserRouter} from "react-router-dom";

import {Layout} from "@/components";

import {
  Home,
  Map,
  MyProducts,
  NotFound,
  NumberInput,
  ProductAdd,
  ProductDetail,
  ProductPhoto,
  ProductWrite,
  Search,
  Settings,
  Start,
  StorybookEpisode,
  Store,
} from "@/pages";

export const useRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {index: true, element: <Start />},
        {path: "home", element: <Home />},
        {path: "my-products", element: <MyProducts />},
        {path: "product-detail", element: <ProductDetail />},
        {path: "product-photo", element: <ProductPhoto />},
        {path: "product-write", element: <ProductWrite />},
        {path: "product-add", element: <ProductAdd />},
        {path: "number-input", element: <NumberInput />},
        {path: "store", element: <Store />},
        {path: "map", element: <Map />},
        {path: "settings", element: <Settings />},
        {path: "storybook-episode", element: <StorybookEpisode />},
        {path: "search", element: <Search />},
      ],
    },
  ]);
