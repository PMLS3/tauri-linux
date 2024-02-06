import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import styles from './AboutPage.module.scss';
import config from '../../App.config'
interface AboutInfo {
  serial: string
  version: string
  build: string
  email?: string
  phone?: string
}
function AboutPage() {
  const [serialNumber, setSerialNumber] = useState('Unknown')
  const [version, setVersion] = useState('?')
  const [build, setBuild] = useState('?')
  const history = useNavigate();

  useEffect(() => {
    const handleBackForward = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
    //  alert('Navigation not allowed'); // Optional: Display a message or perform any action you want
    // route the current page 
      history('/about')

    };

    window.addEventListener('popstate', handleBackForward);

    fetch(`${config.BaseUrl}/v1/kiosk/about`, {
      method: 'GET', mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(rsp => rsp.text())
    .then(body => {
      let data: AboutInfo = JSON.parse(body)
      setSerialNumber(data.serial)
      setVersion(data.version)
      setBuild(data.build)
    });
  }, []);

  return (
    <div className={styles.AboutPage}>
      <div className="content-pane">
        <div className="content-bg p-5 d-flex flex-column justify-content-between">
          <div className="row">
            <div className="col-md-4">
              <h3>
                Kurvey Kiosk
              </h3>
              <p className="mb-0">Payment software provided by Kashing Limited.</p>
              <span className="font-monospace font-weight-bold">www.kashing.co.uk</span>

              <br/>
              <br/>
            </div>

            <div className="col-md-8">
              <h5>
                Device Information
              </h5>
              <br/>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <th scope="row">SN</th>
                    <td>{ serialNumber }</td>
                  </tr>
                  <tr>
                    <th scope="row">Version</th>
                    <td>v{ version }</td>
                  </tr>
                  <tr>
                    <th scope="row">Build</th>
                    <td>{ build }</td>
                  </tr>
                </tbody>
              </table>

              <br/>
              <h5>
                Support
              </h5>
              <br/>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <th scope="row">Email</th>
                    <td>support@kashing.co.uk</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      <div className="footer-pane">
        <div className="page-navigator d-flex justify-content-between">
          <Link to="/select_product" className="btn btn-secondary btn-lg">
            <i className="fa fa-lg fa-chevron-left mr-3"/>
            Back
          </Link>
          <Link to="/pin" className="btn btn-secondary btn-lg">
            <i className="fa fa-lg fa-signal mr-3"/>
            Manage
          </Link>
        </div>
      </div>

    </div>
  )
}

export default AboutPage;
