//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//  @apsamuel - updates methods to be compatible with a fragment shader defined within Lamina CustomLayer abstract class
// fragment shaders defined within this class must have their local variables prefixed with `f_`

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

float permute(float x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float taylorInvSqrt(float r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 grad4(float j, vec4 ip) {
    const vec4 f_ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 f_p,f_s;
    f_p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    f_p.w = 1.5 - dot(abs(f_p.xyz), f_ones.xyz);
    f_s = vec4(lessThan(f_p, vec4(0.0)));
    f_p.xyz = f_p.xyz + (f_s.xyz*2.0 - 1.0) * f_s.www;
    return f_p;
}


#define F4 0.309016994374947451

float snoise(vec4 v) {
    const vec4  f_C = vec4( 0.138196601125011,
    0.276393202250021,
    0.414589803375032,
    -0.447213595499958);
    vec4 f_i  = floor(v + dot(v, vec4(F4)) );
    vec4 f_x0 = v -   f_i + dot(f_i, f_C.xxxx);
    vec4 f_i0;
    vec3 f_isX = step( f_x0.yzw, f_x0.xxx );
    vec3 f_isYZ = step( f_x0.zww, f_x0.yyz );
    f_i0.x = f_isX.x + f_isX.y + f_isX.z;
    f_i0.yzw = 1.0 - f_isX;
    f_i0.y += f_isYZ.x + f_isYZ.y;
    f_i0.zw += 1.0 - f_isYZ.xy;
    f_i0.z += f_isYZ.z;
    f_i0.w += 1.0 - f_isYZ.z;
    vec4 f_i3 = clamp( f_i0, 0.0, 1.0 );
    vec4 f_i2 = clamp( f_i0-1.0, 0.0, 1.0 );
    vec4 f_i1 = clamp( f_i0-2.0, 0.0, 1.0 );
    vec4 f_x1 = f_x0 - f_i1 + f_C.xxxx;
    vec4 f_x2 = f_x0 - f_i2 + f_C.yyyy;
    vec4 f_x3 = f_x0 - f_i3 + f_C.zzzz;
    vec4 f_x4 = f_x0 + f_C.wwww;
    f_i = mod289(f_i);
    float f_j0 = permute( permute( permute( permute(f_i.w) + f_i.z) + f_i.y) + f_i.x);
    vec4 f_j1 = permute( permute( permute( permute (
    f_i.w + vec4(f_i1.w, f_i2.w, f_i3.w, 1.0 ))
    + f_i.z + vec4(f_i1.z, f_i2.z, f_i3.z, 1.0 ))
    + f_i.y + vec4(f_i1.y, f_i2.y, f_i3.y, 1.0 ))
    + f_i.x + vec4(f_i1.x, f_i2.x, f_i3.x, 1.0 ));
    vec4 f_ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
    vec4 f_p0 = grad4(f_j0,   f_ip);
    vec4 f_p1 = grad4(f_j1.x, f_ip);
    vec4 f_p2 = grad4(f_j1.y, f_ip);
    vec4 f_p3 = grad4(f_j1.z, f_ip);
    vec4 f_p4 = grad4(f_j1.w, f_ip);
    vec4 f_norm = taylorInvSqrt(vec4(dot(f_p0,f_p0), dot(f_p1,f_p1), dot(f_p2, f_p2), dot(f_p3,f_p3)));
    f_p0 *= f_norm.x;
    f_p1 *= f_norm.y;
    f_p2 *= f_norm.z;
    f_p3 *= f_norm.w;
    f_p4 *= taylorInvSqrt(dot(f_p4,f_p4));
    vec3 f_m0 = max(0.6 - vec3(dot(f_x0,f_x0), dot(f_x1,f_x1), dot(f_x2,f_x2)), 0.0);
    vec2 f_m1 = max(0.6 - vec2(dot(f_x3,f_x3), dot(f_x4,f_x4)            ), 0.0);
    f_m0 = f_m0 * f_m0;
    f_m1 = f_m1 * f_m1;
    return 49.0 * ( dot(f_m0*f_m0, vec3( dot( f_p0, f_x0 ), dot( f_p1, f_x1 ), dot( f_p2, f_x2 ))) + dot(f_m1*f_m1, vec2( dot( f_p3, f_x3 ), dot( f_p4, f_x4 ) ) ) ) ;
}

float fbm(vec4 p) {
    float f_sum = 0.;
    float f_amplitude = 1.;
    float f_scale = 1.;
    for (int i=0; i<6; i++) {
    f_sum += snoise(p* f_scale)*f_amplitude;
    p.w += 100.;
    f_amplitude *= 0.9;
    f_scale *= 2.;
    }
    return f_sum;
}