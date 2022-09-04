module.exports = {
  'plugins': [
    ['module-resolver', {
      'root': ['./src']
    }]
  ],
  'presets': [
    ['@babel/preset-env'],
    '@babel/preset-typescript',
    ['@babel/preset-react', {
      'runtime': 'automatic'
    }]
  ]
};