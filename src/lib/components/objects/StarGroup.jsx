import React from 'react';
import * as THREE from 'three'
import {
  useFrame,
}  from '@react-three/fiber';

import {
  Star
} from './Star.jsx';

export function StarGroup({
  theme = {},
  stars = [],
  planets = [],
  enhancements = {},
  activeBodies=[],
  setActiveBodies = () => {},
  animateAxialRotation = false,
  controls = {},
  ...props
}) {
  const groupRef = React.useRef()
  useFrame((state, delta) => {
  })

  const renderedStars = stars.map((star, index) => {
    const starName = star.englishName.toLowerCase()


    return (
      <group
        key={`star-group-${star.englishName.toLowerCase()}`}
        name={`star-group-${star.englishName.toLowerCase()}`}

      >
        <Star
          scale={[1.0, 1.0, 1.0]}
          key={`star-component-${star.englishName.toLowerCase()}`}
          name={`star-component-${star.englishName.toLowerCase()}`}
          meshPositionX={0}
          meshPositionY={0}
          meshPositionZ={0}
          meshRotationX={0}
          meshRotationY={0}
          meshRotationZ={0}
          useAmbientLight={true}
          useSpotLight={false}
          spotlightPositionX={0}
          spotlightPositionY={0}
          spotlightPositionZ={0}
          spotlightAngle={0.3}
          lightIntensity={0.5}
          widthSections={30}
          heightSections={30}
          wireFrame={false}
          baseColor={new THREE.Color('#ffffff')}
          radius={star.equaRadius}
          animateAxialRotation={animateAxialRotation}
          index={0}
          userData={{
            star,
            enhancements: Object.keys(enhancements?.stars).includes(starName)
              ? enhancements.stars[starName]
              : enhancements.stars.default,
          }}
          setActiveBodies={setActiveBodies}
          activeBodies={activeBodies}
          controls={controls}
        />
      </group>
    )
  })

  return (
    <group ref={groupRef} name={'star-group'}>
      {renderedStars}
    </group>
  )
}