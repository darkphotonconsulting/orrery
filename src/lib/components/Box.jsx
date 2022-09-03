import React from 'react';

// import THREE from 'three'

export class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0
    };
  }

  render() {
    return (
      <mesh
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
        {/* <ambientLight intensity={this.props?.lightIntensity || 0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} /> */}
        <boxBufferGeometry attach='geometry' />
        <meshStandardMaterial attach='material' color='hotpink' />
      </mesh>
    );
  }
}
