import React, { Component } from "react";
import * as THREE from "three";
//import OrbitControls from 'three-orbitcontrols';
import mars from "./mars.jpg";

export class Planet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.computeBoundingBox = this.computeBoundingBox.bind(this);
    this.setupScene = this.setupScene.bind(this);
    this.destroyContext = this.destroyContext.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidMount() {
    this.setupScene();
    
  }

  setupScene() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    let scene = new THREE.Scene();
    scene.background = new THREE.Color("#151618");

    let camera = new THREE.PerspectiveCamera(
      60,
      this.width / this.height,
      0.25,
      1000
    );
    scene.add(camera);

    let sphere = new THREE.SphereGeometry(50, 300, 300);
    let material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(mars)
    });
    let mesh = new THREE.Mesh(sphere, material);
    scene.add(mesh);

    // Pivot point
			let pivotPoint = new THREE.Object3D();
			mesh.add(pivotPoint);
			// Sphere Geometry 2
			let sphereGeometry2 = new THREE.SphereBufferGeometry(15, 30, 30, 0,Math.PI );

			// Sphere Material 2
			let sphereMaterial2= new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./tenor.gif'),
      });
			let sphereMesh2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
			sphereMesh2.position.set(0, 0, 200);
			pivotPoint.add(sphereMesh2);


    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.object = mesh;

    let spotLight = new THREE.SpotLight(0xffffff, 0.25);
    spotLight.position.set(45, 50, 15);
    camera.add(spotLight);
    this.spotLight = spotLight;

    let ambLight = new THREE.AmbientLight(0x333333);
    ambLight.position.set(5, 3, 5);
    this.camera.add(ambLight);

    this.computeBoundingBox();
  }

  computeBoundingBox() {
    let offset = 1.6;
    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject(this.object);
    const center = boundingBox.getCenter();
    const size = boundingBox.getSize();
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this.camera.fov * (Math.PI / 180);
    let cameraZ = maxDim / 2 / Math.tan(fov / 2);
    cameraZ *= offset;
    this.camera.position.z = center.z + cameraZ;
    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    this.camera.far = cameraToFarEdge * 3;
    this.camera.lookAt(center);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
    this.start();
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
      setInterval(() => {
        this.object.rotation.y +=  0.0015
      }, 100);
    }
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.frameId = requestAnimationFrame(this.animate);
    
    this.renderScene();

    
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  handleWindowResize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  componentWillUnmount() {
    this.stop();
    this.destroyContext();
  }


  destroyContext() {
    this.container.removeChild(this.renderer.domElement);
    this.renderer.forceContextLoss();
    this.renderer.context = null;
    this.renderer.domElement = null;
    this.renderer = null;
  }

  geoLocate(longitude, lattitude) {
    this.renderScene();
    console.log("coucou");
  }


  render() {
    return (
      <>
      <div 
        ref={(container) => {this.container = container}}
        style={{height: '55vh', width:'40vw', overflow: 'hidden'}}
      >
      </div>
      {/* <button onClick={()=> this.geoLocate(5,2)}  content={[<p>geoLocate</p>]}/> */}
      </>
    );
  }
}
