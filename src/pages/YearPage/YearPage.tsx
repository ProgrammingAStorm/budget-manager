import { useParams } from "react-router-dom";

export default function YearPage() {
  const year = useParams().year;
  return <>{year}</>;
}
