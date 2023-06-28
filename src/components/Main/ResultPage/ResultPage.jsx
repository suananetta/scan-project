import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import parse from 'html-react-parser';

import './ResultPage.css';

import Button from '../../_general/Button/Button';
import {LoaderCircle, LoaderDots} from '../../_general/Loader/Loaders';
import Article from './Article/Article';
import { SearchingResult } from '../../_assets/images/backgrounds';
import Slider from './Slider/Slider';

function ResultPage() {
    const searchResult = useSelector((state) => state.search);
    const hisLoading = useSelector((state) => state.search.histogramsLoading);
    const docsLoading = useSelector((state) => state.search.docsLoading);

    const parser = new DOMParser();

    let getTotalNum = (arr) => {
        let sum = 0;
        if(arr !== []) {
            arr.map(histogram => {
                sum += histogram.value;
            })
            return sum;
        } else {
            return 0;
        }
    }
    const [articles, setArticles] = useState([]);
    let [histogramsTotal, setHistogramsTotal] = useState(0);

    useEffect(() => {
        if(searchResult.histograms.length !== 0) {
            setHistogramsTotal(searchResult.histograms.length === 0? 0 : getTotalNum([...searchResult.histograms[0].data]));
            setArticles([...searchResult.documents].slice(0, 10));
        }
    }, [searchResult])
    
    return (
            <main className='result'>
                {hisLoading?
                    <div className='result_loading'>
                        <div className='result_loading_item'>
                            <div className='result_loading_title'>
                                <h2>Ищем. Скоро будут результаты</h2>
                                <div className='loader'><LoaderDots hw='60' radius='7'></LoaderDots></div>
                            </div>
                            <p>Поиск может занять некоторое время, <br/>просим сохранять терпение</p>
                        </div>
                        <div className='result_bg'><SearchingResult/></div>
                    </div> 
                    : 
                    <div className='result_info'>
                        <h5>Общая сводка</h5>
                        <span className='result_total'>{`Найдено ${histogramsTotal} вариантов`}</span>
                        { searchResult.histograms.length === 0? 
                            <p>Данных по заданным параметрам не найдено!</p>
                            :
                            <Slider/>}
                    </div>
                }
                
                <div>
                    <h5 className='list_title'>Список документов</h5>
                    {articles.length === 0?
                        <div className='result_load'>
                        <LoaderCircle
                            strokeWidth={5}
                            animationDuration={1.3}
                            width={100}
                        />
                        </div>
                        :
                        <div className='result_list'>
                            <div className='articles_block'>
                            {articles.map(article => {
                                let articleContent = parse(parser.parseFromString(article.ok.content.markup,"text/xml").activeElement.textContent);
                                let artIMG = typeof(articleContent) == 'object'?
                                                articleContent
                                                    .map(obj => {
                                                        if(typeof(obj) !== 'string') {
                                                            if(obj.type == 'img' || obj.type == 'figure') {
                                                                if(obj.props.src != '' || obj.props.src != ' ') {
                                                                    return obj.props.src
                                                                }
                                                            } 
                                                        }
                                                        
                                                    })
                                                    .filter(item => item != undefined)[0]
                                                :
                                                '';
                                return (
                                <Article
                                    date={moment(article.ok.issueDate).format('DD.MM.YYYY')}
                                    sourceName={article.ok.source.name}
                                    sourceLink={article.ok.url}
                                    title={article.ok.title.text}
                                    badge={
                                        article.ok.attributes.isTechNews? 'Технические новости' :
                                        article.ok.attributes.isAnnouncement? 'Объявление' :
                                        article.ok.attributes.isDigest? 'Дайджест' : 'Интересное'
                                    }
                                    img={artIMG}
                                    content={article.ok.content.markup}
                                    words={article.ok.attributes.wordCount}
                                />
                                )
                            })}
                            </div>
                            
                            {articles.length < searchResult.documents.length?
                                <Button
                                    btnClass={articles.length === 100? 'more_btn end' : 'more_btn'}
                                    btnName='Показать больше'
                                    disabled={false}
                                    onClick={()=>{setArticles([...searchResult.documents].slice(0, articles.length + 10));}}
                                /> :
                                <></>
                            }
                        </div>
                    }
                </div>
            </main>
    )
}

export default ResultPage;
