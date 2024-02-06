import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../Page.module.scss';

function ActionRequiredPage() {
  const location = useLocation()
  const [showText, setShowText] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const handleBackForward = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
    //  alert('Navigation not allowed'); // Optional: Display a message or perform any action you want
    // route the current page 
      history('/about')

    };

    window.addEventListener('popstate', handleBackForward);
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const fade = {
    opacity: showText ? 1 : 0.7,
    transition: "all 0.7s ease-in"
  };

  const highlight = {
    color: showText ? '#FF4D00' : '#000',
    fontWeight: 500,
    transition: "all 0.7s ease-in"
  };

  return (
    <div className={styles.ActionRequiredPage}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div style={fade}>
        <div className={styles.CenteredPane} >
          <h1 className="display-4" style={highlight}>{ location.state.title }</h1>
          <p className="lead">{ location.state.message }</p>
        </div>
      </div>
      <br/>
    </div>
  )
};

export default ActionRequiredPage;
