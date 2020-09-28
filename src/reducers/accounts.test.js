import reducer from './accounts';

test('accounts sets its default state', () => {
  expect(reducer()).toEqual([]);
});
