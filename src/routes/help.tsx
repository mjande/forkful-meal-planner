import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/help')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &ldquo;/help&rdquo;!</div>;
}
