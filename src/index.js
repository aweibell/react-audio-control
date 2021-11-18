import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useSwipeable } from 'react-swipeable'
import { useResizeObserver } from 'beautiful-react-hooks'
import styled from 'styled-components'

const calcVolumeX = (volume, sliderWidth) => {
  return Math.round((sliderWidth * volume) / 100)
}

export const ReactAudioControl = ({
  extVolume,
  updateVolume,
  togglePlay,
  styling,
  title,
  debug = false,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0)
  const [volume, setVolume] = useState(extVolume)
  const [lastVolume, setLastVolume] = useState(extVolume)

  const [delta, setDelta] = useState(undefined)

  const sliderDivRef = useRef(null)
  const containerSizes = useResizeObserver(sliderDivRef)

  useEffect(() => {
    setSliderWidth(containerSizes?.width || sliderDivRef.current.clientWidth)
  }, [containerSizes])

  useEffect(() => {
    updateVolume(volume / 100)
  }, [volume])

  const setNewVolume = (newVolume) => {
    if (newVolume < 0) setVolume(0)
    else if (newVolume > 100) setVolume(100)
    else setVolume(newVolume)
  }

  // TODO: Consider some factor to move faster if moving long
  // TODO: prevent text selection
  // https://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag#5432363

  const swipedHandler = (evt) => {
    if (debug) console.log('swiped', evt.deltaX, evt.velocity)
    setLastVolume(volume)
  }

  const swipingHandler = (data) => {
    const startX = data.initial[0]
    const pctX = data.deltaX / sliderWidth
    const deltaVolume = (1 + pctX) * lastVolume
    if (debug) {
      console.log(
        `swiping ${data.first ? 'first' : ' -> '} absX ${data.absX}`,
        ` deltaX ${data.deltaX} startX ${startX} pos ${startX + data.absX}`,
        ` pctX ${pctX} deltaVolume ${deltaVolume} (velocity ${data.velocity})`
      )
    }
    setNewVolume(deltaVolume)
    setDelta(data.deltaX)
  }

  const playToggler = (evt) => {
    if (debug) console.log('toggling play', evt)
    togglePlay()
  }

  const handlers = useSwipeable({
    onSwiped: (evnt) => swipedHandler(evnt),
    onSwiping: (dt) => swipingHandler(dt),
    onTap: (evnt) => playToggler(evnt),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  })

  return (
    <div style={{width: '100%'}}>
      <Container style={styling.back} ref={sliderDivRef}>
        <div {...handlers} onTouchEnd={(e) => e.preventDefault()}>
          <VolumeSlider style={styling.slider} volume={calcVolumeX(volume, sliderWidth)}>
            <RacTitle style={styling.title}>{title}</RacTitle>
          </VolumeSlider>
        </div>
      </Container>
      {debug && (
        <Debug>
          <div>
            <VolButton onClick={() => setNewVolume(volume + 5)}>+</VolButton>
            <VolButton onClick={() => setNewVolume(volume - 5)}>-</VolButton>
          </div>
          <div>
            sliderWidth: {sliderWidth} | volume: {volume} ({lastVolume})|
            volumeX: {calcVolumeX(volume, sliderWidth)} | delta: {delta}
          </div>
        </Debug>
      )}
    </div>
  )
}

ReactAudioControl.propTypes = {
  extVolume: PropTypes.number,
  updateVolume: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  styling: PropTypes.object,
  title: PropTypes.string.isRequired,
  debug: PropTypes.bool,
}

ReactAudioControl.defaultProps = {
  extVolume: 20,
  styling: {
    back: {},
    slider: {},
    title: {},
  },
  debug: false,
}

const Container = styled.div`
  background-color: maroon;
  color: white;
  min-height: 2em;
  margin-top: 2vh;
  width: 100%;
`

const VolumeSlider = styled.div`
  width: ${(props) => props.volume}px;
  min-height: 2em;
  background-color: red;
  border-right: solid 2px #ffddaa;
  cursor: hand;
`

const RacTitle = styled.div`
  z-index: 10;
  height: 2em;
  padding-left: 10px;
  position: fixed;
  display: flex;
  font-weight: bold;
  vertical-align: middle;
  text-overflow: ellipsis;
`

const Debug = styled.div`
  z-index: 20;
  background: rgba(200, 200, 200, 0.5);
  position: absolute;
  margin-top: 1em;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const VolButton = styled.button`
  margin: 2px;
  font-size: 1.5em;
  width: 100px;
  height: 2em;
`
