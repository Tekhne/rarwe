import Ember from 'ember';
import { capitalize } from '../../../helpers/capitalize';

export default Ember.Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's'
  },
  songCreationStarted: false,
  title: '',
  searchTerm: '',

  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function () {
    var searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model.songs').filter(function (song) {
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  newSongPlaceholder: Ember.computed('model.name', function () {
    var bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
  }),

  actions: {
    enableSongCreation() {
      this.set('songCreationStarted', true);
    },

    updateRating(params) {
      var song = params.item;
      var rating = params.rating;

      if (song.get('rating') === rating) {
        rating = 0;
      }

      song.set('rating', rating);
      song.save();
    }
  },

  isAddButtonDisabled: Ember.computed.empty('title'),
  hasSongs: Ember.computed.bool('model.songs.length'),
  canCreateSong: Ember.computed.or('songCreationStarted', 'hasSongs'),

  sortBy: 'ratingDesc',

  sortProperties: Ember.computed('sortBy', function () {
    var options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc'
    };

    return options[this.get('sortBy')].split(',');
  }),

  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties')
});
