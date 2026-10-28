AFRAME.registerComponent('boton-audio', {
  schema: {
    iconoPlay: {default: '#icono-audio'},
    iconoStop: {default: '#icono-detener'}
  },
  init: function () {
    var self = this;
    this.sonando = false;
    this.el.addEventListener('click', function () {        // la mirada se completó
      if (self.sonando) { self.detener(); } else { self.reproducir(); }
    });
    this.el.addEventListener('sound-ended', function () {  // el audio terminó solo
      self.estado(false);
    });
  },
  reproducir: function () { this.el.components.sound.playSound(); this.estado(true); },
  detener: function () { this.el.components.sound.stopSound(); this.estado(false); },
  estado: function (sonando) {
    this.sonando = sonando;
    this.el.setAttribute('material', 'src', sonando ? this.data.iconoStop : this.data.iconoPlay);
  }
});