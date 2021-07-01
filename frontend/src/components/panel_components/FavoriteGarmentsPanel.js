import { useSelector } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import FavGarmPanelCard from "./FavGarmPanelCard";
import {Card, Button} from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';

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

function FavoriteGarmentsPanel({addToLaundry}){
    const favoriteGarms = useSelector((state) => state.garmentReducer.favoriteGarments);
    let list = favoriteGarms.map((garment) => {
        return(<FavGarmPanelCard key={garment.id} garment={garment} addToLaundry={addToLaundry}/>)
    })

    return(
        <div>
            <h1>Favorite Garments</h1>
            <Carousel partialVisible={true} responsive={responsive} infinite={true} autoPlay={true} >
                {list}
                <Card style={{ height: '25rem' }} className="m-auto">
                  <Button className="m-auto" href="/garments" variant="outline-dark" size="lg">View All Garments</Button>
                </Card>
            </Carousel>
        </div>
    )
}

export default FavoriteGarmentsPanel;