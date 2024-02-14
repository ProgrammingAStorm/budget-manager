import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

// {years.map(({ id, yearValue }) => (
//     <Link key={id} to={`/${yearValue}`}>
//       {yearValue}
//     </Link>
//   ))}
