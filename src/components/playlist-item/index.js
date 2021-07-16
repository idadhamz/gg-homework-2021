import React from 'react';
import style from './style.module.css'

// Components
import PlaylistText from '../playlist-text'
import Button from '../Button'
import Image from '../Image'

const index = ({ data }) => {

    const buttonLink = (e, idx) => {
        e.preventDefault()
        window.location.href = `${data[idx].album.external_urls.spotify}`;
    }

    const listPlaylist = data.map((item, idx) => {
        return(
            <div className={style.playlist_item} key={idx}>
                <Image src={item.album.images[0].url} width={item.album.images[0].width} height={item.album.images[0].height} />
                <PlaylistText title={item.album.name} artists={item.album.artists[0].name} album={item.album.name} />
                <Button onClick={(e) => buttonLink(e, idx)}>Play On Spotify</Button>
            </div>
        )
    })

    return (
        <>
            {listPlaylist}
        </>
    )
}

export default index