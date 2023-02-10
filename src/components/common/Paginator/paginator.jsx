import React, { useState } from "react";
import s from './paginator.module.css';

let Paginator = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {
     
    let pagesCount = Math.ceil (totalItemsCount / pageSize);   //высчитываем количество страниц

    let pages = [];   //создаем массив куда будут добавляться страницы с помощью цикла for

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }  
    
    let portionCount = Math.ceil(pagesCount / portionSize);   //из props к нам приходит,  portionCount - сколько порций получилось
    let [portionNumber, setPortionNumber] = useState(1);      // используем локальный state - 1 это portionNumber, а setPortionNumber - функция, которая меняет portionNumber 
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return  <div className={s.paginator}>  
      {portionNumber > 1 &&                                       // показывай кнопку если portionNumber > 1
         <button onClick={() => {setPortionNumber(portionNumber - 1)}} className={s.pageBtn}>PREV</button>
      }                            
                {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber ) //нужно отрисовать странички больше левой половины и меньше правой половины порции
                .map(p => {
                  return <span key={p} className={(currentPage === p ? s.selectedPage : undefined) + ' ' + s.pageNumber}
                  onClick={() => {onPageChanged(p)}}>{p}</span>    //создаем страницы и добавляем выделение для текущей страницы
                })}

      {portionCount > portionNumber && 
         <button onClick={() => {setPortionNumber(portionNumber + 1)}} className={s.pageBtn}>NEXT</button>
      }   
                
            </div>
   }

   export default Paginator;     