import React, { useState, useEffect } from 'react'
import style from './style.module.css';

// Components
import PlaylistItem from '../../components/playlist-item';
import Button from '../../components/Button';

// Data
import data from '../../data/index';

const index = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [code, setCode] = useState(null)
    
    const [song, setSong] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        if(code === null){
            getCode()
        }
    }, [])

    const requestAuth = (e) => {
        e.preventDefault()

        const AUTHORIZE = 'https://accounts.spotify.com/authorize'
        const REDIRECT_URL = 'http://localhost:3001/'

        const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID

        let URL = `${AUTHORIZE}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}&show_dialog=true&scope=user-read-private%20user-read-email`

        console.log(URL)

        window.location.href = URL
    }

    const deleteAuth = (e) => {
        e.preventDefault()

        setIsLoggedIn(false)
        setCode(null)

        window.location.href = 'http://localhost:3001/'
    }

    const getCode = () => {
        var codeValue = null
        const queryString = window.location.search
        if(queryString.length > 0){
            const urlParams = new URLSearchParams(queryString)
            codeValue = urlParams.get('code')
        } else {
            codeValue = null
        }

        setCode(codeValue)
        if(codeValue !== null) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    const playlistView = () => {
        return(
            <>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="title" id="title" className="title" placeholder="Search Song Title" onChange={(e) => handleChange(e)} value={input} autoComplete="off" />
                    <Button type="submit" style={{ margin: '0 1rem' }}>Search</Button>
                </form>

                {/* {listSong} */}
            </>
        )
    }

    // const listSong = song.map((item, idx) => {
    //     return(
    //         <div className={style.playlist_item} key={idx}>
    //             <h1>{item.name}</h1>
    //         </div>
    //     )
    // })

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const songItem = await fetch(
            `https://api.spotify.com/v1/search?q=${input}&type=artist&limit=10`, {headers: {
                'Authorization': 'Bearer ' + `${code}`,
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())

        console.log(code)
        console.log(songItem)

        // setSong(songItem.artists.items)
    }

    const nullPlaylistView = <h1>Tidak ada data</h1>

    return (
        <div className={style.playlist}>
            <div className={style.container}>
                <div className={style.title}>
                    <h1>Spotify Clone</h1>
                    { isLoggedIn ?  <Button onClick={(e) => deleteAuth(e)}>Logout Spotify</Button> : <Button onClick={(e) => requestAuth(e)}>Login on Spotify</Button>}
                </div>

                <div className={style.list_playlist}>
                    { isLoggedIn ? playlistView() : nullPlaylistView }
                </div>
            </div>
        </div>
    )
}

export default index