import {createBrowserRouter} from "react-router-dom";

import {RedirectIfAuthenticated, RequireAuth, RequireCharacter} from "@/auth";
import {Layout} from "@/components";

import {
  Character,
  CharacterColor,
  CharacterPattern,
  Home,
  HomeEmpty,
  MapMain,
  MemoryDetail,
  MemoryWrite,
  MyProducts,
  NotFound,
  NumberInput,
  Onboarding,
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

/**
 * First run, in order: `/signup` -> `/loading` -> `/character/body` ->
 * `/home-empty` -> `/qr-register` -> `/`. The two gates below enforce it, so a
 * new account cannot skip a step by typing a URL.
 */
export const useRouter = () =>
  createBrowserRouter([
    {
      /* the only frame reachable without a token */
      element: <RedirectIfAuthenticated />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Layout nav={false} />,
          children: [{path: "signup", element: <SignUp />}],
        },
      ],
    },
    {
      element: <RequireAuth />,
      errorElement: <NotFound />,
      children: [
        {
          /* outside the character gate: these are how the character is created */
          path: "/",
          element: <Layout />,
          children: [
            {path: "character/body", element: <Character />},
            {path: "character/color", element: <CharacterColor />},
            {path: "character/pattern", element: <CharacterPattern />},
          ],
        },
        {
          path: "/",
          element: <Layout nav={false} />,
          children: [
            {path: "loading", element: <Onboarding />},
            {path: "settings", element: <Settings />},
          ],
        },
        {
          element: <RequireCharacter />,
          children: [
            {
              path: "/",
              element: <Layout />,
              children: [
                {index: true, element: <Home />},
                {path: "home-empty", element: <HomeEmpty />},

                {path: "my-products", element: <MyProducts />},
                /*
                 * Detail frames carry the record id. The bare paths are kept so
                 * the screens still open on the first available record.
                 */
                {path: "product-memories", element: <ProductMemories />},
                {
                  path: "product-memories/:userProductId",
                  element: <ProductMemories />,
                },
                {path: "memory-detail", element: <MemoryDetail />},
                {path: "memory-detail/:memoryId", element: <MemoryDetail />},
                {path: "memory-write", element: <MemoryWrite />},

                {path: "map", element: <MapMain />},
                {path: "map/memory", element: <SharedMemoryDetail />},
                {path: "map/memory/:memoryId", element: <SharedMemoryDetail />},

                {path: "storybook", element: <Storybook />},
                {path: "storybook/heritage", element: <StorybookHeritage />},
                {path: "storybook/detail", element: <StorybookDetail />},
                {
                  path: "storybook/detail/:storybookId",
                  element: <StorybookDetail />,
                },

                {path: "store", element: <Store />},
                {path: "search", element: <Search />},
              ],
            },
            {
              /* modal frames: no bottom navigation */
              path: "/",
              element: <Layout nav={false} />,
              children: [
                {path: "qr-register", element: <QrRegister />},
                {path: "number-input", element: <NumberInput />},
              ],
            },
          ],
        },
      ],
    },
  ]);
