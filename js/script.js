const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();

    const tabContainer = document.getElementById('tab-container');
    let count = 0;
    data.data.slice(0, 4).forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoad('${category.category_id}')" class="tab">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });

    // console.log(data.data.category);
}

const handleLoad = async (categoryId) => {
    // console.log(categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const mainData = data.data;
    if(mainData.length > 0){
        data.data?.forEach((cardData) => {
            console.log(cardData);
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact bg-base-100 h-[308px]">
                <figure"><img class="w-full h-[200px]" src="${cardData.thumbnail}" /></figure>
                <div class="flex gap-3 mt-4">
                    <div>
                        <img src="${cardData?.authors[0]?.profile_picture}" class="rounded-full w-10 h-10" alt="img">
                    </div>
                    <div>
                        <h2 class="card-title">${cardData.title}</h2>
                        <div class="flex items-center gap-2">
                                <p>${cardData?.authors[0]?.profile_name}</p>
                                <p>
                                ${cardData?.authors[0]?.verified ? '<img src="./image/fi_10629607.svg" alt="">' : ""}
                                </p>
                            </div>
                        <p>${cardData?.others?.views}</p>
                    </div>
                </div>
            </div>
                `;
    
            cardContainer.appendChild(div);
        })
    }
    else{
        const div = document.createElement('div');
            div.innerHTML = `
           <div class="container w-screen">
                <div class="flex flex-col gap-8 justify-center items-center text-center">
                    <img src="./Icon.png" />
                    <p class="text-2xl font-bold text-black">Oops!! Sorry, There is no<br> content here</p>
                </div>
           </div> 
                `;
    
            cardContainer.appendChild(div);
    }

    console.log(data.data);
}


handleCategory();
handleLoad('1005');
