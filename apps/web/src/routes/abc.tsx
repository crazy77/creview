import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/abc')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/abc"!</div>
}
