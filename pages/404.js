import EmptyState from '../components/sections/EmptyState';

export default function Custom404() {
  return (
    <EmptyState
      error
      title="404"
      content="Page not found"
      ctaLink="/"
      ctaText="Go to Homepage"
    />
  );
}
