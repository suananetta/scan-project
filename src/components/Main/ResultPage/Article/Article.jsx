import { Link } from 'react-router-dom'
import parse from 'html-react-parser';

import Button from '../../../_general/Button/Button';

function Article(props) {
    let { date, sourceName, sourceLink, title, badge, img, content, words} = props;

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(content,"text/xml");

    return (
        <div className='article_wrapper'>
            <div className='article'>
                <div className='article_params'>
                    <span className='article_params_date'>{date}</span>
                    <a className='article_params_link' href={sourceLink}>{sourceName}</a>
                </div>
                <span className='article_title'>{title}</span>
                <div className='article_badge tech'>{badge}</div>
                <img className='article_img' src={!img? require('../../../_assets/images/article_mock.jpg'): img} alt='article_img' />
                <div className='article_content'>{parse(xmlDoc.activeElement.textContent.slice(0, 700))}...</div>
                <div className='article_footer'>
                <Link to={sourceLink}>
                    <Button
                        btnClass='article_btn'
                        btnName='Читать в источнике'
                        disabled={false}
                        onClick={()=>{}}
                    />
                </Link>
                    <div className='article_words'>{words} слова</div>
                </div>
            </div>
        </div>
    )
}

export default Article;
