let scene, camera, renderer, mesh, controls;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const viewer = document.getElementById("viewer");

  camera = new THREE.PerspectiveCamera(
    45,
    viewer.clientWidth / viewer.clientHeight,
    1,
    10000
  );
  camera.position.set(300, 200, 300);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  viewer.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  const luz = new THREE.DirectionalLight(0xffffff, 1);
  luz.position.set(500, 500, 500);
  scene.add(luz);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  gerarCalha();
}

function gerarCalha() {
  if (mesh) scene.remove(mesh);

  const h1 = Number(document.getElementById("alturaEsq").value);
  const fundo = Number(document.getElementById("fundo").value);
  const h2 = Number(document.getElementById("alturaDir").value);
  const comp = Number(document.getElementById("comprimento").value);

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, h1);
  shape.lineTo(fundo, h2);
  shape.lineTo(fundo, 0);
  shape.lineTo(0, 0);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: comp / 20,
    bevelEnabled: false
  });

  const corEscolhida =
    document.getElementById("cor").value === "branca"
      ? 0xffffff
      : 0xaaaaaa;

  const material = new THREE.MeshStandardMaterial({
    color: corEscolhida
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.x = -fundo / 2;

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
