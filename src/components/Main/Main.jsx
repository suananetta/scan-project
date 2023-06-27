import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';

import './Main.css';

import Button from '../_general/Button/Button';
import Slider from './Slider/Slider';
import Card from './Card/Card';
import { ReasonsBackground } from '../_assets/images/backgrounds';
import { Rates } from '../_general/config';
import { Icon_check } from '../_assets/images/icons';


function Main() {
    const userStatus = useSelector((state) => state.user.active);

    return (
        <main>
            <section className='enter_block'>
                <div className='enter_info'>
                    <h1>сервис по поиску публикаций о компании по её ИНН</h1>
                    <p className='enter_p'>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                    {userStatus? 
                        <Link to='/searchPage'>
                            <Button
                                btnClass='main_btn'
                                btnName='Запросить данные'
                                disabled={false}
                                onClick={()=>{}}
                            />
                        </Link>
                    : ''}

                </div>
                <div>
                <img className='enter_background' src={require('../_assets/images/main_enter.png')} alt='enter_background' />
                </div>
            </section>

            <section className='reasons_block'>
                <h3>Почему именно мы</h3>
                <Slider key={uniqid()}/>
                <ReasonsBackground/>
            </section>

            <section className='rates_block'>
                <h3>наши тарифы</h3>
                <div className='rates_cards'>
                {
                    Rates.map(rate => {
                        return (
                            <Card
                                key={uniqid()}
                                active={rate.active}
                                customClass={rate.name.toLowerCase()}
                                rateName={
                                    <>
                                    <h4>{rate.name}</h4>
                                    <span>{rate.content}</span>
                                    </>
                                }
                                rateIcon={rate.icon}
                                ratePrice={
                                    <>
                                        <div className='prices'>
                                            <span className='price'>{rate.price}</span>
                                            <span className='old_price'>{rate.old_price}</span>
                                        </div>
                                        <span>{rate.installment}</span>
                                    </>
                                }
                                rateDescription={
                                    rate.description.map(item => {
                                        return (
                                            <div className='rate_description_item'>
                                                <Icon_check /><span>{item}</span><br/>
                                            </div>
                                        )
                                    })
                                }
                            />
                        )
                    })
                }
                </div>

            </section>

        </main>
    )
}

export default Main;