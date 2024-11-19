document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = window.location.origin; // Change this to your server's base URL

    // DOM Elements
    const articlesList = document.getElementById("articlesList");
    const articleDetails = document.getElementById("articleDetails");
    const categoryFilter = document.getElementById("category");
    const minDateFilter = document.getElementById("minDate");
    const articleIdFilter = document.getElementById("articleId");
    const filterByCategoryButton = document.getElementById("filterByCategory");
    const filterByDateButton = document.getElementById("filterByDate");
    const getArticleByIdButton = document.getElementById("getArticleById");

    // Fetch All Articles
    function fetchAllArticles() {
        fetch(`${baseUrl}/articles`)
            .then((response) => response.json())
            .then((articles) => {
                displayArticles(articles); // Display articles
                populateCategoryFilter(articles); // Populate categories
            })
            .catch((error) => {
                console.error("Error fetching articles:", error);
                articlesList.innerHTML = `<li>Error fetching articles.</li>`;
            });
    }

    // Populate Category Filter Dropdown
    function populateCategoryFilter(articles) {
        const categories = [...new Set(articles.map((article) => article.category))]; // Extract unique categories
        categoryFilter.innerHTML = '<option value="">Select a category</option>'; // Default option
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Display Articles
    function displayArticles(articles) {
        articlesList.innerHTML = ""; // Clear previous articles
        if (articles.length === 0) {
            articlesList.innerHTML = "<p>No articles found.</p>";
            return;
        }

        articles.forEach((article) => {
            const li = document.createElement("li");
            li.style.border = "1px solid #ccc";
            li.style.borderRadius = "5px";
            li.style.padding = "10px";
            li.style.marginBottom = "10px";
            li.style.backgroundColor = "#f9f9f9";

            li.innerHTML = `
                <h2> Id: ${article.id}</h2>
                <h3> Title: ${article.title}</h3>
                <p><strong>Category:</strong> ${article.category}</p>
                <p><strong>Date:</strong> ${new Date(article.articleDate).toDateString()}</p>
                <img src="${article.featureImage}" alt="${article.title}" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 5px;">
            `;
            articlesList.appendChild(li);
        });
    }

    // Display Single Article Details
    function displayArticleDetails(article) {
        articleDetails.innerHTML = "";
        articleDetails.innerHTML = `
            
            <h2>Id: ${article.id}</h2>
            <h3>Title: ${article.title}</h3>
            <p><strong>Category:</strong> ${article.category}</p>
            <p><strong>Date:</strong> ${new Date(article.articleDate).toDateString()}</p>
            <p><strong>Feature Image:</strong> <img src="${article.featureImage}" alt="${article.title}" style="max-width: 100%; height: auto;"></p>
        `;
    }

    // Filter Articles by Category
    function filterByCategory() {
        const category = categoryFilter.value; // Get selected category
        if (!category) {
            alert("Please select a category.");
            return;
        }

        fetch(`${baseUrl}/articles?category=${category}`)
            .then((response) => response.json())
            .then((articles) => {
                displayArticles(articles);
            })
            .catch((error) => {
                console.error("Error filtering by category:", error);
                articlesList.innerHTML = `<li>No articles found for category "${category}".</li>`;
            });
    }

    // Filter Articles by Minimum Date
    function filterByDate() {
        const minDate = minDateFilter.value; // Get selected date
        if (!minDate) {
            alert("Please select a date.");
            return;
        }

        fetch(`${baseUrl}/articles?minDate=${minDate}`)
            .then((response) => response.json())
            .then((articles) => {
                displayArticles(articles);
            })
            .catch((error) => {
                console.error("Error filtering by date:", error);
                articlesList.innerHTML = `<li>No articles found after "${minDate}".</li>`;
            });
    }

    // Fetch Article by ID
    function getArticleById() {
        const articleId = articleIdFilter.value; // Get article ID
        if (!articleId) {
            alert("Please enter an article ID.");
            return;
        }

        fetch(`${baseUrl}/article/${articleId}`)
            .then((response) => {
                if (!response.ok) {
                    alert(`Article not found. Status: ${response.status}`)
                    throw new Error(`Article not found. Status: ${response.status}`);
                }
                return response.json();
            })
            .then((article) => {
                displayArticles(article);
            })
            .catch((error) => {
                console.error("Error fetching article by ID:", error);
                articleDetails.innerHTML = `<p>Article with ID "${articleId}" not found.</p>`;
            });
    }

    // Event Listeners
    filterByCategoryButton.addEventListener("click", filterByCategory);
    filterByDateButton.addEventListener("click", filterByDate);
    getArticleByIdButton.addEventListener("click", getArticleById);

    // Load All Articles on Page Load
    fetchAllArticles();
});
