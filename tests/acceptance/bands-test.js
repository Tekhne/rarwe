import { test } from 'qunit';
import moduleForAcceptance from 'rarwe/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bands');

test('List bands', function (assert) {
  visit('/bands');

  andThen(function () {
    assert.equal(find('.band-link').length, 2, 'All band links are rendered');
    assert.equal(find('.band-link:contains("Radiohead")').length, 1, 'First band link contains the band name');
    assert.equal(find('.band-link:contains("Long Distance Calling")').length, 1, 'The other band link contains the band name');
  });
});
