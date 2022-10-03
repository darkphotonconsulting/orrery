import React from 'react';
import {
  useFrame,
}  from '@react-three/fiber';

import {
  Planet
} from './Planet.jsx';
import {
  Orbital
} from './Orbital.jsx'
export function PlanetGroup({
  theme = {},
  stars = [],
  planets = [],
  enhancements = {},
  showOrbital = true,
  animateAxialRotation = false,
  animateOrbitalRotation = false,
  activeBodies=[],
  setActiveBodies = () => {},
  ...props
}) {

  const groupRef = React.useRef()
  useFrame((state, delta) => {
  })

  const renderedPlanets = planets.map((planet, index) => {
    const planetName = planet.englishName.toLowerCase()
    if (Object.keys(enhancements?.planets).includes(planetName)) {
      console.log('enhancing planet', planetName)
    }

    return (
      <group key={`planet-group-${planet.englishName.toLowerCase()}`}>
        <Planet
          setActiveBodies={setActiveBodies}
          activeBodies={activeBodies}
          scale={[1.0, 1.0, 1.0]}
          key={`planet-body-${planet.englishName.toLowerCase()}`}
          userData={{
            planet,
            stars,
            enhancements: Object.keys(enhancements?.planets).includes(planetName)
              ? enhancements.planets[planetName]
              : enhancements.planets.default,
          }}
          wireFrame={false}
          animateOrbitalRotation={animateOrbitalRotation}
          animateAxialRotation={animateAxialRotation}
          useSpotLight={false}
          useAmbientLight={true}
          baseColor={'#22803D'}
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
          radius={Math.abs(planet.equaRadius)}
          index={index}
        />
        {
          showOrbital ?
          (
            <Orbital
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