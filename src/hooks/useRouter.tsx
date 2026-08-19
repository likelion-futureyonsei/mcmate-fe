import {createBrowserRouter} from "react-router-dom";

import {Layout} from "@/components";

import {
  DogDetail,
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
  Start,
  StorybookEpisode,
  Storybook,
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
        {path: "dog-detail", element: <DogDetail />},
        {path: "my-products", element: <MyProducts />},
        {path: "product-detail", element: <ProductDetail />},
        {path: "product-photo", element: <ProductPhoto />},
        {path: "product-write", element: <ProductWrite />},
        {path: "product-add", element: <ProductAdd />},
        {path: "number-input", element: <NumberInput />},
        {path: "store", element: <Store />},
        {path: "map", element: <Map />},
        {path: "storybook", element: <Storybook />},
        {path: "storybook-episode", element: <StorybookEpisode />},
        {path: "search", element: <Search />},
      ],
    },
  ]);
