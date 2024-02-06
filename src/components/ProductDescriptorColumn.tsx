import { Col, Row } from 'reactstrap';
import TextBox from './TextBox';

export interface ProductDescriptorColumnProps {
    discriptors: string[];
  }

function ProductDescriptorColumn(props: ProductDescriptorColumnProps) {  
  
    var rows : React.ReactElement[]= []
    rows.push(<Row className="align-items-center" key={"Product descriptor: blank" } style={{height:38}}><TextBox color="transparent" text={""} textAlignment="left"></TextBox></Row>)
    props.discriptors.forEach((s) => {
      rows.push(<Row className="align-items-center" key={"Product descriptor:" + s } style={{height:38}}><TextBox text={s} textAlignment="left"/></Row>)
    })
    rows.push(<Row className="align-items-center" key={"Product descriptor: price" } style={{height:38}}><div style={{width:"18%", marginLeft: "auto", marginRight:"30px"}}><TextBox text={"Price"} textAlignment="right"></TextBox></div></Row>)
    

    return (
      <Col className="col-auto" style={{paddingLeft: "0", paddingRight:"1%", margin: "0",  borderRight: "5px double white"}}>
        {rows}
      </Col>
    );
  }

export default ProductDescriptorColumn;
