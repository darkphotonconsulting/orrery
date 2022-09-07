import React from 'react';

import * as THREE from 'three'
import { useThree, useUpdate, useFrame, useLoader }  from '@react-three/fiber';

export class Sphere extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0
    };
  }

  render() {
    return (
      <mesh
        scale={1}
        position={[
          this.props.meshPositionX || 0,
          this.props.meshPositionY || 0,
          this.props.meshPositionZ || 0
        ]}
        rotation={[
          this.props.meshRotationX || 0,
          this.props.meshRotationY || 0,
          this.props.meshRotationZ || 0
        ]}
      >
        {(() => {
          if (this.props.useAmbientLight) {
            return (
              <ambientLight intensity={this.props?.lightIntensity || 0.5} />
            );
          }
        })()}

        {(() => {
          if (this.props.useSpotLight) {
            return (
              <spotLight
                position={[
                  this.props.spotlightPositionX || 10,
                  this.props.spotlightPositionY || 15,
                  this.props.spotlightPositionZ || 10
                ]}
                angle={this.props.spotlightAngle || 0.3}
              />
            );
          }
        })()}
        <sphereGeometry
          args={[
            this.props.radius || 0.7,
            this.props.widthSections || 30,
            this.props.heightSections || 30
          ]}
          attach='geometry'
        />
        {(() => {
          if (this.props.wireFrame) {
            return (
              <meshStandardMaterial wireframe attach='material' color={this.props.baseColor || 'black'} />
            )
          } else {
            return (
              <meshStandardMaterial attach='material' color={this.props.baseColor || 'black'} />
            )
          }
        })()}

      </mesh>
    );
  }
}


export function Star ({
  meshPositionX = 0,
  meshPositionY = 0,
  meshPositionZ = 0,
  meshRotationX = 0,
  meshRotationY = 0,
  meshRotationZ = 0,
  useAmbientLight = true,
  useSpotLight = false,
  spotlightPositionX = 0,
  spotlightPositionY = 0,
  spotlightPositionZ = 0,
  spotlightAngle = 0.3,
  lightIntensity = 0.5,
  widthSections = 30,
  heightSections = 30,
  wireFrame = true,
  baseColor = 'green',
  radius = 10,
  index = 0,
  userData = {},
  ...props
}) {

  const { size } = useThree()
  const ref = React.useRef();
  const [active, setActive] = React.useState(false)
  return (
    <mesh
    scale={active ? 1.5 : 1}
    position={[
      meshPositionX || 0,
      meshPositionY || 0,
      meshPositionZ || 0
    ]}
    rotation={[
      meshRotationX || 0,
      meshRotationY || 0,
      meshRotationZ || 0
    ]}
    onClick={(event) => setActive(!active)}
  >
    {(() => {
      if (useAmbientLight) {
        return (
          <ambientLight intensity={lightIntensity || 0.5} />
        );
      }
    })()}

    {(() => {
      if (useSpotLight || false) {
        return (
          <spotLight
            position={[
              spotlightPositionX || 10,
              spotlightPositionY || 15,
              spotlightPositionZ || 10
            ]}
            angle={spotlightAngle || 0.3}
          />
        );
      }
    })()}
    <sphereGeometry
      ref={ref}
      args={[
        radius || 0.7,
        widthSections || 30,
        heightSections || 30
      ]}
      attach='geometry'
    />

    {(() => {
      if (wireFrame) {
        return (
          <meshStandardMaterial wireframe attach='material' color={active ? 'red' : baseColor || 'black'} resolution={[size.width, size.height]} />
        )
      } else {
        return (
          <meshStandardMaterial attach='material' color={active ? 'red' : baseColor || 'black'} resolution={[size.width, size.height]} />
        )
      }
    })()}

  </mesh>
 )

}

export function Planet ({
  meshPositionX = 0,
  meshPositionY = 0,
  meshPositionZ = 0,
  meshRotationX = 0,
  meshRotationY = 0,
  meshRotationZ = 0,
  useAmbientLight = true,
  useSpotLight = false,
  spotlightPositionX = 0,
  spotlightPositionY = 0,
  spotlightPositionZ = 0,
  spotlightAngle = 0.3,
  lightIntensity = 0.5,
  widthSections = 30,
  heightSections = 30,
  wireFrame = true,
  baseColor = 'green',
  radius = 10,
  index = 0,
  userData = {},
  ...props
}) {

  const ref = React.useRef();
  const [active, setActive] = React.useState(false)
  // load the base texture for this planet
  // const thing = '../../../public/textures/'
  const baseTexture = useLoader(THREE.TextureLoader, `/textures/base/${userData.planet.englishName.toLowerCase()}.jpeg`)
  baseTexture.wrapS = THREE.RepeatWrapping;
  baseTexture.wrapT = THREE.RepeatWrapping;
  baseTexture.repeat.set( 1, 1 );


  return (
    <mesh
    ref={ref}
    scale={active ? 1.5 : 1}
    position={[
      meshPositionX || 0,
      meshPositionY || 0,
      meshPositionZ || 0
    ]}
    rotation={[
      meshRotationX || 0,
      meshRotationY || 0,
      meshRotationZ || 0
    ]}
    onClick={(event) => setActive(!active)}
  >
    {(() => {
      if (useAmbientLight) {
        return (
          <ambientLight intensity={lightIntensity || 0.5} />
        );
      }
    })()}

    {(() => {
      if (useSpotLight || false) {
        return (
          <spotLight
            position={[
              spotlightPositionX || 10,
              spotlightPositionY || 15,
              spotlightPositionZ || 10
            ]}
            angle={spotlightAngle || 0.3}
          />
        );
      }
    })()}
    <sphereGeometry
      ref={ref}
      args={[
        radius || 0.7,
        widthSections || 30,
        heightSections || 30
      ]}
      attach='geometry'
    />

    {(() => {
      if (wireFrame) {
        return (
          <meshStandardMaterial wireframe attach='material' color={active ? 'red' : baseColor || 'black'} />
        )
      } else {
        return (
          <meshPhysicalMaterial
            map={baseTexture}
          />


          // <meshStandardMaterial attach='material' color={active ? 'red' : baseColor || 'black'} />
        )
      }
    })()}

  </mesh>
 )

}