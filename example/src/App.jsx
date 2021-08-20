import React, { useRef, useState, useEffect } from 'react'

import { ReactAudioControl } from 'react-audio-control'
import 'react-audio-control/dist/index.css'

const App = () => {

 const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  };

  const updateVolume = (vol) => {
    audioRef.current.volume = vol
  }

  useEffect(() => {
    if (audioRef.current instanceof Object) {
      audioRef.current.onended = () => {
        setIsPlaying(false)
      }
    }
  }, [audioRef.current])

  return (
    <div className="main">
      <audio
        ref={audioRef}
        src={'/audio_d29a0439c8.mp3'}
      />
      <div style={{fontWeight: 'bold'}}>This is a test application to show the use of <a href="https://github.com/aweibell/react-audio-control">react-audio-control</a></div>
      <div style={{fontWeight: 'normal', fontSize: 'smaller'}}> Music by <a href="https://pixabay.com/users/timmoor-18879564/?tab=audio&amp;utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=audio&amp;utm_content=2592">TimMoor</a> from <a href="https://pixabay.com/music/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=2592">Pixabay</a></div>
      <div style={{margin: '3em'}}>
        <ReactAudioControl
          updateVolume={updateVolume}
          togglePlay={togglePlay}
          styling={{
            slider: {backgroundColor: 'teal'},
            back: {backgroundColor: '#044', borderBottom: isPlaying ? 'solid 4px cyan' : 'solid 4px transparent'},
            title: {fontFamily: 'Segoe Print'}
          }}
          title={'Theme by TimMoor'}
        />
      </div>
    </div>
  )
}

export default App
