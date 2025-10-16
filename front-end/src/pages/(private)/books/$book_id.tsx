import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/books/$book_id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { book_id } = Route.useParams();

  return <div>Hello {book_id}</div>;
}
