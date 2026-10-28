AFRAME.registerComponent('punto-teleport', {
  schema: {
    rig: {type: 'selector', default: '#rig'},
    camara: {type: 'selector', default: '#camera'},
    fundido: {type: 'selector', default: '#fundido'}
  },
  init: function () {
    var self = this;
    this.el.addEventListener('click', function () { self.teletransportar(); });
  },
  teletransportar: function () {
    var destino = new THREE.Vector3();
    this.el.object3D.getWorldPosition(destino);         
    var cam = this.data.camara.object3D.position;       
    this.data.rig.object3D.position.set(
      destino.x - cam.x,
      0,
      destino.z - cam.z
    );
  }
});

fundido.emit('oscurecer');
fundido.addEventListener('animationcomplete__oscurecer', function () {
  fundido.emit('aclarar');
}, {once: true});

this.el.sceneEl.emit('teleport-hecho', {punto: this.el});

this.el.sceneEl.addEventListener('teleport-hecho', function (evt) {
  var esActual = evt.detail.punto === self.el;
  if (esActual) { self.el.classList.remove('clicable'); } else { self.el.classList.add('clicable'); }
  self.el.setAttribute('material', 'opacity', esActual ? 0.25 : 1);
});