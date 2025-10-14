import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({ to: "/sign-in" });
  },
});

function RouteComponent() {
  return <div></div>;
}
