precision lowp float;
uniform float iTime;
uniform	vec3 seed;
uniform float fade;
uniform float speed;
varying vec2 v_uv;
void main() {
	float t = iTime * speed;
	vec3 c = vec3(0.69-sin(seed.x+t/3e3+v_uv.y+v_uv.x)*0.3,0.713-cos(seed.y+t/3e3+v_uv.y+v_uv.x)*0.3,0.72+sin(seed.z+t/3e3+v_uv.y+v_uv.x)*0.3);
	c += fade*v_uv.y;
	gl_FragColor = vec4(c,1.0);
}