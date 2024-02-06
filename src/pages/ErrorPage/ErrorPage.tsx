import {useLocation } from "react-router-dom";
import styles from '../Page.module.scss';
// import { MessageCommand } from '../../models/MessageCommand';
import { useNavigate } from 'react-router-dom';
import  {  useCallback } from 'react';
import WSClient from '../../utils/WSClient'

function ErrorPage() {
  const history = useNavigate();

  const location = useLocation()
  //create go home button
  const handleButtonClick = useCallback(() => {
    // Replace this logic with the route you want to navigate to on button click
    WSClient.getInstance().redirectCallback?.("start", "");
    history('/');
  }, [history]);


  return (
    <div className={styles.Page}>
      <br/>
      <br/>
      <br/>
      <div className={styles.CenteredPane}>
        <div className="d-flex swal2-icon swal2-error swal2-animate-error-icon">
          <span className="swal2-x-mark">
            <span className="swal2-x-mark-line-left">
            </span>
            <span className="swal2-x-mark-line-right">
            </span>
          </span>
        </div>
        <h1 className="display-4">{ location.state.title }</h1>
        <p className="lead">{ location.state.message }</p>
        <br/>
         <button className="btn btn-primary btn-lg" onClick={handleButtonClick}>Go Home</button>
      </div>
      <br/>
    </div>
  );
};

export default ErrorPage;