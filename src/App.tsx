import {RouterProvider} from "react-router-dom";

import {AuthProvider} from "@/auth";
import {useDarkMode, useRouter} from "@/hooks";
import {useEffect} from "react";

const App = () => {
  const router = useRouter();
  const {applyTheme} = useDarkMode();

  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
