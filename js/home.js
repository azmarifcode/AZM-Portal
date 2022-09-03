const loadCategory = async () => {
	const res = await fetch(
		'https://openapi.programming-hero.com/api/news/categories',
	);
	const data = await res.json();
	return data.data.news_category;
};

const loadAllCategory = async () => {
    const dataAll = await loadCategory();
    const categoryField = document.getElementById('category-menu');
	dataAll.forEach((categoryName) => {
        const newCategory = document.createElement('li');
        newCategory.classList.add('category-responsive');
		newCategory.innerHTML = `
        <a href="#" id= "handler" onclick= "loadAllNews(${categoryName.category_id})" class="block category-responsive py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">${categoryName.category_name}</a>
        `;
		categoryField.appendChild(newCategory);
	});
};

loadAllCategory();

const loadAllNews = (id) =>
{
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    .then((res) => res.json())
    .then((data) => showAllNews(data.data));
};

const showAllNews = (allNews) => {
    const newsContainer = document.getElementById('newsContainer');
    spinner.classList.add('hidden');
    
	allNews.forEach((news) => {
        spinner.classList.remove('hidden');
		const { image_url, title, details, author, total_view } = news;
		const { name, published_date, img } = author;
		const newsDiv = document.createElement('div');
		newsDiv.classList.add(
			'card',
			'lg:card-side',
			'bg-base-100',
			'shadow-xl',
			'mb-5',
		);
		newsDiv.innerHTML = `
        <figure><img width="600px" src="${image_url}" alt="Album"></figure>
            <div class="card-body">
                    <h2 class="card-title">${title}</h2>
                    <p>${details.length > 350 ? details.slice(0, 350) + '...' : details}</p>
            <div class="grid grid-cols-4 gap-4">
            <div class="flex">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="${img}" />
                    </div>
                </label>
                    <div>
                        <p class="pl-2 block"arif</p>
                        <p class="pl-2 block">${published_date}</p>
                    </div>
            </div>
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="pl-2 font-bold text-xl">${total_view}</p>
            </div>
            <div class="rating items-center">
                <input type="radio" name="rating-1" class="mask mask-star" />
                <input type="radio" name="rating-1" class="mask mask-star" checked />
                <input type="radio" name="rating-1" class="mask mask-star" />
                <input type="radio" name="rating-1" class="mask mask-star" />
                <input type="radio" name="rating-1" class="mask mask-star" />
            </div>
            <div>
                <label for="my-modal-3" onclick= "showModal('${img}', '${name}')" class="btn btn-primary modal-button">Show Details</label>
            </div>
            </div>
        </div>
        `;
		newsContainer.appendChild(newsDiv);
	});
};

const showModal = (img, name) => {
	const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${img}" alt="" />
    <h1 class = "text-xl mt-5">Name: ${name}</h1>
    `;
};

loadAllNews();