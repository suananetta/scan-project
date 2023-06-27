import { useSelector } from 'react-redux';

import './Card.css';

import Button from '../../_general/Button/Button';

function Card({ active, customClass, rateName, rateIcon, ratePrice, rateDescription }) {
    const userInfo = useSelector((state) => state.user);

    return (
        <div className={`rate_card ${customClass} ${active && userInfo.active? 'active':''}`}>
            <div className={`rate_name ${customClass} ${active && userInfo.active? 'active':''}`}>
                <div className={`rate_name_item ${customClass} ${active && userInfo.active? 'active':''}`}>{rateName}</div>
                <div className='rate_name_icon'>{rateIcon}</div>
            </div>
            {active && userInfo.active? 
                <div className='current_rate_wrapper'>
                    <span className='current_rate'>Текущий тариф</span> 
                </div> 
                : 
                <></>
            }
            <div className={`rate_price ${customClass} ${active && userInfo.active? 'active':''}`}>
                {ratePrice}
            </div>
            <div className='rate_description'>
                <span className='rate_description_header'>В тариф входит:</span><br/>
                {rateDescription}
                <Button
                    btnClass='btnRates'
                    btnName={active && userInfo.active? 'Перейти в личный кабинет':'Подробнее'}
                    disabled={active && userInfo.active? true : false}
                    onClick={()=>{}}
                />
            </div>
        </div>
    )
}

export default Card;