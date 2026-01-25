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

  // =============================================
  // 🧠 O CÉREBRO: COLEÇÕES POR PASTA (FIXO)
  // Isso garante que tudo que você criar no CMS apareça no lugar certo
  // =============================================

  // 1. Coleção de ARTIGOS (Pega tudo da pasta src/artigos)
  eleventyConfig.addCollection("artigos", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/artigos/*.md");
  });

  // 2. Coleção de AULAS (Pega tudo da pasta src/aulas)
  eleventyConfig.addCollection("aulas", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/aulas/*.md");
  });

  // 3. Coleção de SÉRIES (Pega tudo da pasta src/series)
  eleventyConfig.addCollection("series", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/series/*.md");
  });

  // 4. Coleção de VÍDEOS (Pega tudo da pasta src/videos)
  eleventyConfig.addCollection("videos", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/videos/*.md");
  });

  // 5. Coleção de LIVROS (Pega tudo da pasta src/livros)
  eleventyConfig.addCollection("livros", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/livros/*.md");
  });

  // =============================================
  // LÓGICA DE TAGS (Categorias do Sidebar)
  // =============================================
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    
    // Filtra tags de sistema para não aparecerem na sidebar
    const tagsIgnoradas = ["Artigo", "Aula", "Vídeo", "Livro", "artigos", "aulas", "series", "videos", "livros"];
    const tags = [...tagSet].filter(tag => !tagsIgnoradas.includes(tag));
    
    // Lógica Top 10
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