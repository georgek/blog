const config = {
  plugins: [require.resolve("prettier-plugin-go-template")],
  overrides: [
    {
      files: ["*.html"],
      options: {
        parser: "go-template",
      },
    },
  ],
};

module.exports = config;
