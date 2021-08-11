import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL, formatDate } from '../helpers'
import axios from 'axios'
import './singlecharacter.css'

function SingleCharacter() {

    const character_id = useParams()
    const {id, name} = character_id

    const [isLoading,setIsLoading] = useState(true)
    const [character,setCharacter] = useState({})
    const [quotes,setQuotes] = useState([])

    useEffect(() => {
        let source = axios.CancelToken.source()
        let url = BASE_URL + `characters/${id}`
        let quotesUrl = BASE_URL + `quote?author=${name}`

        const fetchCharacter = async ()=>{
            try{
                const responses = await axios.all([
                    axios.get(url, {
                        CancelToken:source.token
                    }), 
                    axios.get(quotesUrl, {
                        CancelToken:source.token
                    })
                ])

                if(responses[0].status && responses[0].status === 200){
                    setCharacter(responses[0].data[0])
                }
                
                if(responses[1].status && responses[1].status === 200){
                    setQuotes(responses[1].data)
                }

            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }

        fetchCharacter()
        
        return () => {
            setIsLoading(true)
            source.cancel('Cancelling while unmounting')
        }
    }, [id,name])

    if(isLoading){
        return <div className="wrapper">
                    <div className="loading__container">
                        <div className="loader"></div>
                    </div>
                </div>
    }

    return (
        <section className="wrapper">
            <div className="single__character__container">
                <div className="single__character__description__container d-flex">
                    <div className="single__charcater__image__contianer">
                        <img width="300" height="400" src={character?.img} alt={`character${character?.char_id}`} />
                    </div>
                    <div className="single__charcater__body">
                        <p>
                            <strong>Name : </strong>
                            <span>{character?.name}</span>
                        </p>
                        <p>
                            {
                                character?.birthday !== 'Unknown'
                                ?
                                    <>
                                        <strong>Date Of Birth : </strong>
                                        <span>
                                            {
                                                formatDate(character.birthday)
                                            }
                                        </span>
                                    </>
                                :
                                    null
                            }
                        </p>
                        <p>
                            <strong>Occupation : </strong>
                            <span>{character?.occupation}</span>
                        </p>
                        <p>
                            <strong>Status : </strong>
                            <span>{character?.status}</span>
                        </p>
                        <p>
                            <strong>Nickname : </strong>
                            <span>{character?.nickname}</span>
                        </p>
                        <p>
                            <strong>Actor portrayed : </strong>
                            <span>{character?.portrayed}</span>
                        </p>
                        <p>
                            <strong>Seasons appeared : </strong>
                            <span>
                                {
                                    character?.appearance?.map((item,index)=>{
                                        if(index === character.appearance.length-1){
                                            return item
                                        }
                                        return item + ', '
                                    })
                                }
                            </span>
                        </p>
                    </div>
                </div>
                {
                    quotes?.length > 0
                    ?
                        <div className="quotes__container">
                            <strong>Quotes : </strong>
                            {
                                quotes?.map((item,index)=>{
                                    return <p className="quote" key={index}>
                                                {index + 1}) &nbsp; "{item.quote}"
                                            </p>
                                })
                            }
                        </div>
                    :
                        <div className="quotes__container">
                            <strong>No quotes found </strong>
                        </div>
                }
            </div>
        </section>
    )
}

export default SingleCharacter
