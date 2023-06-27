import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from "../../../_general/Button/Button";
import { Icon_google, Icon_fb, Icon_yandex } from '../../../_assets/images/icons';
import { requestUserInfo } from '../../../_redux/features/userSlice';
 
function Form() {
    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const [ loginValue, setLoginValue] = useState('');
    const [ passwordValue, setPasswordValue] = useState('');
    const [ btnRegistration, setbtnRegistration ] = useState(false);
    
    const userData = {
        login: loginValue,
        password: passwordValue
    };

    return (
        <div className='form_block'>
            <div className='form_btns'>
                <Button
                    btnClass={!btnRegistration? 'form_btn active' : 'form_btn'}
                    btnName='Войти'
                    disabled={false}
                    onClick={()=>{setbtnRegistration(!btnRegistration)}}
                />
                <Button
                    btnClass={btnRegistration? 'form_btn active' : 'form_btn'}
                    btnName='Зарегистрироваться'
                    disabled={false}
                    onClick={()=>{setbtnRegistration(!btnRegistration)}}
                />
            </div>
            <form className='autho_form'>
                    {/* {btnRegistration?
                        <>
                            <span className='authorization-item'>Имя:</span>
                            <input className='autho-input' type='text' name='login' placeholder='' onChange={(e) => {setFNValue(e.target.value)}} required/>
                            <span className='authorization-item'>Фамилия:</span>
                            <input className='autho-input' type='text' name='login' placeholder='' onChange={(e) => {setLNValue(e.target.value)}} required/>
                        </> : ''} */}
                    <span className='authorization-item'>Логин или номер телефона:</span>
                    <input className='autho-input' type='text' name='login' placeholder='' onChange={(e) => {setLoginValue(e.target.value)}} required/>
                    <span className='authorization-item'>Пароль:</span>
                    <input className='autho-input' type='password' name='password' placeholder='' onChange={(e) => {setPasswordValue(e.target.value)}} required/>
            </form>
            <Button
                btnClass='autho_btn'
                btnName='Войти'
                type='submit'
                disabled={loginValue.trim().length === 0 || passwordValue.trim().length === 0? true : false}
                onClick={() => {
                    dispatch(requestUserInfo(userData))
                    navigate('/');
                }}
            />
                <a href='#' className='pas_restore'>Восстановить пароль</a>
            <div className='autho_options'>
                <span>Войти через:</span>
                <div className='option_btns'>
                    <Button
                        btnClass='option_btn'
                        btnName={<Icon_google/>}
                        disabled={false}
                        onClick={()=>{}}
                    />
                    <Button
                        btnClass='option_btn'
                        btnName={<Icon_fb/>}
                        disabled={false}
                        onClick={()=>{}}
                    />
                    <Button
                        btnClass='option_btn'
                        btnName={<Icon_yandex/>}
                        disabled={false}
                        onClick={()=>{}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Form;