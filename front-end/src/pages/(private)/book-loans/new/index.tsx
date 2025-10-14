import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/book-loans/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <div>Hello "/(private)/book-loans/new"!</div>
}
