import React from 'react';
import {
  useFrame,
  // useLoader,
  // useThree,
}  from '@react-three/fiber';

import {
  Star
} from './Star.jsx';

export function StarGroup({
  stars = [],
  planets = [],
  activeBodies=[],
  setActiveBodies = () => {},
  ...props
}) {
  const groupRef = React.useRef()
  useFrame((state, delta) => {
  })

  const renderedStars = stars.map((star, index) => {
    return (
      <group>
        <Star
          scale={[1.0, 1.0, 1.0]}
          key={`star-body-${star.englishName.toLowerCase()}`}
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
          baseColor={'green'}
          radius={star.equaRadius}
          index={0}
          userData={{
            star,
          }}
          setActiveBodies={setActiveBodies}
          activeBodies={activeBodies}
        />
      </group>
    )
  })

  return (
    <group ref={groupRef}>
      {renderedStars}
    </group>
  )
}