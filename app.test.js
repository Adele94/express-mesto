const sayHello = (firstName, secondName) => `Здравствуйте, ${firstName} ${secondName}!`;

// eslint-disable-next-line no-undef
it('Создаёт приветствие', () => {
  // eslint-disable-next-line no-undef
  expect(sayHello('Стас', 'Басов')).toBe('Здравствуйте, Стас Басов!');
});

module.exports = sayHello;
