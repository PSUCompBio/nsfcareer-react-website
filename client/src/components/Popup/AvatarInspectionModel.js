import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import "./AvatarView.css";
import {
  getAvatarInspection
} from '../../apis';

class AvatarInspectionModel extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
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
    this.controller.dispose();
  }

  loadAssets = () => {
    getAvatarInspection({ user_cognito_id: this.props.user_cognito_id })
      .then((response) => {
        const promises = [
          // this.loadTexture("https://assets.codepen.io/3194077/model.jpg"),
          // this.loadPLY("https://assets.codepen.io/3194077/model.ply"),
          // this.loadFBX("./assets/models/brain.FBX"),
          // this.loadPLY("./assets/models/skull.ply"),
          this.loadTexture(response.data.data.model_jpg),
          this.loadPLY(response.data.data.model_ply),
          this.loadFBX("./assets/models/brain.FBX"),
          this.loadPLY(response.data.data.skull_ply),
          this.loadTexture("./assets/textures/brain_diffuse.jpg"),
          this.loadTexture("./assets/textures/brain_normal.png"),
        ];

        Promise.all(promises).then((result) => {
          this.avatarTex = result[0];
          this.avatarGeo = this.bufferGeoToGeo(result[1]);
          this.brain = result[2].children[0];
          this.skullGeo = result[3];
          this.brainTex = result[4];
          this.brainNormalTex = result[5];

          this.loadedAssets();
        });
      })


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
          (v1.x + offset.x) / range.x,
          (v1.y + offset.y) / range.y
        ),
        new THREE.Vector2(
          (v2.x + offset.x) / range.x,
          (v2.y + offset.y) / range.y
        ),
        new THREE.Vector2(
          (v3.x + offset.x) / range.x,
          (v3.y + offset.y) / range.y
        ),
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
      isLoading: false,
    });

    this.init();
    this.animate();
  };

  init = () => {
    this.width = (window.innerWidth / 2) * window.devicePixelRatio;
    this.height = (window.innerHeight) * window.devicePixelRatio;
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
      alpha: true,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
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
    this.controller = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.controller.update();
    this.scene.add(this.camera);
  };

  lightSetup = () => {
    const hemLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 1);
    this.scene.add(hemLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 20, 10);
    this.scene.add(dirLight);
  };

  objectSetup = () => {
    // Create cut plane
    this.clipPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 5);

    // Add avatar model
    this.avatarMat = new THREE.MeshStandardMaterial({
      map: this.avatarTex,
      side: THREE.FrontSide,
      clipShadows: true,
    });
    this.avatarMat2 = new THREE.MeshStandardMaterial({
      color: 0xff9f80,
      side: THREE.BackSide,
      clipShadows: true,
    });

    this.avatarGeo.center();

    this.avatar = new THREE.Mesh(this.avatarGeo, this.avatarMat);
    this.avatar.scale.multiplyScalar(1000);

    this.avatar2 = new THREE.Mesh(this.avatarGeo, this.avatarMat2);
    this.avatar2.scale.multiplyScalar(1000);

    this.scene.add(this.avatar);
    this.scene.add(this.avatar2);

    // Add brain model
    const box = new THREE.Box3().setFromObject(this.brain);
    const center = box.getCenter(new THREE.Vector3());

    this.brain.position.x += this.brain.position.x - center.x;
    this.brain.position.y += this.brain.position.y - center.y;
    this.brain.position.z += this.brain.position.z - center.z;
    this.brain.scale.multiplyScalar(115);
    this.brain.scale.x *= 0.8;
    this.brain.position.y += 45;
    this.brain.position.z += 30;

    this.brain.material.color.setHex(0xffffff);

    this.scene.add(this.brain);

    // Add skull model
    this.skullMat = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      clipShadows: true,
    });
    this.skullGeo.computeVertexNormals();
    this.skullGeo.center();

    this.skull = new THREE.Mesh(this.skullGeo, this.skullMat);
    this.skull.scale.multiplyScalar(1150);

    this.skull.scale.x *= 0.8;
    this.skull.position.y += 85;
    this.skull.position.z += 8.5;

    this.scene.add(this.skull);
  };

  onWindowResize = () => {
    this.width = (window.innerWidth / 2) * window.devicePixelRatio;
    this.height = (window.innerHeight) * window.devicePixelRatio;

    this.camera.left = this.width / -2;
    this.camera.right = this.width / 2;
    this.camera.top = this.height / 2;
    this.camera.bottom = this.height / -2;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
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
    } else {
      this.avatarMat.clippingPlanes = [this.clipPlane];
      this.avatarMat2.clippingPlanes = [this.clipPlane];
      this.skullMat.clippingPlanes = [this.clipPlane];
    }

    this.setState({
      showBrain: !this.state.showBrain,
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
