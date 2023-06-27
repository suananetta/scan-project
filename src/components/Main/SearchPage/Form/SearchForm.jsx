import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import Button from "../../../_general/Button/Button";
import { ErrorMessage } from './errorMessage/errorMessage';
import { getStartDate, getEndDate, getINN, getLimit, getTonality, getChecks, searchRequest, docRequest } from '../../../_redux/features/searchSlice';
import { validateInn, validateLimit, validateDate } from '../../../_general/validation';

function Form() {
    const searchInfo = useSelector((state) => state.search.searchParams);
    const search = useSelector((state) => state.search);

    const dispatch = useDispatch();
    const navigate  = useNavigate();

    let [checks, setChecks] = useState({
        fullness: false,
        inNews: false,
        mainRole: false,
        risk: false,
        techNews: false,
        announcements: false,
        digests: false
    })

    let [disabled, setDisabled] = useState(true);

    let [innError, setInnError] = useState(false);
    let [innErrorMessage, setInnErrorMessage] = useState('');

    let [limitError, setLimitError] = useState(false);
    let [limitErrorMessage, setLimitErrorMessage] = useState('');

    let [curLimit, setCurLimit] = useState('');
    let [curINN, setCurINN] = useState('');

    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');
    let [dateError, setDateError] = useState(false);
    let [dateErrorMessage, setDateErrorMessage] = useState('');

    let handlerCheck = (e) => {
        const pathEvent = e.target.id;
        const valueEvent = e.target.checked;
        setChecks((prevState) => ({
          ...prevState,
          [pathEvent]: valueEvent
        }));
    }

    useEffect(()=>{
        if(curLimit === '' || curINN === '' || startDate === '' || endDate === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [curLimit, curINN, startDate, endDate])

    useEffect(()=>{dispatch(getChecks(checks))}, [checks])

    useEffect(()=>{if(validateDate(startDate, endDate) === true) {
            setDateError(false);
        } else {
            setDisabled(true);
            setDateError(true);
            setDateErrorMessage(validateDate(startDate, endDate));
        }
    }, [startDate, endDate])
    
    return (
        <div className='searchform_block'>
            <form className='search_form'>
                <div className='search_params'>

                    <span className='search_params-item'>ИНН компании*</span>
                        <input 
                            className={innError? 'search_params-input error' : 'search_params-input'}
                            type='text' 
                            name='iden_num' 
                            placeholder='10 цифр' 
                            onChange={(e) => {
                                if(validateInn(e.target.value) === true) {
                                    setInnError(false);
                                    setCurINN(Number(e.target.value))
                                    dispatch(getINN(Number(e.target.value)));
                                } else {
                                    setDisabled(true);
                                    setInnError(true);
                                    setInnErrorMessage(validateInn(e.target.value));
                                }
                            }} 
                            required
                        />
                        {innError? <ErrorMessage err={innErrorMessage}/> : ''}

                    <span className='search_params-item'>Тональность</span>
                        <select 
                            className='select-item' 
                            name='tonality' 
                            onChange={(e) => {
                                dispatch(getTonality(e.target.value))
                            }}>
                            <option value='any'>Любая</option>
                            <option value='positive'>Позитивная</option>
                            <option value='negative'>Негативная</option>
                        </select>

                    <span className='search_params-item'>Количество документов в выдаче*</span>
                        <input 
                            className={limitError? 'search_params-input error' : 'search_params-input'} 
                            type='text' 
                            name='docs' 
                            placeholder='От 1 до 1000' 
                            onChange={(e) => {
                                if(validateLimit(e.target.value) === true) {
                                    setLimitError(false);
                                    setCurLimit(Number(e.target.value))
                                    dispatch(getLimit(Number(e.target.value)));
                                } else {
                                    setDisabled(true);
                                    setLimitError(true);
                                    setLimitErrorMessage(validateLimit(e.target.value));
                                }
                            }} 
                            required
                            />
                            {limitError? <ErrorMessage err={limitErrorMessage}/> : ''}
                            
                    <span className='search_params-item'>Диапазон поиска*</span>
                        <div className='search_dates'>
                        <input 
                                className={dateError? 'select-date error' : 'select-date arrow'}
                                type='text' 
                                placeholder='Дата старта'
                                name='date_end' 
                                onFocus={(e) => {
                                    e.target.type ='date';
                                    e.target.className ='select-date'
                                }} 
                                onBlur={(e) => {
                                    e.target.type ='text';
                                    e.target.className = dateError? 'select-date error' : 'select-date arrow';
                                }}  
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    dispatch(getStartDate(moment(e.target.value).format()));
                                }}                          
                            />
                            <input 
                                className={dateError? 'select-date error' : 'select-date arrow'}
                                type='text' 
                                placeholder='Дата конца'
                                name='date_end' 
                                onFocus={(e) => {
                                    e.target.type ='date';
                                    e.target.className ='select-date'
                                }} 
                                onBlur={(e) => {
                                    e.target.type ='text';
                                    e.target.className = dateError? 'select-date error' : 'select-date arrow';
                                }}    
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                    dispatch(getEndDate(moment(e.target.value).format()));
                                }}                         
                            />
                        </div>
                        <div className='date_error'>{dateError? <ErrorMessage err={dateErrorMessage}/> : ''}</div>
                </div>
                <div className='checks'>
                    <div className='check_option'>
                        <input 
                            className='checkbox_item' 
                            id='fullness' 
                            type='checkbox' 
                            onChange={(e) => {handlerCheck(e)}}/>
                        <label className='checkbox-label' htmlFor='fullness'>Признак максимальной полноты</label>
                    </div>
                    <div className='check_option'>
                        <input 
                            className='checkbox_item' 
                            id='inNews' 
                            type='checkbox' 
                            onChange={(e) => {handlerCheck(e)}}/>
                        <label className='checkbox-label' htmlFor='inNews'>Упоминания в бизнес-контексте</label>
                    </div>
                    <div className='check_option'>
                        <input 
                            className='checkbox_item' 
                            id='mainRole' 
                            type='checkbox' 
                            onChange={(e) => {handlerCheck(e)}}/>
                        <label className='checkbox-label' htmlFor='mainRole'>Главная роль в публикации</label>
                    </div>
                    <div className='check_option'>
                        <input 
                            className='checkbox_item' 
                            id='risk' 
                            type='checkbox' 
                            onChange={(e) => {handlerCheck(e)}}/>
                        <label className='checkbox-label' htmlFor='risk'>Публикации только с риск-факторами</label>
                    </div>
                    <div className='check_option'>
                        <input 
                            className='checkbox_item' 
                            id='techNews' 
                            type='checkbox' 
                            onChange={(e) => {handlerCheck(e)}}/>
                        <label className='checkbox-label' htmlFor='techNews'>Включать технические новости рынков</label>
                    </div>
                    <div className='check_option'>
                        <input 
                            className='checkbox_item' 
                            id='announcements' 
                            type='checkbox' 
                            onChange={(e) => {handlerCheck(e)}}/>
                        <label className='checkbox-label' htmlFor='announcements'>Включать анонсы и календари</label>
                    </div>
                    <div className='check_option'>
                        <input 
                            className="checkbox_item" 
                            id='digests' 
                            type='checkbox'
                            onChange={(e) => {handlerCheck(e)}}/>
                        <label className="checkbox-label" htmlFor='digests'>Включать сводки новостей</label>
                    </div>
                    <div className='searchbtn_block'>
                        <Button
                            btnClass='search_btn'
                            btnName='Поиск'
                            disabled={disabled}
                            onClick={(e)=>{
                                e.preventDefault();
                                dispatch(searchRequest(searchInfo));
                                dispatch(docRequest(searchInfo));
                                navigate('/resultPage');
                            }}
                        />
                        <span className='search_notice'>* Обязательные к заполнению поля</span>
                    </div>
                </div> 
            </form>
        </div>
    )
}

export default Form;