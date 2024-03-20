import { Link,useRouteError } from 'react-router-dom';
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg"
const Error = () => {
  const error=useRouteError();
  console.log(error)
  if(error.status ===404){
    return(
  <Wrapper>
    <div>
      <img src={img} alt="image" />
      <h3>Ohh!Page not found</h3>
      <p>We can't seem to find the page you're looking for</p>
          <Link to='/dashboard'>back home</Link>

      </div>
  </Wrapper>
    )
  }
  
  return (
    <Wrapper>
      <div>
        <h3>Somenthing Went Wrong</h3>
      </div>
      {/* <Link to="/">Back home</Link> */}
    </Wrapper>
  )
}

export default Error
 