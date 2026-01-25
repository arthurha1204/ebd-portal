module.exports = function(eleventyConfig) {
  
  // Copia as pastas importantes para o site final
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  // CRIA A LÓGICA DAS TAGS (Para seu menu automático)
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      if( "tags" in item.data ) {
        let tags = item.data.tags;
        if( typeof tags === "string" ) tags = [tags];
        for (const tag of tags) tagSet.add(tag);
      }
    });
    // Retorna as tags em ordem alfabética
    return [...tagSet].sort();
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };

};