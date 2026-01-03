let scene, camera, renderer, mesh, controls;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const viewer = document.getElementById("viewer");

  camera = new THREE.PerspectiveCamera(
    45,
    viewer.clientWidth / viewer.clientHeight,
    1,
    10000
  );

  camera.position.set(400, 300, 400);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  viewer.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(500, 500, 500);
  scene.add(light1);

  const light2 = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(light2);

  gerarCalha();
}

function gerarCalha() {
  if (mesh) scene.remove(mesh);

  const alturaEsq = Number(document.getElementById("alturaEsq").value);
  const fundo = Number(document.getElementById("fundo").value);
  const alturaDir = Number(document.getElementById("alturaDir").value);
  const comprimento = Number(document.getElementById("comprimento").value);

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, alturaEsq);
  shape.lineTo(fundo, alturaDir);
  shape.lineTo(fundo, 0);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    depth: comprimento / 10,
    bevelEnabled: false
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  const cor = document.getElementById("cor").value === "branca"
    ? 0xffffff
    : 0xaaaaaa;

  const material = new THREE.MeshStandardMaterial({
    color: cor,
    metalness: 0.6,
    roughness: 0.4
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(-fundo / 2, 0, -comprimento / 20);

  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  const viewer = document.getElementById("viewer");
  camera.aspect = viewer.clientWidth / viewer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
});
