import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  Container,
  Row,
  Col,
} from "reactstrap";
import { ProductPagesContext } from "../../contexts/KioskContext";
import TieredProductCard from "../../components/TieredProductCard";
import ProductDescriptorColumn from "../../components/ProductDescriptorColumn";

function TieredProductSelectionPage() {
  const pages = useContext(ProductPagesContext);

  const [transitioning, setTransitioning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const history = useNavigate();
  const descriptions = Array.from(PopulateDiscriptors());
  const [timerCounter, setTimerCounter] = useState(0)
  useEffect(() => {

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimerCounter(timerCounter+1)
      if (timerCounter >= 60) {
        history('/')
      }
    }, 1000); // every 1 second 


    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);

  });

  function PopulateDiscriptors(): Set<string> {
    const discriptors: Set<string> = new Set();
    pages.forEach((page) => {
      page.products.forEach((product) => {
        product.tags.forEach((tag) => {
          discriptors.add(tag);
        });
      });
    });
    return discriptors;
  }

  function next() {
    if (transitioning) return;
    const newIndex = activeIndex === pages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  }

  function previous() {
    if (transitioning) return;
    const newIndex = activeIndex === 0 ? pages.length - 1 : activeIndex - 1;
    console.log("New index: " + activeIndex);
    setActiveIndex(newIndex);
  }

  function toIndex(index: number) {
    console.log("toIndex => " + index);
    if (transitioning) return;
    setActiveIndex(index);
  }

  function renderColumnProducts() {
    return pages.map((page, index) => (
      <CarouselItem
        onExiting={() => setTransitioning(true)}
        onExited={() => setTransitioning(false)}
        key={"carousel-item-" + index}
      >
        <Row style={{ margin: 0 }}>
          {page.products.map((product) => (
              <TieredProductCard
                key={"TieredProductCard:" + product.name}
                product={product}
                descriptions={descriptions}
              />
          ))}
        </Row>
      </CarouselItem>
    ));
  }

  function renderCarousel() {
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={false}
        key="carousel"
      >
        {renderColumnProducts()}
        <CarouselIndicators
          items={pages}
          activeIndex={activeIndex}
          onClickHandler={toIndex}
        />
      </Carousel>
    );
  }

  return (
    <div style={{ backgroundColor: "gray" }}>
      <Container style={{ padding: 0 }}>
        <Row >
          <ProductDescriptorColumn discriptors={descriptions} />
          <Col style={{ padding: 0}}>
            {renderCarousel()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TieredProductSelectionPage;
