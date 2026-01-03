let scene, camera, renderer, mesh;

init();
gerarCalha();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(400, 300, 400);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth - 260, window.innerHeight - 70);
  document.getElementById("viewer").appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(500, 500, 500);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xcccccc);
  scene.add(ambient);

  animate();
}

function gerarCalha() {
  if (mesh) scene.remove(mesh);

  const h1 = Number(document.getElementById("h1").value);
  const base = Number(document.getElementById("base").value);
  const h2 = Number(document.getElementById("h2").value);
  const length = Number(document.getElementById("length").value);

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, h1);
  shape.lineTo(base, h1);
  shape.lineTo(base, h2);
  shape.lineTo(base + 20, h2);
  shape.lineTo(base + 20, 0);
  shape.lineTo(0, 0);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: length,
    bevelEnabled: false
  });

  const colorType = document.getElementById("color").value;
  const material = new THREE.MeshStandardMaterial({
    color: colorType === "branca" ? 0xffffff : 0xaaaaaa,
    metalness: colorType === "branca" ? 0.1 : 0.8,
    roughness: 0.4
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
