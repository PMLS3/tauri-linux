
import { useContext } from 'react';
import PoweredByKashingLogo from '../../components/PoweredByKashingLogo';
import { Navigate, Link } from 'react-router-dom'
import { KioskContext, KioskLoadingContext } from '../../contexts/KioskContext';

const SplashScreen = () => {

  const kiosk = useContext(KioskContext)
  const loading = useContext(KioskLoadingContext)

  if (loading) {
    return  <>
    <PoweredByKashingLogo /> <div className="d-flex justify-content-center " >
    <div className="spinner-border" role="status" style={{height: "10rem", width: "10rem"}}>
      <span className="sr-only">Loading...</span>
    </div>
  </div> </>
  }

  if (!kiosk.splash) {
    return <Navigate to="/disclaimer" />
  }

  return (
    <>
      <PoweredByKashingLogo />

      <Link to="/disclaimer">
        <img style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
          src={kiosk.splash}
          alt="logo" 
          onDragStart={(event)=> event.preventDefault()}/>
      </Link>
    </>
  );
}

export default SplashScreen;
