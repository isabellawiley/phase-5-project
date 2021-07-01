import {Card} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import basket from '../../icons/basket.png';

function LaundryBasketPanel(){
    const laundryWeight = useSelector((state) => state.laundryReducer.weight);

    let laundryPercent = laundryWeight/9500;
    let strokeDashArrValue = `${laundryPercent*100}, 100`;
    console.log(basket)
    
    return(
        <Card style={{ height: '25rem' }}>
            <div class="flex-wrapper">
                <div class="single-chart">
                    <svg viewBox="0 0 36 36" class="circular-chart">
                        <path class="circle"
                            stroke-dasharray={strokeDashArrValue}
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="17.35" class="percentage">
                            Laundry
                            <img src={basket} />
                        </text>
                        <text x="18" y="23.35" class="percentage">
                            Basket
                            <img src={basket} />
                        </text>
                        <div>Icons made by <a href="" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </svg>
                </div>
            </div>
        </Card>
    )
}

export default LaundryBasketPanel;