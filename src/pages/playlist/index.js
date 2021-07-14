import React from 'react'
import './index.css'

// Components
import PlaylistItem from '../../components/playlist-item';

// Data
import data from '../../data/index';

const index = () => {
    return (
        <>
            <h1>Data Playlist</h1>

            <div className="playlist">
                <PlaylistItem data={data} />
            </div>
        </>
    )
}

export default index