import {useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Product } from '../models/Product'
import { money } from '../utils/Money'
import { PaymentContext } from '../contexts/PaymentContext';
import WSClient from '../utils/WSClient'
import { KioskContext } from '../contexts/KioskContext';
import { fs } from '@tauri-apps/api';
export interface ProductProps {
  product: Product;
}

function ProductCard(props: ProductProps) {
  const history = useNavigate()
  const kiosk = useContext(KioskContext)
  const payment = useContext(PaymentContext)
  const [productImage, setProductImage] = useState<string | null>(null);

 

  useEffect(() => {
    
    const readFile = async () => {
      const img = props.product.image
      return img;
    }
    const loadImage = async () => {
      let imagePath = await readFile();
      if(imagePath == null || imagePath == "") return;
      console.log('imagePath: ', imagePath);
    
      // Read the image file
      const imageBytes = await fs.readBinaryFile(imagePath);
      console.log('imageBytes: ', imageBytes);
      // Convert the image bytes to a base64 string
      const base64Image = btoa(
        new Uint8Array(imageBytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
        console.log('base64Image: ', base64Image);
      // Set the base64 image as src
      setProductImage(`data:image/jpeg;base64,${base64Image}`);

   
   
    };


  
    loadImage();
  }, [props.product]);

  function checkout() {
    payment.product = props.product

    const newState = {
      productID: props.product.id,
      productName: props.product.name,
      productPrice: props.product.price,
    }
    let client = WSClient.getInstance()
    client.pay(props.product.price, "GBP", props.product.id)
    history("/checkout", { state: newState })
  }


  return (
    <Link 
      to="/checkout" 
      onClick={props.product.unavailable ? event => event.preventDefault() : checkout}
      className="card card-product shadow-sm text-decoration-none"
      style={{ borderTop: "3px solid "+ kiosk.primaryColor }}
    >
      
      <div className="card-img-wrapper">
        {productImage ? (
          <img src={productImage} alt="Product" className="card-img-top" onDragStart={(event)=> event.preventDefault()}/>
        ) : (
          <div>Loading image...</div>
        )}
      </div>
      <div className="text-center my-auto"></div>
      <div className="card-body d-flex flex-column" >
        <h5 className="font-weight-bold text-truncate" style={{ textDecoration: 'none' }}>
          { props.product.name }
        </h5>
        <div className="product-description text-muted m-0"> 
          { props.product.unavailable ?  "Currently unavailable." : props.product.desc}
        </div>
        <div className="text-center my-auto"></div>
        <div className="d-flex justify-content-between" style={{ maxHeight: '24px' }}>
          <h6 className="text-dark font-weight-bold mt-1" >
            Price: 
          </h6>
          <h5 className="price" style={{ color: kiosk.primaryColor, fontWeight: 900 }}>
            £{ money(props.product.price) }
          </h5>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
