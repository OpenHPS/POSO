const buildOntology = require("./_scripts/ontology");
/* Markdown plugins */
const markdownIt = require("markdown-it");

/* Other plugins */
const pluginTOC = require('eleventy-plugin-toc');
const pluginSASS = require("eleventy-sass");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginHTMLValidate = require('eleventy-plugin-html-validate');

const nunjucks = require("nunjucks");
const markdown = require('nunjucks-markdown');
require('dotenv').config();
const _ = require("lodash");

module.exports = function (el) {
  /* Passthrough Copy */
  el.setDataDeepMerge(true);
  el.addPassthroughCopy("CNAME");
  
  /* SEO */
  // el.addPlugin(pluginHTMLValidate);

  /* Navigation */
  el.addPlugin(pluginNavigation);

  /* Markdown */
  const md = markdownIt({ html: true });
  el.setLibrary("md", md);
  el.addPlugin(pluginTOC, {
    tags: ['h2'],
    ul: true
  });

  /* Stylesheets */
  el.addPlugin(pluginSASS, [
    {
      compileOptions: {
        permalink: function (permalinkString, inputPath) {
          return (data) => {
            return data.page.filePathStem.replace(/^\/_scss\//, "/css/") + ".css";
          };
        }
      },
      sass: {
        style: "expanded",
        sourceMap: true
      }
    }, {
      rev: true,
      when: { ELEVENTY_ENV: "stage" }
    }, {
      sass: {
        style: "compressed",
        sourceMap: false
      },
      rev: true,
      when: [{ ELEVENTY_ENV: "production" }, { ELEVENTY_ENV: false }]
    }
  ]);

  /* Nunjucks */
  let njkEnv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader("_includes")
  );
  markdown.register(njkEnv, (src, _) => {
    return md.render(src);
  });
  el.setLibrary("njk", njkEnv);

  el.on('beforeBuild', async () => {
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
      "mp4"
    ],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      layouts: "_layouts",
    },
  };
};
