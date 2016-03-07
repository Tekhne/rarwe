import Ember from 'ember';

export default Ember.Controller.extend({
  songCreationStarted: false,
  title: '',

  actions: {
    enableSongCreation: function () {
      this.set('songCreationStarted', true);
    },

    updateRating: function (params) {
      var song = params.item;
      var rating = params.rating;

      if (song.get('rating') === rating) {
        rating = 0;
      }

      song.set('rating', rating);
      song.save();
    }
  },

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function () {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  isAddButtonDisabled: Ember.computed('title', function () {
    return Ember.isEmpty(this.get('title'));
  }),

  sortProperties: ['rating:desc', 'title:asc'],
  sortedSongs: Ember.computed.sort('model.songs', 'sortProperties')
});
