import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReactAudioControl } from '.'

const mockProps = {
  updateVolume: () => {},
  togglePlay: () => {},
  styling: {},
  title: 'Mock title',
}

const element = <ReactAudioControl {...mockProps} />;

describe('ReactAudioControl', () => {
  it('renders without crashing', () => {
    const result = render(element)
    const titleElement = result.getByText(mockProps.title);
    console.log('titleElement', titleElement)
    expect(titleElement).toBeInTheDocument();
  })
})
