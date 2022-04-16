require('dotenv').config();

const buildOntology = require("./_scripts/ontology");

module.exports = function (el) {
  /* Passthrough Copy */
  el.addPassthroughCopy("CNAME");
  el.addPassthroughCopy("_redirects");

  el.setDataDeepMerge(true);

  el.on('afterBuild', async () => {
    await buildOntology();
  });

  return {
    templateFormats: [
      "ico",
      "njk",
      "jpg",
      "md",
      "html",
      "liquid",
      "svg",
      "png",
      "pdf",
      'gif',
      "mp4",
      "webm"
    ],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      layouts: "_layouts",
    },
  };
};
