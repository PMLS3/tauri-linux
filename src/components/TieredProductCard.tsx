import { Col, Row } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { PaymentContext } from '../contexts/PaymentContext';
import {useContext} from 'react';
import { Product } from '../models/Product'
import WSClient from '../utils/WSClient'
import TextBox from '../components/TextBox';
import CirclePoint from '../components/CirclePoint';

export interface TieredProductCardProps {
    product: Product;
    descriptions: string[];
  }

function TieredProductCard(props: TieredProductCardProps) {
    const history = useNavigate()
    const payment = useContext(PaymentContext)
  
    /// Selects the product, raised on card tap
    function checkout(){
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
  
    var rows : React.ReactElement[] = []
    
    props.descriptions.forEach(descr => {
      rows.push(<Row style={{height: 38, width:"100%", padding:0, margin:0}} key={"CirclePoint: " + Product.name + " : " + descr }><CirclePoint opacity={props.product.tags.includes(descr) ? "1.0" : "0.0"}/></Row>)
    })

    return (
      <Col className="col-3"  style={{borderRightColor:"black", borderRight:"5px double white"}}> 
      <button onClick={checkout} style={{width:"100%", padding: "0%", backgroundColor: "transparent", borderColor: "transparent", border:"0px"}}>
        <Row className="align-items-center" style={{width:"100%", padding:0, margin:0, height:38}} ><TextBox text={props.product.name}></TextBox></Row>
            {rows}
        <Row className="align-items-center" style={{width:"100%", padding:0, margin:0, height:38}}><TextBox text={(props.product.price / 100).toFixed(2)} /></Row>
      </button>
      </Col>
    );
  }

export default TieredProductCard;