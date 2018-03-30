const { getFirstKey } = require('./index')

test('getFirstKey', () => {
  const input = {
    foo: 'bar',
    bar: 'foo'
  }
  const output = getFirstKey(input)
  const expected = 'bar'
  expect(output).toEqual(expected)
})
