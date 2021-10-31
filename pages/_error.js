import EmptyState from '../components/sections/EmptyState';

export default function _Error({ statusCode }) {
  return (
    <EmptyState
      error
      title={statusCode || 'Error'}
      content="Something went wrong"
      ctaLink="/"
      ctaText="Go to Homepage"
    />
  );
}

_Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
