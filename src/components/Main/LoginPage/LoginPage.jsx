import './LoginPage.css';

import { EnterBackground } from '../../_assets/images/backgrounds'
import { Icon_lock } from '../../_assets/images/icons'
import Form from './Form/LoginForm';


function LoginPage() {
    return (
        <>
            <main className='authorization'>
                <div className='info_block'>
                    <div className='info_block_item'> 
                        <h2>Для оформления подписки на тариф, необходимо авторизоваться.</h2>
                    </div> 
                    <div className='info_block_background'><EnterBackground/></div>
                </div>
                <div className='login_block'>
                    <div className='lock'><Icon_lock/></div>
                    <Form/>
                </div>
            </main>
        </>
    )
}

export default LoginPage;