import { useEffect } from 'react';

function PageNotFound() {
  // changing document title
  useEffect(() => {
    document.title = '404 - eCommerce';
  }, []);
  return <div>PageNotFound</div>;
}

export default PageNotFound;
