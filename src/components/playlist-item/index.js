import React from 'react';
import style from './style.module.css'

// Components
import PlaylistText from '../playlist-text'
import Button from '../Button'
import Image from '../Image'

const index = ({ data, idx }) => {

    const buttonLink = (e) => {
        e.preventDefault()
        window.location.href = `${data.album.external_urls.spotify}`;
    }

    return (
        <div className={style.playlist_item}>
            <h1 className={style.h1}>{idx+1}</h1>
            <Image src={data.album.images[0].url} width={data.album.images[0].width} height={data.album.images[0].height} />
            <PlaylistText title={data.album.name} artists={data.album.artists[0].name} album={data.album.name} />
            <Button onClick={(e) => buttonLink(e)}>Play On Spotify</Button>
        </div>
    )
}

export default index