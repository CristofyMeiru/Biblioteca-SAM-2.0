import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/sign-up"!</div>
}
