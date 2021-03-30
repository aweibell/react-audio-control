# react-audio-control

> A React component providing a volume slider bar with additional controls

[![NPM](https://img.shields.io/npm/v/react-audio-control.svg)](https://www.npmjs.com/package/react-audio-control) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-audio-control
```

## Usage

```jsx
import React, { Component } from 'react'
import { ReactAudioControl } from 'react-audio-control'

import 'react-audio-control/dist/index.css'

lass Example extends Component {

  const songTitle = 'Theme by TimMoor'

  const togglePlay = () => {
    // setIsPlaying(!isPlaying)
  }

  const updateVolume = (vol) => {
    // setVolume(vol)
  }

  render() {
    return <ReactAudioControl
          updateVolume={updateVolume}
          togglePlay={togglePlay}
          styling={{back: {border: 'solid 2px green'}}}
          title={songTitle}
        />
  }
}
```

## License

MIT © [aweibell](https://github.com/aweibell)
