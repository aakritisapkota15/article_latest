let articles = [
  {
    title: "How AI is changing the world",
    category: "AI",
    articleDate: "2024-11-17",
    description: "Dummy description for AI article",
    featureImage:
      "http://res.cloudinary.com/dxtl3es7g/image/upload/v1731986632/ucbvl06ir5mhpispwgsw.jpg",
    authorName: "John Doe",
    published: true,
    id: 1,
  },
  {
    title: "Medical breakthroughs in 2024",
    category: "Medical",
    articleDate: "2024-11-18",
    description: "Dummy description for Medical article",
    featureImage:
      "http://res.cloudinary.com/dxtl3es7g/image/upload/v1731991226/ki5pvqpoyt7oyauzv3ye.webp",
    authorName: "Simth paul",
    published: true,
    id: 2,
  },
];

module.exports.addArticle = (articleData) => {
  return new Promise((resolve, reject) => {
    articleData.published = articleData.published ? true : false;
    articleData.id = articles.length + 1;
    articles.push(articleData);
    resolve(articleData);
  });
};

module.exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    const categories = articles.map((article) => article.category);
    if (categories.length > 0) {
      resolve([...new Set(categories)]);
    }
    reject("No categories found");
  });
};

module.exports.getArticlesByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const filteredArticles = articles.filter(
      (article) => article.category === category
    );
    filteredArticles.length > 0
      ? resolve(filteredArticles)
      : reject("No results returned");
  });
};

module.exports.getArticlesByMinDate = (minDateStr) => {
  return new Promise((resolve, reject) => {
    const minDate = new Date(minDateStr);
    const filteredArticles = articles.filter(
      (article) => new Date(article.articleDate) >= minDate
    );
    filteredArticles.length > 0
      ? resolve(filteredArticles)
      : reject("No results returned");
  });
};

module.exports.getArticleById = (id) => {
  return new Promise((resolve, reject) => {
    console.log(articles);
    const foundArticle = articles.find(
      (article) => article.id === parseInt(id)
    );
    console.log(foundArticle);
    const arry = [];
    arry.push(foundArticle);
    foundArticle ? resolve(arry) : reject("No result returned");
  });
};

module.exports.getAllArticles = () => {
  return new Promise((resolve, reject) => {
    articles.length > 0 ? resolve(articles) : reject("No articles available");
  });
};
