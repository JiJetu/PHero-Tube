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
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
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
                    <p>${cardData?.authors[0]?.profile_name}</p>
                    <p>${cardData?.others?.views}</p>
                </div>
            </div>
        </div>
            `;

        cardContainer.appendChild(div);
    })

    console.log(data.data);
}


handleCategory();
handleLoad('1000')