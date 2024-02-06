import { Link } from "react-router-dom";
import styles from './HomePage.module.scss';

const HomePage = () => (
  <div className={styles.HomePage}>
    Home page

    <br/>
    <Link to={{ 
      pathname: '/select_product',
    }} className="btn btn-primary">
      Select product
    </Link>
  </div>
);

export default HomePage;
