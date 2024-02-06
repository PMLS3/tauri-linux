type circlePointProperties = { opacity?: String };

const CirclePoint = ({ opacity = "0.1" }: circlePointProperties) => (
  <div
    className="row align-items-center"
    style={{
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    <div
      style={{
        width: "25px",
        height: "25px",
        borderColor: `rgba(255,255,255,${opacity})`,
        backgroundColor: `rgba(255,255,255,${opacity})`,
        borderRadius: "25px",
        boxShadow:opacity === "0.0"? "": "1px 1px 5px 1px black"
      }}
    />
  </div>
);

export default CirclePoint;
