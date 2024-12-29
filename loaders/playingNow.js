module.exports = async() =>{
    const kralMuzik = await fetch('https://www.kralmuzik.com.tr/rds/mobile?radio_id=113', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        }
    }).catch(err => {
        return {
            CurrentSong: { SongName: 'API HATA', ArtistName: 'API HATA' },
            NextSong: { SongName: '', ArtistName: '' },
            ServiceItuneResponse: { songImage: '', song_ituneUrl: '', genre: null, time: 0 }
          }
    })
    let jsonAPI = await kralMuzik.json();
    return jsonAPI;
}
