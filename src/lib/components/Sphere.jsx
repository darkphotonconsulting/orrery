import React from 'react';

// import THREE from 'three'

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
        <sphereBufferGeometry
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

export class Star extends Sphere {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
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
        <sphereBufferGeometry
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

export class Planet extends Sphere {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
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
        <sphereBufferGeometry
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