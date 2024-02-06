import styles from '../Page.module.scss';
import { useLocation } from "react-router-dom";

function ThankYouPage() {

  const location = useLocation()

  return (
    <div className={styles.Page}>
      <br/>
      <br/>
      <br/>
      <div className={styles.CenteredPane}>
        <img id="thankyou" src="http://kiosk.local:8080/thanks.png" alt="Thank you" style={{ maxHeight: '100px' }}/>
        <h1 className="display-4">{ location.state.title || 'Thank You' }</h1>
        <p className="lead">{ location.state.message || 'We wish you a wonderful day. Thanks for using our services.' }</p>
      </div>
      <br/>
    </div>
  )
}

export default ThankYouPage;
