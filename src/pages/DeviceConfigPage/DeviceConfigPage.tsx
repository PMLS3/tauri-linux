import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from './DeviceConfigPage.module.scss';
import config from '../../App.config'
import Product from '../../models/Product';
import { ListGroup } from 'reactstrap';
import { toast, Toaster } from 'react-hot-toast'
export interface ButtonProps {
    text: String;
    macAddress: String;
}

export interface AvailableMACAddresses {
    status: String;
    macAddresses: String[];
}

export interface pairStatus {
    status: String;
}

function DeviceConfigPage() {
    const history = useNavigate();
    const location = useLocation()
    const product = location.state as Product
    const [availableMACS, setAvailableMACS] = useState<AvailableMACAddresses>({status: "", macAddresses: []})

    const getAvailableMACs = useCallback(() => {
            const url = `${config.BaseUrl}/v1/kiosk/kurveyLite/listAvailable`
            return fetch(url, {
                method: 'GET', mode: 'cors',
                headers: { 'Content-Type': 'application/json' }
              }).then(rsp => {
                    return rsp.text()
                }).then(
                    response => {
                        return JSON.parse(response)
                    }).catch(error => {
                        console.log("Error refreshing MAC list.")
                        console.log(error)
                        history("/error", { state: { title: 'MAC refresh error', message: 'Cannot refresh MAC addresses.' }});
                    })
        }, [history]);


    const refreshAvailableMACs = useCallback( ()=> {
        getAvailableMACs().then(res => {
            console.log('got response')
            setAvailableMACS(res)
        })
    }, [getAvailableMACs])

  useEffect(() => {

    refreshAvailableMACs()

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
        console.log("Refreshing available MACs")
        refreshAvailableMACs()
      }, 4000); // every 1 second 

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [refreshAvailableMACs]);

  function MacButton(props: ButtonProps) {
    return <button onClick={()=> pairDevice(props.macAddress)} type="button" className="btn btn-secondary btn-lg m-3" style={{backgroundColor: "green"}}>
      { props.text } { props.macAddress }
    </button>
  }

  function makeMACButtons(){
    return (
        <div style={{overflowY: 'scroll', height: "350px"}}>
            <ListGroup>
                {availableMACS.macAddresses.map(function(mac){
                    return MacButton({text: "Pair:", macAddress: mac}) 
                })}
            </ListGroup>
        </div>
    )
  }

  function forgetDevice() {
    const url = `${config.BaseUrl}/v1/kiosk/kurveyLite/forget`
    toast("Forgetting...")
    fetch(url, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'productID': product.id })
    }).then(rsp => {
        return rsp.text()
    }).then(
        response => {
            console.log("Response from forget request: " + response)
            if (JSON.parse(response).status !== "success"){
                console.log("Forget device returned status: failure.")
            }
            history("/devices");
        }).catch(error => {
            console.log("Error forgetting device.")
            console.log(error)
            history("/error", {state: { title: 'Device un-pair error', message: 'Cannot forgetting device.' }});
        })
  }

  function pairDevice(mac: String){
    const url = `${config.BaseUrl}/v1/kiosk/kurveyLite/pair`
    toast("Pairing...")
    fetch(url, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'productID': product.id, 'macAddress': mac  })
    }).then(rsp => {
        return rsp.text()
    }).then(
        response => {
            console.log("Response from pair request: " + response)
            if (JSON.parse(response).status !== "success"){
                console.log("Pair device returned status: failure.")
            } else {
                toast("Pairing...")
            }
            history("/devices");
        }).catch(error => {
            console.log("Error pairing device.")
            console.log(error)
            history("/error",{state: { title: 'Device pair error', message: 'Cannot pair device.' }});
        })
  }

  function resetCashFloat(){
    const url = `${config.BaseUrl}/v1/kiosk/kurveyLite/resetCashFloat`
    toast("Resetting cash float...")
    fetch(url, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'productID': product.id})
    }).then(rsp => {
        return rsp.text()
    }).then(
        response => {
            console.log("Response from reset request: " + response)
            if (JSON.parse(response).status !== "success"){
                console.log("Reset float for device returned status: failure.")
            } else {
                toast("Resetting cash float...")
            }
            history("/devices");
        }).catch(error => {
            console.log("Error resetting cash float for device.")
            console.log(error)
            history("/error", {state: { title: 'Device cash float reset error', message: 'Cannot reset device cash float .' }});
        })
  }

  function resetCardFloat(){
    const url = `${config.BaseUrl}/v1/kiosk/kurveyLite/resetCardFloat`
    toast("Resetting card float...")
    fetch(url, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'productID': product.id})
    }).then(rsp => {
        return rsp.text()
    }).then(
        response => {
            console.log("Response from card float reset request: " + response)
            if (JSON.parse(response).status !== "success"){
                console.log("Card float reset returned status: failure.")
            } else {
                toast("Resetting card float...")
            }
            history("/devices");
        }).catch(error => {
            console.log("Error resetting card float device.")
            console.log(error)
            history("/error",  { state:{ title: 'Device card float reset error', message: 'Cannot reset device card float .' }});
        })
  }

  return (
    <div><Toaster/>
        <div className={styles.AboutPage}>
            <div className="content-pane">
                <div className="content-bg p-5 d-flex flex-column justify-content-between">
                    <div className="row">
                        <div className="col">
                            <table className="table table-sm">
                                <tbody>
                                <tr>
                                    <div className=" text-center font-weight-bold text-truncate" style={{ textDecoration: 'none' }}>
                                        <h3>{ product.name }</h3>
                                    </div>
                                </tr>
                                { product.device?.mac !== "" ?
                                    <tr>
                                        <div className="text-dark mt-1" >
                                            <b>MAC:</b> { product.device?.mac }
                                        </div>
                                    </tr>
                                : <tr></tr> }
                                <tr>
                                    <div className="text-dark mt-1" >
                                        <b>Coin meter: </b> { product.device!.coinMeter / 10 }
                                    </div>
                                    <div className="text-dark mt-1" >
                                        <b>Cash float: </b>{ product.device!.cashFloat / 10 }
                                    </div>
                                    <div className="text-dark mt-1" >
                                        <b>Last reset:</b> { product.device?.cashFloatReset }
                                    </div>
                                </tr>
                                <tr>
                                    <div>
                                        <button onClick={()=> resetCashFloat()} type="button" className="btn btn-secondary btn-lg m-3">
                                            Reset Cash Float
                                        </button>
                                        <button onClick={()=> resetCardFloat()} type="button" className="btn btn-secondary btn-lg m-3">
                                            Reset Card Float
                                        </button>
                                    </div>
                                   
                                    
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-6">
                            { product.device?.mac !== "" ? 
                                <button onClick={()=> forgetDevice() } type="button" 
                                        className="d-flex justify-content-center btn btn-secondary btn-lg" 
                                        style={{backgroundColor: "red", marginLeft: "35%", marginTop: "40%"}}>Forget device</button> :
                                <>
                                    <h5 className="d-flex justify-content-center">MAC Addresses</h5>
                                    {makeMACButtons()}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="footer-pane">
                <div className="page-navigator d-flex justify-content-between">
                    <Link to="/devices" className="btn btn-secondary btn-lg">
                        <i className="fa fa-lg fa-chevron-left mr-3"/>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeviceConfigPage;
