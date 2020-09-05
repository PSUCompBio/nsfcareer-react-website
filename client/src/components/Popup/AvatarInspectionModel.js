import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { ThreeBSP } from "three-js-csg-es6";

import "./AvatarView.css";
// import {
//   getAvatarInspection
// } from '../../apis';

class AvatarInspectionModel extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isToggle: false,
      showBrain: false,
    };
  }

  componentDidMount() {
    this.loadAssets();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("click", this.handleMouseClick);
    window.cancelAnimationFrame(this.requestID);

    if (this.controller)
      this.controller.dispose();
  }

  componentDidUpdate() {
    if (this.props.isVisible.display === 'flex' && !this.state.isToggle) {
        this.resetCamera();
        if (this.el && this.camera) {
          this.onWindowResize();
        }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isVisible.display === 'none') {
      return {
        isToggle: false
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  loadAssets = () => {
    // getAvatarInspection({ user_cognito_id: this.props.user_cognito_id })
    //   .then((response) => {
        const promises = [
          // this.loadTexture("https://assets.codepen.io/3194077/model.jpg"),
          // this.loadPLY("https://assets.codepen.io/3194077/model.ply"),
          // this.loadPLY("./assets/models/brain.ply"),
          // this.loadPLY("./assets/models/skull.ply"),
          this.loadTexture(this.props.inspection_data.model_jpg),
          this.loadPLY(this.props.inspection_data.model_ply),
          this.loadPLY(this.props.inspection_data.brain_ply),
          this.loadPLY(this.props.inspection_data.skull_ply),
          this.loadTexture("./assets/textures/brain_diffuse.jpg"),
          this.loadTexture("./assets/textures/brain_normal.png"),
        ];

        Promise.all(promises).then((result) => {
          this.avatarTex = result[0];
          this.avatarGeo = this.bufferGeoToGeo(result[1]);
          this.brainGeo = this.bufferGeoToGeo(result[2]);
          this.skullGeo = this.bufferGeoToGeo(result[3]);
          this.brainTex = result[4];
          this.brainNormalTex = result[5];
          this.brainTex.wrapS = THREE.RepeatWrapping;
          this.brainTex.wrapT = THREE.RepeatWrapping;
          this.brainTex.repeat.set(0.5, 0.5);

          this.uvGenerate(this.brainGeo);

          this.loadedAssets();
        });
      // })
  };

  bufferGeoToGeo = (bufferGeo) => {
    const geometry = new THREE.Geometry();
    geometry.fromBufferGeometry(bufferGeo);
    geometry.computeFaceNormals();
    geometry.mergeVertices();
    geometry.computeVertexNormals();
    return geometry;
  };

  uvGenerate = (geometry) => {
    geometry.computeBoundingBox();

    const max = geometry.boundingBox.max,
      min = geometry.boundingBox.min;
    const offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    const range = new THREE.Vector2(max.x - min.x, max.y - min.y);
    let faces = geometry.faces;

    geometry.faceVertexUvs[0] = [];

    for (let i = 0; i < faces.length; i++) {
      const v1 = geometry.vertices[faces[i].a],
        v2 = geometry.vertices[faces[i].b],
        v3 = geometry.vertices[faces[i].c];
      geometry.faceVertexUvs[0].push([
        new THREE.Vector2(
          (v1.x + v1.z + v1.y + offset.x) / range.x,
          (v1.y - v1.z + offset.y) / range.y
        ),
        new THREE.Vector2(
          (v2.x + v2.z + v2.y + offset.x) / range.x,
          (v2.y - v2.z + offset.y) / range.y
        ),
        new THREE.Vector2(
          (v3.x + v3.z + v3.y + offset.x) / range.x,
          (v3.y - v3.z + offset.y) / range.y
        )
      ]);
    }
    geometry.uvsNeedUpdate = true;
  };

  loadTexture = (url) => {
    return new Promise((resolve) => {
      new THREE.TextureLoader().load(url, resolve);
    });
  };

  loadPLY = (url) => {
    return new Promise((resolve) => {
      new PLYLoader().load(url, resolve);
    });
  };

  loadFBX = (url) => {
    return new Promise((resolve) => {
      new FBXLoader().load(url, resolve);
    });
  };

  loadedAssets = () => {
    this.setState({
      isLoading: false
    });

    this.init();
    this.animate();
  };

  init = () => {
    this.expectedWidth = 1280;
    this.expectedHeight = 720;
    this.width = this.el.offsetWidth * window.devicePixelRatio;
    this.height = this.el.offsetHeight * window.devicePixelRatio;
    this.mouse = new THREE.Vector2();

    this.sceneSetup();

    this.cameraSetup();

    this.lightSetup();

    this.objectSetup();

    window.addEventListener("resize", this.onWindowResize, false);
  };

  sceneSetup = () => {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
    this.renderer.localClippingEnabled = true;
    this.el.appendChild(this.renderer.domElement);
  };

  cameraSetup = () => {
    this.camera = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      0.1,
      10000
    );
    this.camera.position.z = 1000;
    this.camera.zoom =
      this.el.offsetWidth > this.el.offsetHeight
        ? this.el.offsetWidth / this.expectedWidth
        : this.el.offsetHeight / this.expectedHeight;
    this.camera.updateProjectionMatrix();
    this.controller = new OrbitControls(this.camera, this.renderer.domElement);
    this.controller.update();
    this.scene.add(this.camera);
  };

  lightSetup = () => {
    const hemLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 1);
    this.scene.add(hemLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 20, 10);
    this.scene.add(dirLight);

    this.pointLight = new THREE.PointLight(0xffffff, 0.4);
    this.pointLight.position.set(-200, 100, 0);
    this.pointLight.visible = false;
    this.scene.add(this.pointLight);
  };

  objectSetup = () => {
    // Create cut plane
    this.clipPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 5);

    // Add avatar model
    this.avatarMat = new THREE.MeshStandardMaterial({
      map: this.avatarTex,
      side: THREE.FrontSide,
      clipShadows: true,
      roughness: 1
    });
    this.avatarMat2 = new THREE.MeshStandardMaterial({
      color: 0xff9f80,
      side: THREE.BackSide,
      clipShadows: true,
      roughness: 1
    });

    this.avatarGeo.center();

    this.avatar = new THREE.Mesh(this.avatarGeo, this.avatarMat);
    this.avatar.scale.multiplyScalar(1000);

    this.avatar2 = this.avatar.clone();
    this.avatar2.material = this.avatarMat2;

    this.scene.add(this.avatar);
    this.scene.add(this.avatar2);

    // Add brain model
    this.brainMat = new THREE.MeshPhongMaterial({
      map: this.brainTex,
      side: THREE.DoubleSide,
      clipShadows: false,
      color: 0xaaaaaa,
      specular: 0x000000
    });
    this.brainGeo.computeVertexNormals();
    this.brainGeo.center();

    this.brain = new THREE.Mesh(this.brainGeo, this.brainMat);
    this.brain.scale.multiplyScalar(1100);

    this.brain.scale.x *= 0.8;
    this.brain.position.y += 90;
    this.brain.position.z += 8.5;

    this.scene.add(this.brain);

    // Add skull model
    this.skullMat = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      clipShadows: false,
      color: 0xaaaaaa,
      specular: 0x000000
    });
    this.skullGeo.computeVertexNormals();
    this.skullGeo.center();

    this.skull = new THREE.Mesh(this.skullGeo, this.skullMat);
    this.skull.scale.multiplyScalar(1150);

    this.skull.scale.x *= 0.8;
    this.skull.position.y += 85;
    this.skull.position.z += 8.5;

    const box = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 500));
    box.position.x += 245.1;

    this.skull2 = this.intersectMesh(this.skull, box).csg;
    this.skull2.material = this.skullMat;

    this.scene.add(this.skull2);
  };

  intersectMesh = (mesh1, mesh2) => {
    const sBSP = new ThreeBSP(mesh1);
    const bBSP = new ThreeBSP(mesh2);

    const sub = bBSP.intersect(sBSP);
    const newMesh = sub.toMesh();

    return Object.assign({}, { csg: newMesh });
  };

  resetCamera = () => {
    if (this.controller)
      this.controller.reset();
  };

  subtractMesh = (mesh1, mesh2) => {
    const sBSP = new ThreeBSP(mesh1);
    const bBSP = new ThreeBSP(mesh2);

    const sub = bBSP.subtract(sBSP);
    const newMesh = sub.toMesh();

    return Object.assign({}, { csg: newMesh });
  };

  onWindowResize = () => {
    this.width = this.el.offsetWidth * window.devicePixelRatio;
    this.height = this.el.offsetHeight * window.devicePixelRatio;

    this.camera.left = this.width / -2;
    this.camera.right = this.width / 2;
    this.camera.top = this.height / 2;
    this.camera.bottom = this.height / -2;
    this.camera.zoom =
      this.el.offsetWidth > this.el.offsetHeight
        ? this.el.offsetWidth / this.expectedWidth
        : this.el.offsetHeight / this.expectedHeight;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
  };

  animate = () => {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate);
  };

  toggleBrain = () => {
    if (this.state.showBrain) {
      this.avatarMat.clippingPlanes = null;
      this.avatarMat2.clippingPlanes = null;
      this.skullMat.clippingPlanes = null;
      this.pointLight.visible = false;
    } else {
      this.avatarMat.clippingPlanes = [this.clipPlane];
      this.avatarMat2.clippingPlanes = [this.clipPlane];
      this.skullMat.clippingPlanes = [this.clipPlane];
      this.pointLight.visible = true;
    }

    this.setState({
      isToggle: true,
      showBrain: !this.state.showBrain
    });
  };

  scrollToTop() {
    //  window.scrollTo(0, 0)
  }

  render() {
    const { isLoading, showBrain } = this.state;
    return (
      <div style={this.props.isVisible} className="modal__wrapper ">
        {this.props.isVisible ? this.scrollToTop() : null}
        <div className="modal__show modal_form avatar-inspection-box" style={{ 'height': 'auto' }}>
          <img
            className="delete__icon"
            onClick={() => this.props.makeVisible({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />
          {isLoading ? (
            <div>loading</div>
          ) : (
              <div className="CanvasContainer" ref={(ref) => (this.el = ref)}>
                <button className="ToggleBrain" onClick={this.toggleBrain}>
                  {showBrain ? "Hide Brain" : "Show Brain"}
                </button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default AvatarInspectionModel;
