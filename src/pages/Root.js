import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
export default function RootLayout() {
  //const navigation = useNavigation(): allows to access some properties that we can use for example the state that has 3 different types idle, loading and submitting 

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
