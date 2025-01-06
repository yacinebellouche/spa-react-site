import { Link } from "react-router-dom";
// Link allows to change the route without sending an http request that would reload the page which meqns reload all the javascript

function HomePage() {
  return (
    <>
      <h1>My Home Page</h1>
      Go to <Link to="/products">The list of products</Link>
    </>
  );
}

export default HomePage;
