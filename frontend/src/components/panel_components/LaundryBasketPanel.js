import {Card, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import basket from '../../icons/basket.png';

function LaundryBasketPanel(){
    const laundryWeight = useSelector((state) => state.laundryReducer.weight);

    let laundryPercent = laundryWeight/9500;
    let strokeDashArrValue = `${laundryPercent*100}, 100`;
    
    return(
        <div>
            <Card border="light" style={{ height: '25rem' }}>
                <div class="flex-wrapper" style={{ marginLeft: '80px', marginTop: '50px' }} class="laundrycontainer">
                    <div class="single-chart" class="image">
                        <svg viewBox="0 0 36 36" class="circular-chart">
                            <path class="circle"
                                stroke-dasharray={strokeDashArrValue}
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <image x="9" y="10" width="20" height="15" href={basket}></image>
                            <div>Icons made by <a href="" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                        </svg>
                    </div>
                    <div class="middle">
                        <Button variant="dark" size="lg" href="/laundry">View Laundry</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default LaundryBasketPanel;