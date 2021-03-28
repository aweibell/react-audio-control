import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReactAudioControl } from '.'

const mockProps = {
  updateVolume: () => {
  },
  togglePlay: () => {
  },
  styling: {},
  title: 'Mock title',
}


describe('ReactAudioControl', () => {
  it('renders without crashing', () => {
    const result = render(<ReactAudioControl {...mockProps} />)
    const titleElement = result.getByText(mockProps.title);
    console.log('titleElement', titleElement)
    expect(titleElement).toBeInTheDocument();
  })
})
