import React, { useEffect, useState, useRef } from 'react'
import './characters.css'
import Filter from './Filter'
import CharacterCard from './CharacterCard'
import axios from 'axios'
import {BASE_URL} from '../helpers'
import Pagination from './Pagination'

function Characters() {

    const [characters,setCharacters] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [charactersPerPage] = useState(10)
    const [totalPages,setTotalPages] = useState(1)
    const [pageNumber,setPageNumber] = useState(0)
    const [previous,setPrevious] = useState(false)
    const [next,setNext] = useState(true)
    const [currentPageNo,setCurrentPageNo] = useState(1)
    const [categories,setCategories] = useState(["a"])
    const [inputText, setInputText] = useState('')
    const [searchCharacters, setSearchCharacters] = useState([])

    const charactersCardsRef = useRef(null)
    const inputRef = useRef(null)
    const selectRef = useRef(null)
    
    const searchCharacterByInput = (string)=>{
        setInputText(string)
        
        if(string === ''){
            setTotalPages(Math.ceil(characters.length/charactersPerPage))
            return setSearchCharacters(characters)
        }

        const searchCharacters = characters.filter((item)=>item.name.toUpperCase().includes(string.toUpperCase()))
        setTotalPages(Math.ceil(searchCharacters.length/charactersPerPage))

        return setSearchCharacters(searchCharacters)
    }

    const searchCharacterByCategory = (cat)=>{
        console.log(cat)
        if(cat === ''){
            setTotalPages(Math.ceil(characters.length/charactersPerPage))
            return setSearchCharacters(characters)
        }

        const searchCharacters = characters.filter((item)=>item.category.toUpperCase().includes(cat.toUpperCase()))
        setTotalPages(Math.ceil(searchCharacters.length/charactersPerPage))

        return setSearchCharacters(searchCharacters)
    }

    const paginate = (pageNo)=>{
        setIsLoading(true)
        setCurrentPageNo(pageNo)
        window.scrollTo(0,0)
        if(pageNo === 1){
            setPrevious(false)
        }else{
            setPrevious(true)
        }
        if(pageNo === totalPages ){
            setNext(false)
            charactersCardsRef.current.style.justifyContent = 'flex-start'
        }else{
            charactersCardsRef.current.style.justifyContent = 'space-between'
            setNext(true)
        }
        setPageNumber(parseInt(pageNo-1))
        setIsLoading(false)
    }

    useEffect(() => {
        let source = axios.CancelToken.source()
        let url = BASE_URL + 'characters'
        let categoriesSet = new Set()
        let categoriesArray = []

        const fetchCharacters = async ()=>{
            try{
                const response = await axios.get(url,{
                    CancelToken:source.token
                })

                if(response.status && response.status === 200){
                    response.data.map((item)=>{
                        return item.category.split(',').forEach((cat)=>{
                            return categoriesSet.add(cat.trim())
                        })
                    })

                    categoriesSet.forEach((item)=>{
                        categoriesArray.push(item)
                    })

                    setTotalPages(Math.ceil(response.data.length/charactersPerPage))
                    setCharacters(response.data)
                    setSearchCharacters(response.data)
                    setCategories(categoriesArray)
                }
            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }

        fetchCharacters()
        
        return () => {
            setIsLoading(true)
            source.cancel('Cancelling while unmounting')
        }
    }, [charactersPerPage])
    
    if(isLoading){
        return <div className="wrapper">
                    <div className="loading__container">
                        <div className="loader"></div>
                    </div>
                </div>
    }

    return (
        <section className="wrapper">
            <div className="characters__container">
                <Filter 
                    search={searchCharacterByInput}
                    inputRef={inputRef}
                    input={inputText}
                    selectRef={selectRef}
                    categories={categories}
                    searchCategory={searchCharacterByCategory}
                />
                <div className="characters__cards" ref={charactersCardsRef}>
                    {
                        searchCharacters.length === 0 && inputText
                        ?
                            "No charcaters Found"
                        :
                            searchCharacters
                            ?.slice(charactersPerPage*pageNumber,charactersPerPage*pageNumber + charactersPerPage)
                            .map((item,index)=>{
                                return <CharacterCard key={index} item={item} />
                            })
                    }
                </div>
            </div>
            <Pagination noOfPages={totalPages} paginate={paginate} previous={previous} next={next} currentPageNo={currentPageNo} />
        </section>
    )
}

export default Characters
