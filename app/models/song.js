import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Object.extend({
  title:  DS.attr('string'),
  rating: DS.attr('number'),
  band:   DS.belongsTo('band')
});
