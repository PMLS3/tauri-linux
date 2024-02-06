import { Link } from "react-router-dom";
import { useState } from 'react';
import styles from './StatsPage.module.scss';
import StatsTable from '../../components/StatsTable'


function StatsPage() {

  const [dateRange, SetDateRange] = useState('last')

  return (
    <div className={styles.StatsPage}>
      <div className="content-pane justify-content-between">
        { <StatsTable option={dateRange}/> }
      </div>
      <div className="footer-pane">
        <div className="page-navigator d-flex justify-content-between">
          <Link to="/about" className="btn btn-secondary btn-lg">
            <i className="fa fa-lg fa-chevron-left mr-3" />
            Back
          </Link>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" onClick={()=>SetDateRange("last")} className="btn btn-secondary btn-lg">
              Last sales
            </button>
            <button type="button" onClick={()=>SetDateRange("daily")} className="btn btn-secondary btn-lg">
              Daily
            </button>
            <button type="button" onClick={()=>SetDateRange("weekly")} className="btn btn-secondary btn-lg">
              Weekly
            </button>
            <button type="button" onClick={()=>SetDateRange("monthly")} className="btn btn-secondary btn-lg">
              Monthly
            </button>
          </div>
          <Link to="/devices" className="btn btn-secondary btn-lg">
            <i className="fa fa-lg mr-3" />
            Devices
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StatsPage;
