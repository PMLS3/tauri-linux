
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from '../Page.module.scss';

function DeclinedPage() {
  const location = useLocation();
  
  const history = useNavigate();
  useEffect(() => {
    const handleBackForward = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
    //  alert('Navigation not allowed'); // Optional: Display a message or perform any action you want
    // route the current page 
      history('/declined')

    };

    window.addEventListener('popstate', handleBackForward);

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
        history("/");
    }, 5000); // after 5 seconds 

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);

  });
  
  return (
    <div className={styles.Page}>
      <br />
      <br />
      <br />
      <div className={styles.CenteredPane}>
        <div className="d-flex swal2-icon swal2-error swal2-animate-error-icon">
          <span className="swal2-x-mark">
            <span className="swal2-x-mark-line-left">
            </span>
            <span className="swal2-x-mark-line-right">
            </span>
          </span>
        </div>
        <h1 className="display-4">{ location.state.title || 'Declined' }</h1>
        <p className="lead">{ location.state.message || 'Transaction has been declined.' }</p>
      </div>
      <br />
    </div>
  );
}

export default DeclinedPage;


