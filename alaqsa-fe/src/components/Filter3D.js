"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function Filter3D({ hint, chipLabel }) {
  useEffect(() => {
    const host = document.getElementById("filter3d");
    if (!host || host.querySelector("canvas")) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = host.clientWidth || 760;
    const H = host.clientHeight || 420;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H);
    renderer.domElement.style.zIndex = "1";
    host.appendChild(renderer.domElement);

    const fb = host.querySelector(".stage-fallback");
    if (fb) fb.style.display = "none";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 0.2, 6.6);

    function pleated(rTop, rBot, h, pl, amp) {
      const segs = pl * 4;
      const rings = 26;
      const pos = [];
      const idx = [];
      for (let i = 0; i <= rings; i++) {
        const v = i / rings;
        const y = h * (v - 0.5);
        const r = rBot + (rTop - rBot) * v;
        for (let j = 0; j <= segs; j++) {
          const t = (j / segs) * Math.PI * 2;
          const fr = (t / (2 * Math.PI)) * pl;
          const tri = Math.abs((fr - Math.floor(fr)) * 2 - 1);
          const rr = r + amp * (tri - 0.5) * 2;
          pos.push(Math.cos(t) * rr, y, Math.sin(t) * rr);
        }
      }
      const row = segs + 1;
      for (let i = 0; i < rings; i++) {
        for (let j = 0; j < segs; j++) {
          const a = i * row + j;
          const b = a + 1;
          const c = a + row;
          const d = c + 1;
          idx.push(a, c, b, b, c, d);
        }
      }
      const g = new THREE.BufferGeometry();
      g.setIndex(idx);
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.computeVertexNormals();
      return g;
    }

    const f = new THREE.Group();
    f.add(
      new THREE.Mesh(
        pleated(1.12, 1.34, 2.45, 54, 0.075),
        new THREE.MeshStandardMaterial({
          color: 0xc23a2e,
          roughness: 0.82,
          metalness: 0.08,
          flatShading: true,
        })
      )
    );

    const chrome = new THREE.MeshStandardMaterial({
      color: 0xe2e8ef,
      roughness: 0.16,
      metalness: 1,
    });
    const tc = new THREE.Mesh(new THREE.CylinderGeometry(1.16, 1.16, 0.2, 48), chrome);
    tc.position.y = 1.3;
    f.add(tc);
    const lg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.46, 0.46, 0.22, 40),
      new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.45, metalness: 0.7 })
    );
    lg.position.y = 1.41;
    f.add(lg);
    const bc = new THREE.Mesh(new THREE.CylinderGeometry(1.36, 1.36, 0.18, 48), chrome);
    bc.position.y = -1.3;
    f.add(bc);
    const nk = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 1.0, 0.55, 40, 1, true), chrome);
    nk.position.y = -1.6;
    f.add(nk);
    scene.add(f);

    scene.add(new THREE.AmbientLight(0x3a3a3a, 1.0));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(4, 6, 6);
    scene.add(key);
    const warm = new THREE.PointLight(0xc23a2e, 2.0, 40);
    warm.position.set(-5, 1, 4);
    scene.add(warm);
    const fill = new THREE.PointLight(0xffffff, 0.9, 40);
    fill.position.set(4, -2, 5);
    scene.add(fill);

    let tRY = 0;
    let tRX = 0;
    let cRY = 0;
    let cRX = 0;
    let drag = false;
    let lx = 0;
    let ly = 0;
    let auto = !reduce;
    let animationFrameId;

    host.style.cursor = "grab";

    const onPointerDown = (e) => {
      drag = true;
      auto = false;
      lx = e.clientX;
      ly = e.clientY;
      host.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      drag = false;
      host.style.cursor = "grab";
    };
    const onPointerMove = (e) => {
      if (!drag) return;
      tRY += (e.clientX - lx) * 0.01;
      tRX += (e.clientY - ly) * 0.01;
      tRX = Math.max(-0.5, Math.min(0.6, tRX));
      lx = e.clientX;
      ly = e.clientY;
    };
    const onResize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    host.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    function loop() {
      animationFrameId = requestAnimationFrame(loop);
      if (auto) tRY += 0.006;
      cRY += (tRY - cRY) * 0.08;
      cRX += (tRX - cRX) * 0.08;
      f.rotation.y = cRY;
      f.rotation.x = 0.12 + cRX;
      renderer.render(scene, camera);
    }
    loop();

    const rpm = document.getElementById("rpm");
    if (reduce) {
      if (rpm) rpm.textContent = "+18%";
    } else {
      setTimeout(() => {
        let v = 0;
        const t = setInterval(() => {
          v += 0.6;
          if (v >= 18) {
            v = 18;
            clearInterval(t);
          }
          if (rpm) rpm.textContent = "+" + v.toFixed(0) + "%";
        }, 26);
      }, 600);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      host.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      host.style.cursor = "";
      if (fb) fb.style.display = "";
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <img className="stage-fallback" src="/filter3d.jpg" alt="فلتر رياضي" />
      <span className="spinhint" dangerouslySetInnerHTML={{ __html: hint }} />
      <div className="chip">
        <div className="n" id="rpm">
          +0%
        </div>
        <div className="l" dangerouslySetInnerHTML={{ __html: chipLabel }} />
      </div>
    </>
  );
}
