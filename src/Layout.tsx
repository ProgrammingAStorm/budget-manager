import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";
import DynamicModal from "./components/DynamicModal.tsx";

export default function Layout() {
  return (
    <>
      <Header />
      <DynamicModal />
      <Outlet />
    </>
  );
}
