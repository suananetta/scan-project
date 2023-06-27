import { useEffect, useState } from 'react';
import uniqid from 'uniqid';

import Button from '../../_general/Button/Button';
import { Reasons } from '../../_general/config'
import { Arrow_right, Arrow_left } from '../../_assets/images/arrows'

import { useResize } from '../../_hooks/useResize';

function Slider() {
    let screenW = useResize();
    let [sliderArr, setSliderArr] = useState(Reasons);
    let [singleCase, setSingleCase] = useState(false);
    
    useEffect(() => {
        if(screenW <= 1220) {
            setSingleCase(true);
            setSliderArr(sliderArr.map((item, index) => {
                if(index !== 0) item.visability = false;
                return item;
            }));
        } else {
            setSingleCase(false);
            setSliderArr(sliderArr.map((item, index) => {
                if(index <= 2) item.visability = true;
                return item;
            }));
        }
    }, [screenW])

    let handleClick = (e) => {
        let newArr = [];
        let curSlide = sliderArr.findIndex(item => item.visability === true);

        if (e.currentTarget.className.includes('right')) {
            if(singleCase) {
                sliderArr.map((item, index) => {
                    if(index === curSlide) {
                        index+1 > sliderArr.length-1? sliderArr[0].visability = true : sliderArr[index+1].visability = true; 
                        item.visability = false;
                    }
                    return item;
                });
                newArr = [...sliderArr];
            } else {
                sliderArr.map((item, index) => {
                    if(index === curSlide) {
                        item.visability = false;
                        sliderArr.shift(item);
                        sliderArr.push(item);
                        index+2 > sliderArr.length-1? sliderArr[0].visability = true : sliderArr[index+2].visability = true; 
                    }
                });
                newArr = [...sliderArr]
            }
        } else {
            if(singleCase) {
                sliderArr.map((item, index) => {
                    if(index === curSlide) {
                        item.visability = false;
                        index-1 < 0? sliderArr[sliderArr.length-1].visability = true : sliderArr[index-1].visability = true; 
                    }
                });
                newArr = [...sliderArr]
            } else {
                sliderArr.map((item, index) => {
                    if(index === curSlide) {
                        sliderArr[2].visability = false;
                        sliderArr.unshift(sliderArr[sliderArr.length-1]);
                        sliderArr.pop(sliderArr[sliderArr.length-1]);
                        sliderArr[0].visability = true;
                    }
                });
                newArr = [...sliderArr]
            }
        }
        setSliderArr(newArr);
    }

    return (
        <div className='slider'>
            <Button name='left'
                btnClass='arrows left'
                btnName={<Arrow_left/>}
                disabled={false}
                onClick={handleClick}
            />
            <div className='slider_block'>
                    {sliderArr.map(reason => {
                        return reason.visability? 
                            <div className='slider_item' key={uniqid()}>
                                <div className='slider_icon'>{reason.icon}</div>
                                <span className='slider_text'>{reason.description}</span>
                            </div> : <></>;
                    })
                    }
            </div>
            <Button
                btnClass='arrows right'
                btnName={<Arrow_right/>}
                disabled={false}
                onClick={handleClick}
            />
        </div>
    )
}

export default Slider;