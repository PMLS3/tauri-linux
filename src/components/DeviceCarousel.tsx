import { useState, useContext } from 'react';
import { KioskContext, DevicePagesContext } from '../contexts/KioskContext';
import { Carousel, CarouselItem, CarouselIndicators, } from 'reactstrap';
import DeviceCard from '../components/DeviceCard';


function DeviceCarousel() {
    const kiosk = useContext(KioskContext)
    const pages = useContext(DevicePagesContext)
    const [transitioning, setTransitioning] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    function columnClass(): string {
        if (kiosk.perPage === 1) {
          return "col-sm-12"
        } else if (kiosk.perPage === 2) {
          return "col-sm-6"
        } else if (kiosk.perPage === 3) {
          return "col-sm-4"
        } else if (kiosk.perPage === 4) {
          return "col-sm-3"
        } else {
          return "col-sm-3"
        }
      }
    
      function renderColumnDevices() {
        const customClass = columnClass() + "d-flex px-2"
        return pages.map((page, index) =>
          <CarouselItem
            onExiting={() => setTransitioning(true) }
            onExited={() => setTransitioning(false) }
            key={'carousel-item-'+index}
          >
            <div className="container-fluid">
              <div className="row equal">
                { page.products.map((product) => 
                  <div key={'device-'+product.name} className={ customClass }>
                    <DeviceCard product={product}/>
                  </div>
                )}
              </div>
            </div>
          </CarouselItem>
        );
      }
    
      function next() {
        if (transitioning) return;
        const newIndex = activeIndex === pages.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex)
      }
    
      function previous() {
        if (transitioning) return;
        const newIndex = activeIndex === 0 ? pages.length - 1 : activeIndex - 1;
        console.log('New index: ' + activeIndex);
        setActiveIndex(newIndex)
      }
    
      function toIndex(index: number) {
        console.log('toIndex => ' + index);
        if (transitioning) return;
        setActiveIndex(index)
      }
    
    return (
        <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={false}
        key="carousel"
        >
        { renderColumnDevices() }
        <CarouselIndicators items={pages} activeIndex={activeIndex} onClickHandler={toIndex}/>
        </Carousel>
    )
}

export default DeviceCarousel;