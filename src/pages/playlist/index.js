import React from 'react'
import style from './style.module.css';

// Components
import PlaylistItem from '../../components/playlist-item';

// Data
import data from '../../data/index';

const index = () => {

    let dataItem = []

    dataItem = data

    const listPlaylist = dataItem.map((item, idx) => {
        return(
            dataItem && <PlaylistItem data={item} key={idx} idx={idx} />
        )
    })

    return (
        <div className={style.playlist}>
            <div className={style.container}>
                <div className={style.title}>
                    <h1>Spotify Clone</h1>
                    <input type="text" name="title" id="title" className="title" placeholder="Song Title" autoComplete="off" />
                </div>

                <div className={style.list_playlist}>
                    {/* <PlaylistItem data={dataItem} /> */}
                    {listPlaylist}
                </div>
            </div>
        </div>
    )
}

export default index