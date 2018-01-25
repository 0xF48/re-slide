precision lowp float;
uniform float iTime;
varying vec2 v_uv;
void main() {
	vec3 c = vec3(0.5-sin(iTime/3e3+v_uv.x)*0.4,0.7-cos(iTime/3e3+v_uv.x)*0.3,0.7+sin(iTime/3e3+v_uv.x)*0.3);
	c += pow(v_uv.y*1.15,2.0);
	gl_FragColor = vec4(c,1.0);
}