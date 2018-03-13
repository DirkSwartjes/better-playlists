import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
    user: {
        name: "Dirk",
        playlists: [
            {
                name: "Favorites",
                songs: [
                    {name: "Beat it", duration: 196},
                    {name: "Smooth Criminal", duration: 482},
                    {name: "Billy Jean", duration: 243}
                ]
            },
            {
                name: "Zeds Dead",
                songs: [
                    {name: "Where did that go", duration: 382},
                    {name: "You know", duration: 137},
                    {name: "Blink", duration: 296}
                ]
            },
            {
                name: "Daily mix",
                songs: [
                    {name: "Doomed", duration: 286},
                    {name: "Hard with Style", duration: 156},
                    {name: "From Within", duration: 197}
                ]
            },
            {
                name: "House 2.0",
                songs: [
                    {name: "Next Motion", duration: 429},
                    {name: "Chatterhead", duration: 235},
                    {name: "Elevator", duration: 241}
                ]
            }
        ]
    }
};

let defaultStyle = {
    color: '#fff'
};

class PlaylistCounter extends Component {
    render () {
        return (

            <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
                <h2>{this.props.playlists.length} playlists</h2>
            </div>
        )
    }
}

class HoursCounter extends Component {
    render () {

        let allSongs = this.props.playlists.reduce((songs, playlist) => {
            return songs.concat(playlist.songs);
        }, []);

        let totalDuration = allSongs.reduce((total, song) => {
            return total + song.duration;
        }, 0);

        return (

            <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
                <h2>{Math.floor(totalDuration/3600)} hours</h2>
            </div>
        )
    }
}

class Filter extends Component {
    render() {
        return (

            <div style={defaultStyle}>
                <img alt="Search" />
                <input type="text" onKeyUp={e => this.props.onChange(e.target.value)} /> Filter
            </div>
        )
    }
}

class Playlist extends Component {
    render() {

        let playlist = this.props.playlist;
        return (

            <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
                <h3>{playlist.name}</h3>
                <ul>
                    {playlist.songs.map(song =>
                        <li>{song.name}</li>
                    )}
                </ul>
            </div>
        )
    }
}

class App extends Component {

    constructor() {

        super();
        this.state = {
            serverData: {},
            filterString: ''
        };
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({serverData: fakeServerData});
        }, 1000);
    }

    render() {
        let playListToRender = this.state.serverData.user ? this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        ) : []

        return (

            <div className="App">
                {this.state.serverData.user ?

                    <div>
                        <h1 style={{...defaultStyle, fontSize: '54px'}}>
                            {this.state.serverData.user.name}'s playlists
                        </h1>
                        < PlaylistCounter playlists={playListToRender}/>
                        <HoursCounter playlists={playListToRender}/>
                        <Filter onChange={(input) => {this.setState({filterString: input})}}/>

                        {playListToRender.map(playlist =>
                            <Playlist playlist={playlist}/>
                        )}
                    </div> : <h1 style={{...defaultStyle, fontSize: '54px'}}>Loading...</h1>

                }
            </div>
        );
    }
}

export default App;
