// import styles from './ProductRow.module.scss';
import { money } from '../../utils/Money';
import Product from '../../models/Product'

interface ProductData {
  product: Product,
  disabled: boolean
}

function ProductRow(props: ProductData) {
  function priceClass() {
    return (props.disabled) ? "price text-muted" : "price"
  }

  return (
    <li className="d-flex justify-content-between align-items-center">
      { props.disabled
        ? <del>{ props.product.name }</del>
        : <span>{ props.product.name }</span>
      }

      <span className={priceClass()}>
        { props.disabled
          ? <del>£{ money(props.product.price) }</del>
          : <span>£{ money(props.product.price) }</span>
        }
      </span>
    </li>
  )
};

export default ProductRow;
