import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/books/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/books/new"!</div>
}
