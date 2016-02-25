import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Object.extend({
  name:        DS.attr('string'),
  description: DS.attr(),
  songs:       DS.hasMany('song'),
});
