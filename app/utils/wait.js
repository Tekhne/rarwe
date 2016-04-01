import Ember from 'ember';

function isPromise(value) {
  return value.then && typeof value.then === 'function';
}

export default function wait(value, delay) {
  var promise = isPromise(value) ? value : Ember.RSVP.resolve(value);

  return new Ember.RSVP.Promise(function (resolve) {
    setTimeout(function () {
      promise.then(function (result) {
        resolve(result);
      });
    }, delay);
  });
}
