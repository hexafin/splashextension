import React from 'react'
import Bodymovin from 'react-bodymovin'
import * as animation from '../animations/LoadingCircle.json'

export default () => {
  const bodymovinOptions = {
    loop: true,
    autoplay: true,
    prerender: true,
    animationData: animation
  }

  return (
    <div className="loading-animation">
      <Bodymovin options={bodymovinOptions} />
      <style jsx global>
        {`
          .loading-animation > .react-bodymovin-container {
            height: 90px;
            margin: -40px;
            opacity: 0.7;
          }
        `}
      </style>
    </div>
  )
}
