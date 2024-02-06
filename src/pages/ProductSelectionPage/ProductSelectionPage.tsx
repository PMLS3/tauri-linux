import  { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';
import ProductCard from '../../components/ProductCard';
import { KioskContext, ProductPagesContext } from '../../contexts/KioskContext';
import WSClient from '../../utils/WSClient';

function ProductSelectionPage() {
  const kiosk = useContext(KioskContext);
  const pages = useContext(ProductPagesContext);

  const [transitioning, setTransitioning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const history = useNavigate();
  const [timerCounter, setTimerCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerCounter((prevCounter) => prevCounter + 1);
      if (timerCounter >= 60) {
        history('/');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [history, timerCounter]);

  const buttonRef = useRef(null);
  const touchStartX: any = useRef(null);

  const previous = useCallback(() => {
    if (transitioning) return;
    const newIndex = activeIndex === 0 ? pages.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    WSClient.getInstance().cancel()
  }, [activeIndex, transitioning, pages]);

  const next = useCallback(() => {
    if (transitioning) return;
    const newIndex = activeIndex === pages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    WSClient.getInstance().cancel()
  }, [activeIndex, transitioning, pages]);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      WSClient.getInstance().cancel()
      if (event.touches.length > 0) {
        touchStartX.current = event.touches[0].clientX;
      }
    };
  
    const handleTouchEnd = (event: TouchEvent) => {
      WSClient.getInstance().cancel()
      if (touchStartX.current !== null && event.changedTouches.length > 0) {
        const touchEndX = event.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX.current;
  
        if (deltaX > 50) {
          // Swipe to the right
          setTransitioning(true);
          previous();
        } else if (deltaX < -50) {
          // Swipe to the left
          setTransitioning(true);
          next();
        }
      }
  
      touchStartX.current = null;
    };
  
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
  
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [previous, next]);

  if (kiosk.disableProductSelectionPage) {
    return <Navigate to="/" />;
  }

  function renderColumnProducts() {
    const klazz = 'col-sm-3 d-flex px-2';
    return pages.map((page, index) => (
      <CarouselItem
        onExiting={() => setTransitioning(true)}
        onExited={() => setTransitioning(false)}
        key={`carousel-item-${index}`}
      >
        <div className="container-fluid">
          <div className="row equal">
            {page.products.map((product) => (
              <div key={`product-${product.id}`} className={klazz}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </CarouselItem>
    ));
  }

  function renderCarousel() {
    return (
      <Carousel activeIndex={activeIndex} next={next} previous={previous} interval={false} key="carousel">
        {renderColumnProducts()}
        <CarouselIndicators items={pages} activeIndex={activeIndex} onClickHandler={(index) => setActiveIndex(index)} />
      </Carousel>
    );
  }

  function renderEmptyProducts() {
    return (
      <div className="content-bg d-flex flex-column text-center">
        <div className="my-auto" />
        <div className="">
          <h1>Loading Kiosk</h1>
          <p className="lead">Establishing connection...</p>
        </div>
        <div className="my-auto" />
      </div>
    );
  }

  function renderNavigationButtons() {
    return (
      <div className="page-navigator d-flex justify-content-between">
        <button
          ref={buttonRef}
          className="btn btn-secondary btn-lg prev"
          onClick={previous}
          style={{ backgroundColor: kiosk.primaryColor }}
        >
          <i className="fa fa-lg fa-chevron-left mr-3" />
          PREV
        </button>
        <button
          ref={buttonRef}
          className="btn btn-secondary btn-lg next"
          onClick={next}
          style={{ backgroundColor: kiosk.primaryColor }}
        >
          NEXT
          <i className="fa fa-lg fa-chevron-right ml-3" />
        </button>
      </div>
    );
  }

  function renderReloadButton() {
    return (
      <div className="page-navigator d-flex justify-content-center">
        <a href="/" className="btn btn-secondary btn-lg">
          <i className="fa fa-lg fa-refresh mr-3" />
          RELOAD
        </a>
      </div>
    );
  }

  return (
    <section className="product-navigator">
      <div className="content-pane">
        <div className="content-b d-flex flex-column justify-content-between">
          <div className="my-auto"></div>
          {pages.length === 0 ? renderEmptyProducts() : renderCarousel()}
          <div className="my-auto"></div>
        </div>
      </div>
      <div className="footer-pane">{pages.length === 0 ? renderReloadButton() : renderNavigationButtons()}</div>
    </section>
  );
}

export default ProductSelectionPage;
