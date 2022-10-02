import glsl from 'babel-plugin-glsl/macro'
export function loadShader ({ type = 'planet'}) {
  glsl`
    void main() {
      gl_Position = projectMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // return glsl.file('../../assets/shaders/planetVertex.glsl')
}