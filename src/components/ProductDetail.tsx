import { useContext } from 'react';
// import { useNavigate } from "react-router-dom";

import { Product } from '../models/Product'
import { money } from '../utils/Money'
import { KioskContext } from '../contexts/KioskContext';
import { PaymentContext } from '../contexts/PaymentContext';

export interface ProductProps {
  product: Product;
  cancelled: boolean;
}

function ProductDetail(props: ProductProps) {
  const kiosk = useContext(KioskContext)
  const payment = useContext(PaymentContext)

  return (
    <div className="card card-product-detail content-view shadow-sm clearfix">
      <div className="text-left">
        <img src={props.product.image} onDragStart={(event)=> event.preventDefault()} className="rounded m-3" alt="..." style={{ maxHeight: '13vh' }}/>
      </div>
      <div className="card-body bg-white pt-0">
        <h5 className="card-title font-weight-bold mt-2">
          { props.product.name }
        </h5>

        <p className="card-text text-muted">{ props.product.desc }</p>
        <p>
          { props.product.tags ? props.product.tags.map(t => (
            <span 
              key={props.product.id + "-" + t} 
              className="badge rounded-pill text-white mr-1" 
              style={{ backgroundColor: kiosk.primaryColor }}
            >
              { t }
            </span>
          )) : null }
        </p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          { props.cancelled
            ? <del>1 x { props.product.name }</del>
            : <span>1 x { props.product.name }</span>
          }

          { props.cancelled
            ? <del className="price">£{ money(0) }</del>
            : <span className="price">£{ money(payment.product.price) }</span>
          }
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Total</h5>
            { props.cancelled
              ? <span className="price">£{ money(0) }</span>
              : <span className="price">£{ money(payment.product.price) }</span>
            }
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProductDetail;
