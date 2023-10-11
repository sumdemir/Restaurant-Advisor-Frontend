module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  module: {
    rules: [
      // Diğer yükleme kuralları burada olabilir
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'videos/',
          },
        },
      },
    ],
  },
}
