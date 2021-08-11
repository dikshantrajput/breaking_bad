import React from 'react'
import './charactercard.css'
import { formatDate } from '../helpers'
import { Link } from 'react-router-dom'

function CharacterCard({item}) {
    const {name, birthday, occupation, img, status, char_id} = item

    return (
        <div className="card__container">
            <Link to={`/${char_id}/${name}`}>
                <div className="card__header">
                    <img src={img} height="400" width="300" loading="lazy" alt={`character image ${char_id}`}/>
                </div>
            </Link>
            <div className="card__body">
                <p>
                    {name}
                </p>
                <p>
                    {
                        occupation.map((item,index)=>{
                            if(index === occupation.length-1){
                                return item
                            }
                            return item + ', '
                        })
                    }
                </p>
                {
                    birthday !== 'Unknown'
                    ?
                        <p>
                            {
                                formatDate(birthday)
                            }
                        </p>
                    :
                    null
                }
                <p>
                    {status}
                </p>
            </div>
        </div>
    )
}

export default CharacterCard
