import ReactDOM from 'react-dom';
import Product from '../../models/Product';
import ProductRow from './ProductRow';
const dummyProduct: Product = new Product("Dummy Product", "description of a dummy", "dummyImageString", 11.11, "DummyPath", [])

it('Product Row Should Mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductRow product={dummyProduct} disabled={false}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});