/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
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