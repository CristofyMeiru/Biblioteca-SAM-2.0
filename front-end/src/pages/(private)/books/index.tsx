import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/books/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/books/$book_id" params={{ book_id: "algo" }}>
        Inferno
      </Link>
    </div>
  );
}
