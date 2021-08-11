import React from 'react'
import './pagination.css'

function Pagination({noOfPages,paginate,previous,next,currentPageNo}) {

    const pagesArray = [];

    for(let i=1;i<=noOfPages;i++){
        pagesArray.push(i)
    }

    return (
        <div className="pagination__container d-flex justify-content-center mt-5">
            <ul className="pagination">
                <li className="page-item">
                    <span 
                        className={`page-link ${previous ? null : 'inactive'}`} 
                        onClick={()=> previous ? paginate(parseInt(currentPageNo - 1)) : null} >
                        Previous
                    </span>
                </li>
                {
                    pagesArray.map((item,index)=>{
                        return (
                            <li className="page-item" key={index}>
                                <span 
                                    className={`page-link ${currentPageNo === item ? 'active' : null }`} 
                                    onClick={()=>paginate(item)}
                                >
                                    {item}
                                </span>
                            </li>
                        )
                    })
                }
                
                <li className="page-item">
                    <span 
                        className={`page-link ${next ? null : 'inactive'}`} 
                        onClick={()=> next ? paginate(parseInt(currentPageNo + 1)) : null} >
                        Next
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Pagination
