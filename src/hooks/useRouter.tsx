import {createBrowserRouter} from "react-router-dom";

import {Layout} from "@/components";

import {
  Character,
  CharacterColor,
  CharacterPattern,
  Home,
  HomeEmpty,
  Loading,
  MapMain,
  MemoryDetail,
  MemoryWrite,
  MyProducts,
  NotFound,
  NumberInput,
  ProductMemories,
  QrRegister,
  Search,
  Settings,
  SharedMemoryDetail,
  SignUp,
  Store,
  Storybook,
  StorybookDetail,
  StorybookHeritage,
} from "@/pages";

export const useRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {index: true, element: <Home />},
        {path: "home-empty", element: <HomeEmpty />},

        {path: "my-products", element: <MyProducts />},
        {path: "product-memories", element: <ProductMemories />},
        {path: "memory-detail", element: <MemoryDetail />},
        {path: "memory-write", element: <MemoryWrite />},

        {path: "map", element: <MapMain />},
        {path: "map/memory", element: <SharedMemoryDetail />},

        {path: "storybook", element: <Storybook />},
        {path: "storybook/heritage", element: <StorybookHeritage />},
        {path: "storybook/detail", element: <StorybookDetail />},

        {path: "character/body", element: <Character />},
        {path: "character/color", element: <CharacterColor />},
        {path: "character/pattern", element: <CharacterPattern />},

        {path: "store", element: <Store />},
        {path: "search", element: <Search />},
      ],
    },
    {
      /* modal frames: no bottom navigation */
      path: "/",
      element: <Layout nav={false} />,
      errorElement: <NotFound />,
      children: [
        {path: "signup", element: <SignUp />},
        {path: "loading", element: <Loading />},
        {path: "qr-register", element: <QrRegister />},
        {path: "number-input", element: <NumberInput />},
        {path: "settings", element: <Settings />},
      ],
    },
  ]);
