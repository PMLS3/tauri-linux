import { Badge } from 'reactstrap';


type textBoxProperties = { text?: String, color?: string, textAlignment?: any }

const TextBox = ({text="", color="light", textAlignment="center"}: textBoxProperties) => (
    <Badge color={color} 
    style={{
      boxShadow:color === "transparent"? "": "1px 1px 5px 1px black"
      , width:"100%"
      , height:"20px"
      , margin: "1px"
      , marginRight:"15px"
      , marginLeft:"15px"
      , fontSize: "15px"
      , fontWeight: "bold"
      , textAlign: textAlignment
      , flexWrap: 'nowrap'
      , padding: "2px"
      , paddingTop: "2px"}}>  
      <span>
        <strong>
        {text}
        </strong>
      </span>
    </Badge>
);

export default TextBox;
