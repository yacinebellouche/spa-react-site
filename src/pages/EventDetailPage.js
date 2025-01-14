import { redirect, useRouteLoaderData, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading The Event Details...</p>
        }
      >
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading Other Events...</p>
        }
      >
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not fetch details for selected event.",
      }),
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

// react router passes an object that contains request and params for you ( request is used to access the url )
export async function loader({ request, params }) {
  const id = params.id;

  return {
    //this allows to wait until the data is ready before moving to this page
    event: await loadEvent(id),
    events: loadEvents(),
  };
}

export async function action({ request, params }) {
  const id = params.id;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not delete the selected event.",
      }),
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
}
