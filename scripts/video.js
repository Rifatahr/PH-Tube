console.log("hook up")

//  1- fetch, load, show categories

// create loadCategories
const loadCategories = () => {

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};

const loadVideos = () => {

    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => console.log(data.videos))
        .catch((error) => console.log(error));
};







const displayCategories = (categories) => {

    const categoryContainer = document.getElementById("categories")
    categories.forEach((item) => {
        console.log(item);

        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category

        categoryContainer.append(button);

    })
  
};



loadCategories();
loadVideos()