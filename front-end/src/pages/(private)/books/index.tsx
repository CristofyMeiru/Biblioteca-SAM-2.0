import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/books/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/books/"!</div>
}
