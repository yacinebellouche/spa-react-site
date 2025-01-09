import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Event Page Detail Page</h1>
      <p>Event ID : {params.id}</p>
    </>
  );
}
