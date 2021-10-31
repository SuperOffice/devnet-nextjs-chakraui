import EmptyState from '../components/sections/EmptyState';

//Custom error page for authentication errors - check [...nextauth].js file pages prop
export default function Error({ message }) {
  return (
    <EmptyState
      error
      title={message.charAt(0).toUpperCase() + message.slice(1) + ' Error'}
      content="Something went wrong during authentication"
      ctaLink="/"
      ctaText="Go to Homepage"
    />
  );
}

export async function getServerSideProps({ query }) {
  const { error } = query;

  if (error) {
    return { props: { message: error } };
  }

  return { redirect: { destination: '/', permanent: false } };
}
