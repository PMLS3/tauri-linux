import  { useContext, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import PoweredByKashingLogo from '../../components/PoweredByKashingLogo';
import { KioskContext, KioskLoadingContext } from '../../contexts/KioskContext';
import useSwipeToRoute from '../../hooks/useSwipeToRoute';

function DisclaimerPage() {
  const buttonRef = useRef(null);

  const kiosk = useContext(KioskContext);
  const loading = useContext(KioskLoadingContext);

  const handleButtonClick = useSwipeToRoute(buttonRef, '/select_product');

  if (!loading && !kiosk.disclaimer) {
    return <Navigate to="/select_product" />;
  }

  return (
    <div>
      <img
        onDragStart={(event) => event.preventDefault()}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '100%',
          width: '100%',
        }}
        src={kiosk.disclaimer}
        alt="Disclaimer"
      />

<button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="btn btn-secondary btn-lg next"
        style={{ backgroundColor: kiosk.primaryColor, position: 'absolute', bottom: '10px', right: '20px' }}
      >
        <span>
          <i className="fa fa-lg fa-chevron-right" />
          Accept
        </span>
      </button>
      <PoweredByKashingLogo />
    </div>
  );
}

export default DisclaimerPage;
