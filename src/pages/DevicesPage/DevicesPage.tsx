import { Link } from "react-router-dom";
import styles from './DevicesPage.module.scss';
import DeviceCarousel from "../../components/DeviceCarousel";


function DevicesPage() {

  return (
    <div className={styles.DevicesPage}>
      <section className="product-navigator">
      <div className="content-pane">
        <div className="content-b d-flex flex-column justify-content-between">
          <div className="my-auto"></div>
            { <DeviceCarousel/> }
          <div className="my-auto"></div>
        </div>
      </div>
      <div className="footer-pane">
        <div className="page-navigator d-flex justify-content-between">
          <Link to="/about" className="btn btn-secondary btn-lg">
            <i className="fa fa-lg fa-chevron-left mr-3" />
            Back
          </Link>
            <Link to="/stats" className="btn btn-secondary btn-lg">
              <i className="fa fa-lg mr-3" />
              Stats
            </Link>
        </div>
      </div>
      </section>
    </div>
  )
}

export default DevicesPage;
