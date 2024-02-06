import logo from '../logo.svg';
import { Link } from 'react-router-dom'

const PoweredByKashingLogo = () => (
    <Link to="/about" style={{ position: "absolute",top: 5, right: 5, zIndex: 1 }}>
      <span className="text-muted m-0" style={{ fontSize: '9px' }}>POWERED BY</span><br />
      <img src={logo} alt="Kashing Logo" onDragStart={(event)=> event.preventDefault()} className="position-relative img-fluid" style={{ height: '20px', marginTop: '-10px' }} />
    </Link>
);

export default PoweredByKashingLogo;