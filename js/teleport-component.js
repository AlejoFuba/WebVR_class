AFRAME.registerComponent('punto-teleport', {
  schema: {
    rig: {type: 'selector', default: '#rig'},
    camara: {type: 'selector', default: '#camera'},
    fundido: {type: 'selector', default: '#fundido'}
  },

  init: function () {
    var self = this;
    this.moviendo = false;

    this.el.addEventListener('click', function () { self.teletransportar(); });

    // El punto donde estoy se apaga; los demás se encienden
    this.el.sceneEl.addEventListener('teleport-hecho', function (evt) {
      var esActual = evt.detail.punto === self.el;
      if (esActual) { self.el.classList.remove('clicable'); } else { self.el.classList.add('clicable'); }
      self.el.setAttribute('material', 'opacity', esActual ? 0.25 : 1);
    });
  },

  teletransportar: function () {
    var self = this;
    var fundido = this.data.fundido;
    if (this.moviendo) { return; }   // evita doble clic durante el fundido
    this.moviendo = true;

    if (!fundido) { this.mover(); this.moviendo = false; return; }

    // oscurecer → mover con la pantalla en negro → aclarar
    fundido.addEventListener('animationcomplete__oscurecer', function () {
      self.mover();
      fundido.emit('aclarar');
      self.moviendo = false;
    }, {once: true});
    fundido.emit('oscurecer');
  },

  mover: function () {
    var destino = new THREE.Vector3();
    this.el.object3D.getWorldPosition(destino);
    var cam = this.data.camara.object3D.position;
    this.data.rig.object3D.position.set(destino.x - cam.x, 0, destino.z - cam.z);
    this.el.sceneEl.emit('teleport-hecho', {punto: this.el});
  }
});