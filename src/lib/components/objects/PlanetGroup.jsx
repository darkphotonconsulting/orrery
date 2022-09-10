import React from 'react';
import {
  useFrame,
  useLoader,
  useThree,
}  from '@react-three/fiber';

import {
  Planet
} from './Planet.jsx';
import {
  Orbital
} from './Orbital.jsx'
export function PlanetGroup({
  stars = [],
  planets = [],
  showOrbital = true,
  animateAxialRotation = false,
  animateOrbitalRotation = false,
  ...props
}) {

  const groupRef = React.useRef()
  useFrame((state, delta) => {
  })

  const renderedPlanets = planets.map((planet, index) => {
    return (
      <group>
        <Planet
          scale={[1.0, 1.0, 1.0]}
          key={`planet-body-${planet.englishName.toLowerCase()}`}
          userData={{
            planet,
            stars
          }}
          wireFrame={false}
          animateOrbitalRotation={animateOrbitalRotation}
          animateAxialRotation={animateAxialRotation}
          useSpotLight={false}
          useAmbientLight={true}
          baseColor={'#22803D'}
          // TODO: expose the contant "2" as a user controlled buffer property
          /*
          TODO: investigate why semiminorAxis vanishes on linear scaling mode.
          - remove the additional operations done on semimajorAxis and semiminorAxis
          - use the pure scaled values

          */
          meshPositionX={
            (planet.semimajorAxis + stars.map((star) => star.equaRadius).reduce((a, b) => a+b, 0)   ) * (index + 2)
          }
          meshPositionY={0}
          meshPositionZ={0}
          semimajorAxis={
            (planet.semimajorAxis + stars.map((star) => star.equaRadius).reduce((a, b) => a+b, 0)   ) * (index + 2)
          }
          semiminorAxis={
            (planet.semiminorAxis + stars.map((star) => star.equaRadius).reduce((a, b) => a+b, 0)   ) * (index + 2)
          }

          // TODO: find a better way to deal with "vanishing" objects
          /*
          // 💡 - this is a result of scaling all values using the same algorithm
          // 💡 - e.g. at a log scale with a base of 2-10, the values of mercury tend to be too small to be visible
          // 🤔 - perhaps mixing of linear and log scales will help with this
          */
          radius={planet.englishName.toLowerCase() === 'mercury' ? 0.10 : Math.abs(planet.equaRadius)}
          index={index}
        />
        {
          showOrbital ?
          (
            <Orbital
              // ref={orbitRef}
              key={`planet-orbit-${planet.englishName.toLowerCase()}`}
              semimajorAxis={
                (planet.semimajorAxis + stars.map((star) => star.equaRadius).reduce((a, b) => a+b, 0)   ) * (index + 2)
              }
              semiminorAxis={
                (planet.semiminorAxis + stars.map((star) => star.equaRadius).reduce((a, b) => a+b, 0)   ) * (index + 2)
              }
              inclination={planet.inclination}
              baseColor={'#FFFFFF'}
              index={index}
              thickness={3}
              userData={{
                planet,
                stars
              }}
            />
          ) : null
        }
      </group>

    )
  })

  return (
    <group ref={groupRef} userData={{foo: 'bar'}}>
      {renderedPlanets}
    </group>
  )
}