import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fundo 3D animado: uma grade de barras que sobe e desce como uma
 * superfície de dados (preços, métricas, séries temporais), reagindo
 * suavemente ao mouse. Renderiza atrás do conteúdo, com baixa opacidade,
 * para não competir com o texto.
 */
export default function DataTerrain({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.032);

    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 10, 24);
    camera.lookAt(0, -1, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x9db8a8, 0.55);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x34d399, 1.0);
    key.position.set(10, 18, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x0ea5e9, 0.35);
    rim.position.set(-14, 6, -10);
    scene.add(rim);

    const GRID = 22;
    const SPACING = 1.5;
    const barGeo = new THREE.BoxGeometry(1, 1, 1);
    const colorLow = new THREE.Color(0x0f2f22);
    const colorHigh = new THREE.Color(0x34d399);

    const group = new THREE.Group();
    const bars = [];

    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const x = (i - GRID / 2) * SPACING;
        const z = (j - GRID / 2) * SPACING;
        const mat = new THREE.MeshStandardMaterial({
          color: colorLow.clone(),
          roughness: 0.5,
          metalness: 0.2,
          transparent: true,
          opacity: 0.85,
        });
        const bar = new THREE.Mesh(barGeo, mat);
        bar.position.set(x, 0, z);
        bar.userData = { x: i, z: j };
        group.add(bar);
        bars.push(bar);
      }
    }
    group.rotation.y = Math.PI / 6;
    group.position.y = -2;
    scene.add(group);

    function noise(x, z, t) {
      return (
        Math.sin(x * 0.32 + t * 0.3) * Math.cos(z * 0.28 - t * 0.2) * 0.5 +
        Math.sin(x * 0.1 - z * 0.16 + t * 0.1) * 0.5
      );
    }

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();
    let frameId;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = prefersReduced ? 0 : clock.getElapsedTime();

      bars.forEach((bar) => {
        const { x, z } = bar.userData;
        const n = noise(x - GRID / 2, z - GRID / 2, t);
        const height = Math.max(0.12, (n + 1.1) * 1.9);
        bar.scale.y = height;
        bar.position.y = height / 2 - 3;
        const mix = Math.min(1, Math.max(0, (height - 0.4) / 3.4));
        bar.material.color.copy(colorLow).lerp(colorHigh, mix);
      });

      if (!prefersReduced) {
        group.rotation.y = Math.PI / 6 + mouseX * 0.18;
        camera.position.x = mouseX * 2.4;
        camera.position.y = 10 + mouseY * 1.2;
        camera.lookAt(0, -2, 0);
      }

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      barGeo.dispose();
      bars.forEach((b) => b.material.dispose());
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: -10 }}
    />
  );
}
