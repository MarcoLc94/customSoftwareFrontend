import { Component, useMemo, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Some environments report a usable WebGL context (getContext succeeds) but fail
// once something actually renders with it (GPU disabled, sandboxed renderer, etc).
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? (this.props.fallback ?? null) : this.props.children;
  }
}

interface SafeCanvasProps extends CanvasProps {
  respectReducedMotion?: boolean;
  /** Rendered instead of the Canvas when WebGL is unavailable or fails to init. */
  fallback?: ReactNode;
}

// Wraps @react-three/fiber's Canvas so any environment without a working WebGL
// context renders a fallback instead of crashing (or an empty box) — these
// visuals are decorative, never required for the page to function.
const SafeCanvas = ({ children, respectReducedMotion = true, fallback = null, ...props }: SafeCanvasProps) => {
  const reducedMotion = useMemo(
    () => respectReducedMotion && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false),
    [respectReducedMotion]
  );
  const webglOk = useMemo(() => isWebGLAvailable(), []);

  if (reducedMotion || !webglOk) return <>{fallback}</>;

  return (
    <WebGLErrorBoundary fallback={fallback}>
      <Canvas {...props}>{children}</Canvas>
    </WebGLErrorBoundary>
  );
};

export default SafeCanvas;
