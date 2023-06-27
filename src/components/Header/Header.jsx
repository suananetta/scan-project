import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Header.css';

import Button from '../_general/Button/Button';
import { LoaderCircle } from '../_general/Loader/Loaders';
import { logout } from '../_redux/features/userSlice';
import { showMenu } from '../_redux/features/menuSlice';
import { useResize } from '../_hooks/useResize';
import Menu from './menu/Menu';
import { Icon_burger } from '../_assets/images/icons';

function Header() {
    const userInfo = useSelector((state) => state.user);
    const menuVisability = useSelector((state) => state.menu.menu);

    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const screenW = useResize();
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        if(screenW <= 864) {
            setMobileMenu(true);
        } else {
            setMobileMenu(false);
        }
    }, [screenW])

    return (
        <>
            {menuVisability?
                <Menu/>
                :
                <header>
                    <div>
                        <Link to='/'>
                        <img className="header_logo" src={require('../_assets/images/logo_scan.png')} alt='logo' />
                        </Link>
                    </div> 
                    {mobileMenu? 
                    <></>
                    :
                    <nav className="nav_list">
                            <Link className="nav_list_item" to='/'>Главная</Link>
                            <Link className="nav_list_item" to='/resultPage'>Тарифы</Link>
                            <a className="nav_list_item" href='#'>FAQ</a>
                    </nav>}

                    {userInfo.loading? 
                        <LoaderCircle
                            strokeWidth={5}
                            animationDuration={1.3}
                            width={40}
                        /> 
                        :
                    userInfo.active?
                    <> 
                        <div className='company_info'>
                            <div className='company_info_span'>
                                <span className='company_info_item'>Использовано компаний</span> 
                                <span className='num_used'>{userInfo.companyCount}</span>
                            </div>
                            <div className='company_info_span'>
                                <span className='company_info_item'>Лимит по компаниям</span> 
                                <span className='num_limit'>{userInfo.companyLimit}</span>
                            </div>
                        </div>
                        {mobileMenu?
                        <Button
                            btnClass='menu_btn'
                            btnName={<Icon_burger/>}
                            disabled={false}
                            onClick={()=>{dispatch(showMenu())}}
                        />
                        :
                            <div className='login_block'>
                                <div className='login_info'>
                                    <span className='login_name'>Анна С.</span>
                                    <Button
                                        btnClass='login_enter'
                                        btnName='Выйти'
                                        disabled={false}
                                        onClick={()=>{dispatch(logout())}}
                                    />
                                </div>
                                <div className='login_pic'>
                                </div>
                            </div>
                        }
                    </> 
                    : 
                    <div className='log_in'>
                        {mobileMenu?
                        <Button
                            btnClass='menu_btn'
                            btnName={<Icon_burger/>}
                            disabled={false}
                            onClick={()=>{dispatch(showMenu())}}
                        />
                        :
                        <>
                            <Button
                                btnClass='reg_btn'
                                btnName='Зарегистрироваться'
                                disabled={false}
                                onClick={()=>{navigate('/loginPage')}}
                            />
                            <div className='septum'></div>
                            <Button
                                btnClass='enter_btn'
                                btnName='Войти'
                                disabled={false}
                                onClick={()=>{navigate('/loginPage')}}
                            />
                        </>}
                    </div>
                    }
                </header>}
        </>
    )
}

export default Header;