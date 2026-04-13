const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(innerWidth, innerHeight);
document.getElementById("bg").appendChild(renderer.domElement);

camera.position.z = 5;

// ✨ BIGGER SPARKS (GLOW EFFECT)
const sparkCount = 800;
const geo = new THREE.BufferGeometry();
const pos = new Float32Array(sparkCount * 3);

for (let i = 0; i < pos.length; i++) {
  pos[i] = (Math.random() - 0.5) * 15;
}

geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

const mat = new THREE.PointsMaterial({
  size: 0.06, // 🔥 BIGGER
  color: 0xff7ab6,
  transparent: true,
  opacity: 0.9
});

const sparks = new THREE.Points(geo, mat);
scene.add(sparks);

// 🧮 HUGE FLOATING EQUATIONS
const equations = [
  "E = mc²",
  "F = ma",
  "∫ f(x) dx",
  "ψ(x,t)",
  "ΔxΔp ≥ ħ/2",
  "λ = h/p"
];

let eqObjects = [];

function createEquation(text) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1024;   // 🔥 MUCH BIGGER
  canvas.height = 512;

  ctx.fillStyle = "rgba(255,122,182,0.95)";
  ctx.font = "80px monospace"; // 🔥 HUGE TEXT
  ctx.fillText(text, 50, 260);

  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true
  });

  const sprite = new THREE.Sprite(material);

  // 🔥 SCALE UP SPRITE
  sprite.scale.set(4, 2, 1);

  sprite.position.set(
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 5
  );

  sprite.userData = {
    vx: (Math.random() - 0.5) * 0.02,
    vy: (Math.random() - 0.5) * 0.02
  };

  scene.add(sprite);
  eqObjects.push(sprite);
}

// 🔥 MORE EQUATIONS
for (let i = 0; i < 25; i++) {
  createEquation(equations[Math.floor(Math.random() * equations.length)]);
}

// 🎮 ANIMATION
function animate() {
  requestAnimationFrame(animate);

  // smooth rotation
  sparks.rotation.y += 0.0015;

  eqObjects.forEach(eq => {
    eq.position.x += eq.userData.vx;
    eq.position.y += eq.userData.vy;

    // subtle rotation
    eq.rotation.z += 0.002;

    // wrap around edges
    if (eq.position.x > 7) eq.position.x = -7;
    if (eq.position.x < -7) eq.position.x = 7;
    if (eq.position.y > 6) eq.position.y = -6;
    if (eq.position.y < -6) eq.position.y = 6;
  });

  renderer.render(scene, camera);
}

animate();

// 📱 RESPONSIVE FIX
window.addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

document.addEventListener("DOMContentLoaded", function () {

  const toggleBtn = document.getElementById("theme-toggle");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    toggleBtn.textContent =
      document.body.classList.contains("light-mode") ? "☀️" : "🌙";
  });

});

// ✨ TRACK CURSOR POSITION
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

