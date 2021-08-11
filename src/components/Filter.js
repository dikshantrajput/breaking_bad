import React from 'react'
import './filter.css'

function Filter({search, inputRef, input, categories, selectRef, searchCategory}) {
console.log(categories)
    return (
        <div className="filter__container mb-5 d-flex container-fluid align-items-stretch">
            <div className="search__container col-sm-8 col-lg-6 ml-auto">
                <input 
                    className="form-control mr-sm-2 border-none outline-none"
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    value={input}
                    onChange={(e)=>search(e.target.value)}
                    ref={inputRef}
                />
            </div>
            <div className="dropdown__container col-lg-3 col-sm-4 mr-auto">
                <select 
                    className="form-control border-none outline-none w-full" 
                    ref={selectRef}
                    onChange={(e)=>searchCategory(e.target.value)}
                >
                    <option value="">Category</option>
                    {
                        categories.map((item ,index)=> {
                            return <option value={item} key={index}>{item}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default Filter
