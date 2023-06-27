import './Footer.css';

function Footer() {
    return (
        <footer>
            <div>
                <img className="footer_logo" src={require('../_assets/images/logo_scan_footer.png')} alt='logo' />
            </div> 
            <div className='footer_info'>
                <span className='footer_info_item'>г. Москва, Цветной б-р, 40</span>
                <span className='footer_info_item'>+7 495 771 21 11</span>
                <span className='footer_info_item'>info@skan.ru</span>
                <span className='footer_info_item cr'>Copyright. 2022</span>
            </div>
        </footer>
    )
}

export default Footer;