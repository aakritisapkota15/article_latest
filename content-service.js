let articles = [  {
    "title": "asdad",
    "category": "AI",
    "articleDate": "2024-11-17",
    "featureImage": "http://res.cloudinary.com/dxtl3es7g/image/upload/v1731986632/ucbvl06ir5mhpispwgsw.jpg",
    "published": false,
    "id": 1
  },
  {
    "title": "Medical Supplies",
    "category": "Medical",
    "articleDate": "2024-11-18",
    "featureImage": "http://res.cloudinary.com/dxtl3es7g/image/upload/v1731991226/ki5pvqpoyt7oyauzv3ye.webp",
    "published": false,
    "id": 2
  }];

module.exports.addArticle = (articleData) => {
    return new Promise((resolve, reject) => {
        articleData.published = articleData.published ? true : false;
        articleData.id = articles.length + 1;
        articles.push(articleData);
        resolve(articleData);
    });
};

module.exports.getArticlesByCategory = (category) => {
    return new Promise((resolve, reject) => {
        const filteredArticles = articles.filter(article => article.category === category);
        filteredArticles.length > 0 ? resolve(filteredArticles) : reject("No results returned");
    });
};

module.exports.getArticlesByMinDate = (minDateStr) => {
    return new Promise((resolve, reject) => {
        const minDate = new Date(minDateStr);
        const filteredArticles = articles.filter(article => new Date(article.articleDate) >= minDate);
        filteredArticles.length > 0 ? resolve(filteredArticles) : reject("No results returned");
    });
};

module.exports.getArticleById = (id) => {
    return new Promise((resolve, reject) => {
        console.log(articles);
        const foundArticle = articles.find(article => article.id === parseInt(id));
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
