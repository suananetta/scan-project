import './SearchPage.css';

import Form from './Form/SearchForm';
import { SearchBackground, SearchBackground_File, SearchBackground_Folders } from '.././../_assets/images/backgrounds'

function SearchPage() {
    return (
        <>
            <section className='search'>
                <div className='search_block'>
                    <h2 className='search_block_item'>Найдите необходимые<br/>данные в пару кликов.</h2>
                    <p className='search_block_item'>Задайте параметры поиска.<br/>Чем больше заполните, тем точнее поиск</p>
                    <Form/>
               </div>
               <div className='bg_block'>
                    <div className='docs_pic'>
                        <div className='docs_pic_item'><SearchBackground_File/></div>
                        <div className='docs_pic_item'><SearchBackground_Folders/></div>
                    </div>
                    <div className='bg_pic'>
                        <div></div>
                        <SearchBackground/>
                    </div>
               </div>
            </section>
        </>
    )
}

export default SearchPage;