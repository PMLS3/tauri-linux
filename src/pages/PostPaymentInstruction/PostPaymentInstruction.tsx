
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react';
import { KioskContext, KioskLoadingContext } from '../../contexts/KioskContext';
import PoweredByKashingLogo from '../../components/PoweredByKashingLogo';

const PostPaymentInstructions = () => {

  const history = useNavigate();

  const kiosk = useContext(KioskContext)
  const loading = useContext(KioskLoadingContext)
  const [timerCounter, setTimerCounter] = useState(0)
  useEffect(() => {

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimerCounter(timerCounter+1)
      let timeout = kiosk.instructionsDuration?? 30
      if (timerCounter >= timeout) {
        history('/')
      }
    }, 1000); // every 1 second 


    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);

  });

  if (loading) {
    return  <>
    <PoweredByKashingLogo /> <div className="d-flex justify-content-center " >
    <div className="spinner-border" role="status" style={{height: "10rem", width: "10rem"}}>
      <span className="sr-only">Loading...</span>
    </div>
  </div> </>
  }

  if (!kiosk.instructions) {
    return <Navigate to="/" />
  }


  return (
    <img style={{ position: "absolute", top: 0, width: "100%", height: "100%" }} src={kiosk.instructions} alt="User action instructions" />
  );
}

export default PostPaymentInstructions;