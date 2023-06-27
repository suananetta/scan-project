import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useResize } from '../../../_hooks/useResize';
import moment from 'moment';

import Button from '../../../_general/Button/Button';
import { Arrow_right, Arrow_left } from '../../../_assets/images/arrows';
import { LoaderCircle } from '../../../_general/Loader/Loaders';

function Slider() {
    const histograms = useSelector((state) => state.search.histograms[0].data);
    let arr = [...histograms].sort((a,b) => moment(a.date)-moment(b.date));
    const risks = useSelector((state) => state.search.histograms[1].data);

    const [visibleHistograms, setVisibleHistograms] = useState(arr.slice(0, 9));
    
    let screenW = useResize();
    let [start, setStart] = useState(1);
    let [step, setStep] = useState(9);

    useEffect(() => {
        if(screenW <= 1820 && screenW > 1484) {
            setVisibleHistograms(arr.slice(0, 7));
            setStep(7);
        } else if(screenW <= 1484 && screenW > 1190) {
            setVisibleHistograms(arr.slice(0, 4));
            setStep(4);
        } else if(screenW <= 1190 && screenW > 972) {
            setVisibleHistograms(arr.slice(0, 3));
            setStep(3);
        } else if(screenW <= 972 && screenW > 625) {
            setVisibleHistograms(arr.slice(0, 2));
            setStep(2);
        } else if(screenW <= 652) {
            setVisibleHistograms(arr.slice(0, 1));
            setStep(1);
        } else {
            setVisibleHistograms(arr.slice(0, 9));
            setStep(9);
        }
    }, [screenW])


    let handleClick = (e) => {
        if (e.currentTarget.className.includes('right')) {
            setVisibleHistograms(arr.slice(start, start+step));
            setStart(++start);
        } else {
            setStart(--start);
            setVisibleHistograms(arr.slice(start-1, start-1+step));
        }
    }

    return (
        <div className='resul_summary'>
        <Button 
            name='left'
            btnClass='arrows left'
            btnName={<Arrow_left/>}
            disabled={start-1 === 0? true : false}
            onClick={(e) => {handleClick(e)}}
        />
        
        <div className='result_table'>
            <div className='result_table_item headers'>
                <div>Период</div>
                <div>Всего</div>
                <div>Риски</div>
            </div>

            {histograms === []?
                <div className='result_load'>
                    <LoaderCircle
                        strokeWidth={4}
                        animationDuration={1.3}
                        width={70}
                    /> 
                    <span>Загружаем данные</span>
                </div>
                :
                visibleHistograms
                    .map(histogram => {
                        let date = moment(histogram.date).format('DD.MM.YYYY');
                        return <>
                        <div className='result_table_item'>
                            <div>{date}</div>
                            <div className='item_data'>{histogram.value}</div>
                            <div className='item_data'>{risks.map(risk => {
                                if(risk.date === histogram.date) return risk.value
                            })}</div>
                        </div>
                        <div className='table_septum'></div>
                        </>
                    })
                }
        </div>
        <Button 
            name='right'
            btnClass='arrows right'
            btnName={<Arrow_right/>}
            disabled={start+step > histograms.length? true : false}
            onClick={(e) => {handleClick(e)}}
        />
    </div>
    )


}

export default Slider;