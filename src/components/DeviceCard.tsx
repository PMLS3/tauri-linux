import {useContext} from 'react';
import { Link } from "react-router-dom";
import { Product } from '../models/Product'
import { KioskContext } from '../contexts/KioskContext';

export interface ProductProps {
  product: Product;
}

interface CustomPath {
  pathname: string;
  state: Product;
}

function DeviceCard(props: ProductProps) {
  const kiosk = useContext(KioskContext)

  return (
    props.product.device != null ?
    <div className="text-left my-auto font-size: small" style={{minWidth: 230, maxWidth: 230}}>
      <Link 
        className="card card-product shadow-sm text-decoration-none"
        style={{ borderTop: "3px solid "+ kiosk.primaryColor, paddingLeft: "5%", paddingRight: "5%" }}
        to={{ pathname: "/DeviceConfig", state: props.product} as CustomPath} // Fix: Specify the type of the 'to' prop as CustomPath
      >

        <div className=" text-center font-weight-bold text-truncate" style={{ textDecoration: 'none' }}>
          <h3>{ props.product.name }</h3>
        </div>

        <div className="text-dark mt-1" >
          <b>MAC:</b> { props.product.device?.mac }
        </div>

        <div className="text-dark mt-1" >
          <b>Status:</b> { props.product.unavailable ? "Disconnected" : "Connected"}
        </div>

        {
          props.product.unavailable === false ?
          <div>
            <div className="text-dark mt-1" >
              <b>Type:</b> { props.product.device.type }
            </div>

            <div className="text-dark mt-1" >
              <b>Version:</b> { props.product.device.ver }
            </div>

            <div className="text-dark mt-1" >
              <b>Coin Meter:</b> { props.product.device.coinMeter / 10 }
            </div>

            <div className="text-dark mt-1" >
              <b>Cash Float: </b>{props.product.device.cashFloat / 10 }
            </div>

            <div className="text-dark mt-1" >
              <b>Pulses: </b>{props.product.device?.pulses }
            </div>

            <div className="text-dark mt-1" >
              <b>Card transactions: </b>{props.product.device.numberOfCardTransactions }
            </div>

            <div className="text-dark mt-1" >
              <b>Lifetime Card: </b>{props.product.device.lifetimeCard }
            </div>

            <div>
              <div className="text-dark mt-1" >
                <b>Last Reset:</b> 
              </div>

              <div>
                { props.product.device.cashFloatReset }
              </div>
            </div>
            <div>
              <div className="text-dark mt-1" >
                <b>Card Since Reset: </b>{ props.product.device.cardSinceReset }
              </div>
            </div>
          </div>
          :
          <></>
        }
      </Link>
    </div>
    :
    <></>
  );
}

export default DeviceCard;
