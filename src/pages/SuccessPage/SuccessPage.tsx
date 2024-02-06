import { useLocation, useNavigate} from "react-router-dom";
import styles from '../Page.module.scss';
import { useEffect } from "react";

function SuccessPage() {
  const location = useLocation()
  
  const history = useNavigate();

  useEffect(() => {

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
        history("/instructions");
      
    }, 3000); // after 3 seconds 


    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);

  });

  return (
    <div className={styles.Page}>
      <br/>
      <br/>
      <br/>
      <div className={styles.CenteredPane}>
        <div className="d-flex swal2-icon swal2-success swal2-animate-success-icon">
          <div className="swal2-success-circular-line-left"></div>
          <span className="swal2-success-line-tip"></span>
          <span className="swal2-success-line-long"></span>
          <div className="swal2-success-ring"></div>
          <div className="swal2-success-fix"></div>
          <div className="swal2-success-circular-line-right"></div>
        </div>
        <h1 className="display-4">{ location.state.title || 'Approved' }</h1>
        <p className="lead">{ location.state.message || 'Transaction has been executed successfully.' }</p>
      </div>
      <br/>
    </div>
  );
}

export default SuccessPage;
