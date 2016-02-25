import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return bands;
  },

  actions: {
    didTransition: function () {
      document.title = 'Bands - Rock & Roll';
    },

    createBand: function () {
      var name = this.get('controller').get('name');
      var band = Band.create({ name: name });
      bands.get('content').pushObject(band);
      this.get('controller').set('name', '');
      this.transitionTo('bands.band.songs', band);
    }
  }
});
