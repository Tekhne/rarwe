import { test } from 'qunit';
import moduleForAcceptance from 'rarwe/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

moduleForAcceptance('Acceptance | bands');

var server;

test('List bands', function (assert) {
  server = new Pretender(function () {
    httpStubs.stubBands(this, [
      {
        id: 1,
        attributes: {
          name: 'Radiohead'
        }
      },
      {
        id: 2,
        type: 'bands',
        attributes: {
          name: 'Long Distance Calling'
        }
      }
    ]);
    httpStubs.stubCreateBand(this, 2);
  });

  visit('/bands');

  andThen(function () {
    assertLength(assert, '.band-link', 2, 'All band links are rendered');
    assertLength(assert, '.band-link:contains("Radiohead")', 1, 'First band link contains the band name');
    assertLength(assert, '.band-link:contains("Long Distance Calling")', 1, 'The other band link contains the band name');
  });
});

test('Create a new band', function (assert) {
  server = new Pretender(function () {
    this.get('/bands', function () {
      var response = {
        data: [
          {
            id: 1,
            type: 'bands',
            attributes: {
              name: 'Radiohead'
            }
          }
        ]
      };

      return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify(response)];
    });

    this.post('/bands', function () {
      var response = {
        data: [
          {
            id: 2,
            type: 'bands',
            attributes: {
              name: 'Long Distance Calling'
            }
          }
        ]
      };

      return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify(response)];
    });
  });

  visit('/bands');
  fillIn('.new-band', 'Long Distance Calling');
  click('.new-band-button');

  andThen(function () {
    assert.equal(find('.band-link').length, 2, 'All band links are rendered');
    assert.equal(find('.band-link:last').text().trim(), 'Long Distance Calling', 'Created band appears at the end of the list');
    assert.equal(find('.nav a.active:contains("Songs")').length, 1, 'The Songs tab is active');
  });
});

test('Create a new song in two steps', function (assert) {
  server = new Pretender(function () {
    this.get('/bands', function () {
      var response = {
        data: [
          {
            id: 1,
            type: 'bands',
            attributes: {
              name: 'Radiohead'
            }
          }
        ]
      };

      return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify(response)];
    });

    this.post('/songs', function () {
      var response = {
        data: [
          {
            id: 1,
            type: 'songs',
            attributes: {
              name: 'Killer Cars'
            }
          }
        ]
      };

      return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify(response)];
    });

    this.get('/bands/1/songs', () => {
      return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify({ data: [] })];
    });
  });

  selectBand('Radiohead');
  click('a:contains("create one")');
  fillIn('.new-song', 'Killer Cars');
  submit('.new-song-form');

  andThen(function () {
    assert.equal(find('.songs .song:contains("Killer Cars")').length, 1, "Creates the song and displays it in the list");
  });
});
