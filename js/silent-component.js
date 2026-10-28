AFRAME.registerComponent('boton-musica', {
  schema: {
    musica: {type: 'selector', default: '#musica'},
    iconoOn: {default: '#icono-musica'},
    iconoOff: {default: '#icono-silencio'}
  },
  init: function () {
    var self = this;
    this.activa = true;
    this.el.addEventListener('click', function () {
      var sonido = self.data.musica.components.sound;
      self.activa = !self.activa;
      if (self.activa) { sonido.playSound(); } else { sonido.pauseSound(); }
      self.el.setAttribute('material', 'src', self.activa ? self.data.iconoOn : self.data.iconoOff);
    });
  }
});