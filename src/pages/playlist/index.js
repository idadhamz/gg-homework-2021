import React from 'react'
import style from './style.module.css';

// Components
import PlaylistItem from '../../components/playlist-item';

// Data
import data from '../../data/index';

const index = () => {
    return (
        <div className={style.playlist}>
            <h1>Data Playlist</h1>

            <div className={style.list_playlist}>
                <PlaylistItem data={data} />
                <PlaylistItem data={data} />
            </div>
        </div>
    )
}

export default index