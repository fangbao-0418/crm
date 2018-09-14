// module.exports = ({ file, options, env }) => {
//   return ({
//     plugins: {
//       'autoprefixer': {},
//       // 'postcss-csso': options.env === 'production' ? {} : false
//       'postcss-csso': {}
//     }
//   })
// }
module.exports = {
  plugins: [
    // require('precss'),
    require('autoprefixer')
  ]
}
