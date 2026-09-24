/** A small, transparent WebGL surface; all content remains ordinary HTML. */
export function setupShader(): (() => void) | undefined {
  const canvas = document.querySelector<HTMLCanvasElement>('.hero-shader');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return;
  const shaders: WebGLShader[] = [];
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, `attribute vec2 position;
    void main(){gl_Position=vec4(position,0.,1.);}`));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `precision mediump float;
    uniform vec2 resolution; uniform float time; uniform vec2 pointer;
    void main(){
      vec2 uv=gl_FragCoord.xy/resolution;
      vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.);
      p+=(pointer-.5)*.08;
      float r=length(p);
      float wave=sin(r*23.-time*.65+sin(p.x*5.+time*.2)*2.);
      float ribbon=pow(.5+.5*wave,12.);
      float halo=exp(-r*r*3.5);
      vec3 color=mix(vec3(.22,.68,.66),vec3(.98,.51,.27),.5+.5*sin(p.y*4.+time*.18));
      float alpha=(ribbon*.38+.09)*halo*(1.-smoothstep(.28,.72,r));
      gl_FragColor=vec4(color*alpha,alpha);
    }`));
  gl.linkProgram(program);
  const buffer = gl.createBuffer();
  const dispose = () => { gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader)); };
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return; }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, 'resolution');
  const time = gl.getUniformLocation(program, 'time');
  const pointer = gl.getUniformLocation(program, 'pointer');
  let frame = 0, visible = false, lost = false, last = 0;
  let px = .5, py = .5;
  const render = (now: number) => {
    if (!visible || document.hidden || lost) { frame = 0; return; }
    if (now - last > 32) {
      last = now;
      gl.uniform1f(time, now * .001);
      gl.uniform2f(pointer, px, py);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    frame = requestAnimationFrame(render);
  };
  const resume = () => { if (!frame && visible && !document.hidden && !lost) frame = requestAnimationFrame(render); };
  const resize = new ResizeObserver(() => {
    const ratio = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
  });
  resize.observe(canvas);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
  observer.observe(canvas);
  const move = (event: PointerEvent) => { px = event.clientX / window.innerWidth; py = 1 - event.clientY / window.innerHeight; };
  const contextLost = () => { lost = true; canvas.style.opacity = '0'; };
  canvas.addEventListener('webglcontextlost', contextLost);
  window.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('visibilitychange', resume);
  return () => {
    cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
    window.removeEventListener('pointermove', move);
    document.removeEventListener('visibilitychange', resume);
    canvas.removeEventListener('webglcontextlost', contextLost);
    dispose();
  };
}
