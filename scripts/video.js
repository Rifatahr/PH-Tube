function getTimeString(time) {

    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time % 3600) / 60);
    const second = Math.floor(time % 60);
    return `${hour}hrs ${minute}min ${second} second ago`
}


const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
    for (let btn of buttons) {
        btn.classList.remove("active")
    }
}

//  1- fetch, load, show categories

// create loadCategories
const loadCategories = () => {

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};



const loadVideos = (searchText = "" ) => {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error));
};


const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // sobar active class remove korsi

            removeActiveClass();


            // ID er class k active korsi  

            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("active")
            displayVideos(data.category)
        })
        .catch((error) => console.log(error));

};

const loadDetails = async (videoId) => {
    console.log(videoId);
    const dif = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(dif);
    const data = await res.json();
    displayDetails(data.video);
}

const displayDetails = (video) => {
console.log(video);
const detailContainer = document.getElementById("modal-contain");

document.getElementById("customModal").showModal();

detailContainer.innerHTML = `
<img src = ${video.thumbnail} />
<p> ${video.description} </p>

`;

};





const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos")
    videoContainer.innerHTML = ""


    if (videos.length == 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = ` 
        <div class ="min-h-[600px] flex flex-col gap-5 justify-center items-center">
            <img src="assetes/Icon.png" alt=""/>
            <h2 class = "text-xl text-center font-bold"> Oops!! Sorry, There is no <br> 
            content here </h2>

        </div>
        `;
        return;
    }
    else {
        videoContainer.classList.add("grid")
    }



    videos.forEach((video) => {
        // console.log(video)
        const card = document.createElement("div");
        card.classList = "card "
        card.innerHTML = `
        <figure class ="h-[200px] relative"> 
    <img class ="h-full w-full object-cover"
      src= ${video.thumbnail}
      alt="Image not Showing" />
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-4 bottom-2 bg-black text-white text-sm rounded p-1"> ${getTimeString(video.others.posted_date)}
</span>`

            }
  </figure>
  <div class="px-0 py-2">
    <div class = "flex gap-5">
            <div>
            <img class="w-10 h-10  rounded-full object-cover" src=" ${video.authors[0].profile_picture}" alt="">
               
            </div>
            <div>
                <h2 class= "font-bold"> ${video.title} </h2>
                <div class="flex items-center gap-2 "> 
                <p class="text-gray-400">${video.authors[0].profile_name}</p>

                ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
            
            </div>
            
            <p>
            <button onclick="loadDetails('${video.video_id}')" class="btn btn-error ">Details</button>
            </p>  
                
            </div>
        

        </div>
    </div>
  </div>
  `;
        videoContainer.append(card);
    });
};





const displayCategories = (categories) => {

    const categoryContainer = document.getElementById("categories")
    categories.forEach((item) => {
        console.log(item);

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML =
            `
        <button id = "btn-${item.category_id}" onclick ="loadCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
        
        `

        categoryContainer.append(buttonContainer);

    })

};

document.getElementById("search-input").addEventListener("keyup", (event) => {  

    loadVideos(event.target.value)
});

loadCategories();
loadVideos();
