import React, { useState, useEffect } from 'react'
import style from './style.module.css';

// Components
import PlaylistItem from '../../components/playlist-item';
import Button from '../../components/Button';

// Utils
import getParams from '../../utils/getParams';
import requestAuth from '../../utils/requestAuth';

// Data
import data from '../../data/index';

const index = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [code, setCode] = useState(null)
    
    const [song, setSong] = useState(data)
    const [input, setInput] = useState('')

    useEffect(() => {
        const payload = getParams()
        if(payload) {
            setCode(payload)
            setIsLoggedIn(true)
        } else {
            setCode(null)
            setIsLoggedIn(false)
        }
    }, [])

    const playlistView = () => {

        return(
            <>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="title" id="title" className="title" placeholder="Search Song Title" onChange={(e) => handleChange(e)} value={input} autoComplete="off" />
                    <Button type="submit" style={{ margin: '0 1rem' }}>Search</Button>
                </form>

                { song.map((item, idx) => <PlaylistItem data={item} key={idx} idx={idx} />) }
            </>
        )
    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const songItem = await fetch(
            `https://api.spotify.com/v1/search?q=${input}&type=track&limit=10`, {headers: {
                'Authorization': 'Bearer ' + `${code.access_token}`,
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())

        if(input !== '') {
            setSong(songItem.tracks.items)
        } else {
            setSong(data)
        }
    }

    const nullPlaylistView = () => {
        return(
            <>
                <h1 className={style.h1_null}>Data not available</h1>
            </>
        )
    }

    const logoutAction = (e) => {
        e.preventDefault()
    
        setIsLoggedIn(false)
        setCode(null)
    
        window.location.href = 'http://localhost:3001/'
    }

    return (
        <div className={style.playlist}>
            <div className={style.title}>
                <h1>Spotify</h1>
                { isLoggedIn ?  <Button onClick={(e) => logoutAction(e)}>Logout In Spotify</Button> : <Button onClick={(e) => requestAuth(e)}>Login On Spotify</Button>}
            </div>

            <div className={style.list_playlist}>
                { isLoggedIn ? playlistView() : nullPlaylistView() }
            </div>
        </div>
    )
}

export default index