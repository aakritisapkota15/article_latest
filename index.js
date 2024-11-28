const express = require("express");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const contentService = require("./content-service");

const app = express();
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: "dxtl3es7g",
  api_key: "597463314459762",
  api_secret: "DWfO2N6Ngo15O-hKsRk44o8IxQE",
  secure: true,
});

const upload = multer();

// form submition
app.use(express.urlencoded({ extended: true }));

// Serve css and js
app.use(express.static("public"));

// about.html
app.get("/", (req, res) => {
  //res.send("Hello World");
  res.render("about");

  //res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/articles/add", (req, res) => {
  res.render("addArticle");

  //res.sendFile(path.join(__dirname, "views", "addArticle.html"));
});

app.get("/articlespage", (req, res) => {
  res.render("articles");

  //res.sendFile(path.join(__dirname, "views", "articles.html"));
});

app.post("/articles/add", upload.single("featureImage"), (req, res) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      return result;
    }

    upload(req)
      .then((uploaded) => {
        processArticle(uploaded.url);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        res.status(500).json({ message: "Image upload failed", error: err });
      });
  } else {
    processArticle("");
  }

  function processArticle(imageUrl) {
    req.body.featureImage = imageUrl;

    // Save the article
    contentService
      .addArticle(req.body)
      .then(() => res.redirect("/articles"))
      .catch((err) => {
        console.error("Article creation failed:", err);
        res
          .status(500)
          .json({ message: "Article creation failed", error: err });
      });
  }
});

app.get("/articles", (req, res) => {
  if (req.query.category) {
    contentService
      .getArticlesByCategory(req.query.category)
      .then((articles) => res.render("articles", { articles }))
      .catch((err) => res.status(404).json({ message: err }));
  } else if (req.query.minDate) {
    contentService
      .getArticlesByMinDate(req.query.minDate)
      .then((articles) => {
        res.render("articles", { articles });

        //res.json(articles);
      })
      .catch((err) => res.status(404).json({ message: err }));
  } else {
    contentService
      .getAllArticles()
      .then((articles) => res.render("articles", { articles }))
      .catch((err) => res.status(404).json({ message: err }));
  }
});

app.get("/article/:id", (req, res) => {
  console.log(req.params.id);
  console.log("reached article id");
  contentService
    .getArticleById(req.params.id)
    .then((article) => {
      //res.json(article);
      res.render("article", { article });
    })
    .catch((err) => res.status(404).json({ message: err }));
});

// addded new route for categories
app.get("/categories", (req, res) => {
  contentService.getAllCategories().then((categories) => {
    //res.json(categories);
    res.render("categories", { categories });
  });
});

app.use("*", (req, res, next) => {
  res.send("404 Page not found. Thanks for visiting");
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
