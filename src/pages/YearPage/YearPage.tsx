//import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import MonthSelector from "./components/MonthSelector";

export default function YearPage() {
  //const year = useParams().year;
  return (
    <main>
      <MonthSelector />

      <Outlet />
    </main>
  );
}
