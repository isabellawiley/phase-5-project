import { useSelector } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SugGarmPanelCard from './SugGarmPanelCard';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 40 
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30 
    }
  };

function SuggestedGarmentsPanel({addToLaundry}){
    const suggestedGarms = useSelector((state) => state.garmentReducer.suggestedGarments);
    let list = suggestedGarms.map((garment) => {
        return(<SugGarmPanelCard key={garment.id} garment={garment} addToLaundry={addToLaundry} />)
    })
    
    return(
        <div>
            <h1>Suggested Garments</h1>
            <Carousel partialVisible={true} responsive={responsive} infinite={true} autoPlay={true} >
                {list}
                <Card style={{ height: '25rem' }} className="m-auto">
                  <Button className="m-auto" href="/suggested" variant="outline-dark" size="lg">View All Suggested Garments</Button>
                </Card>
            </Carousel>
        </div>
    )
}

export default SuggestedGarmentsPanel;