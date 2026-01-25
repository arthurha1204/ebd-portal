const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Passa os assets estáticos direto para a build
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/*.png");
  eleventyConfig.addPassthroughCopy("src/*.jpg");
  eleventyConfig.addPassthroughCopy("src/*.mp4");

  // Filtro de Data
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setLocale('pt-br').toLocaleString(DateTime.DATE_FULL);
  });

  // COLEÇÃO ESPECIAL: TOP TAGS
  // Lógica para pegar todas as tags, contar e retornar as top 10 ou todas se < 20
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    
    // Converte para array e limita
    const tags = [...tagSet].filter(tag => tag !== "artigos" && tag !== "aulas" && tag !== "livros");
    
    // Se tiver mais de 20, corta para 10. Se não, manda tudo.
    if (tags.length > 20) {
        return tags.slice(0, 10);
    }
    return tags;
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};