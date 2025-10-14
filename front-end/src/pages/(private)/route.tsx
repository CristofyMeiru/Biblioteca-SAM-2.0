import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className=" min-h-screen ">
      <Outlet />
    </div>
  );
}
