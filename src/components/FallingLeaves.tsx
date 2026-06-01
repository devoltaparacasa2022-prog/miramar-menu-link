import { useEffect, useRef } from "react";
import * as THREE from "three";

function createRealisticLeafTexture(type: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 256);

  const baseGrad = ctx.createRadialGradient(128, 128, 10, 128, 128, 110);

  if (type === 0) {
    baseGrad.addColorStop(0, "#9a3412");
    baseGrad.addColorStop(0.5, "#c2410c");
    baseGrad.addColorStop(0.8, "#ea580c");
    baseGrad.addColorStop(1, "#7c2d12");
  } else if (type === 1) {
    baseGrad.addColorStop(0, "#b45309");
    baseGrad.addColorStop(0.6, "#d97706");
    baseGrad.addColorStop(0.9, "#f59e0b");
    baseGrad.addColorStop(1, "#78350f");
  } else {
    baseGrad.addColorStop(0, "#451a03");
    baseGrad.addColorStop(0.7, "#78350f");
    baseGrad.addColorStop(1, "#270c01");
  }

  ctx.fillStyle = baseGrad;
  ctx.beginPath();

  if (type === 0) {
    ctx.moveTo(128, 20);
    ctx.lineTo(138, 50); ctx.lineTo(155, 45); ctx.lineTo(145, 75);
    ctx.lineTo(185, 60); ctx.lineTo(175, 95); ctx.lineTo(220, 100);
    ctx.lineTo(190, 130); ctx.lineTo(215, 160); ctx.lineTo(170, 170);
    ctx.lineTo(155, 210); ctx.lineTo(128, 220);
    ctx.lineTo(101, 210); ctx.lineTo(86, 170); ctx.lineTo(41, 160);
    ctx.lineTo(66, 130); ctx.lineTo(36, 100); ctx.lineTo(81, 95);
    ctx.lineTo(71, 60); ctx.lineTo(111, 75); ctx.lineTo(101, 45);
    ctx.lineTo(118, 50);
  } else {
    ctx.moveTo(128, 20);
    for (let y = 20; y <= 210; y += 15) {
      const rx = 128 + Math.sin(((y - 20) / 190) * Math.PI) * 75;
      ctx.lineTo(rx + (y % 10 === 0 ? 5 : -3), y);
    }
    ctx.lineTo(128, 225);
    for (let y = 210; y >= 20; y -= 15) {
      const lx = 128 - Math.sin(((y - 20) / 190) * Math.PI) * 75;
      ctx.lineTo(lx - (y % 10 === 0 ? 5 : -3), y);
    }
  }
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(251, 191, 36, 0.25)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(128, 220);
  ctx.lineTo(128, 40);
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(251, 191, 36, 0.15)";
  ctx.beginPath();
  for (let i = 60; i < 200; i += 25) {
    ctx.moveTo(128, i);
    ctx.lineTo(128 + 50, i - 30);
    ctx.moveTo(128, i);
    ctx.lineTo(128 - 50, i - 30);
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

interface LeafData {
  baseFallSpeed: number;
  windFactor: number;
  flutterSpeed: number;
  flutterPhase: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
}

function resetLeaf(leaf: THREE.Mesh, initial = false) {
  leaf.position.x = (Math.random() - 0.5) * 30;
  leaf.position.y = initial ? (Math.random() - 0.5) * 24 : 14 + Math.random() * 4;
  leaf.position.z = (Math.random() - 0.5) * 10;

  leaf.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );

  const s = 0.7 + Math.random() * 0.6;
  leaf.scale.set(s, s, s);

  leaf.userData = {
    baseFallSpeed: 0.02 + Math.random() * 0.03,
    windFactor: 0.01 + Math.random() * 0.02,
    flutterSpeed: 0.8 + Math.random() * 1.4,
    flutterPhase: Math.random() * Math.PI * 2,
    rotSpeedX: 0.01 + Math.random() * 0.01,
    rotSpeedY: 0.005 + Math.random() * 0.015,
    rotSpeedZ: 0.008 + Math.random() * 0.012,
  } satisfies LeafData;
}

const FallingLeaves = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const sunLight = new THREE.DirectionalLight(0xfff1e0, 0.8);
    sunLight.position.set(5, 10, 5);
    scene.add(sunLight);

    const textures = [
      createRealisticLeafTexture(0),
      createRealisticLeafTexture(1),
      createRealisticLeafTexture(2),
    ];

    const leaves: THREE.Mesh[] = [];
    const leafCount = 14;

    for (let i = 0; i < leafCount; i++) {
      const geometry = new THREE.PlaneGeometry(1.6, 1.6, 4, 4);
      const pos = geometry.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const vx = pos.getX(j);
        const vy = pos.getY(j);
        const vz = 0.18 * Math.sin(vx * 1.5) * Math.cos(vy * 1.5);
        pos.setZ(j, vz);
      }
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial({
        map: textures[i % textures.length],
        transparent: true,
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.1,
        depthWrite: false,
      });

      const leaf = new THREE.Mesh(geometry, material);
      resetLeaf(leaf, true);
      scene.add(leaf);
      leaves.push(leaf);
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      leaves.forEach((leaf) => {
        const data = leaf.userData as LeafData;
        data.flutterPhase += 0.015 * data.flutterSpeed;

        const angleOfAttack = Math.abs(Math.sin(leaf.rotation.x));
        const lift = (1.0 - angleOfAttack) * 0.5;

        const actualFallSpeed = data.baseFallSpeed * (1.0 - lift * 0.4);
        leaf.position.y -= actualFallSpeed;

        const drift = Math.sin(data.flutterPhase) * (0.015 + lift * 0.04);
        leaf.position.x += drift + data.windFactor;

        leaf.rotation.x += data.rotSpeedX + Math.sin(data.flutterPhase) * 0.01;
        leaf.rotation.y += data.rotSpeedY;
        leaf.rotation.z += data.rotSpeedZ + Math.cos(data.flutterPhase) * 0.008;

        if (leaf.position.y < -14 || Math.abs(leaf.position.x) > 20) {
          resetLeaf(leaf, false);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      leaves.forEach((leaf) => {
        leaf.geometry.dispose();
        (leaf.material as THREE.Material).dispose();
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
};

export default FallingLeaves;
