const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json();
    const posts = data.posts
    displayPosts(posts)
}



const displayPosts = posts => {


    posts.forEach(post => {
        console.log(post)
        const allPostContainer = document.getElementById('allPost-container')

        


        const postCard = document.createElement("div")
        postCard.classList = `flex gap-4 bg-[#F3F3F5] p-4 rounded-lg mb-6 `
        postCard.innerHTML = `
            <div class=" relative">
                <div class=" w-14 h-14 "><img class="rounded-lg" src="${post.image}" alt=""></div>
                <div id="active-color" class="w-4 h-4 rounded-full bg-[#10B981] absolute  top-0  bottom-0 right-0"></div>

            </div>
            <div class="space-y-4">
                <ul class="space-y-4">
                    <li class="flex gap-4 font-medium">
                        <p>#<span>${post.category}</span></p>
                        <p>Author: <span>${post.author.name}</span></p>
                    </li>
                    <li class="font-bold text-black text-2xl">
                        <h2>${post.title}</h2>
                    </li>
                    <li>
                        <p>${post.description}</p>
                    </li>
                </ul>
                <hr class="border-dashed pb-5">
                <div class="flex justify-between">
                    <div class=" flex gap-2 lg:gap-4">
                        <div class="flex gap-1 lg:gap-2">
                            <div><img class="w-5" src="images/message.png" alt=""></div>
                            <p>${post.comment_count}</p>
                        </div>
                        <ul class="flex gap-1 lg:gap-2">
                            <li><img class="w-5" src="images/seen.png" alt=""></li>
                            <li>${post.view_count}</li>
                        </ul>
                        <ul class="flex gap-1 lg:gap-2">
                            <li><img class="w-5" src="images/time.png" alt=""></li>
                            <li>${post.posted_time}min</li>
                        </ul>

                    </div>
                    <div class="">
                        <button onclick="addReadPosts('${post.title}')" class="btn btn-circle bg-[#10B981] ">
                            <img class="w-5" src="images/envolop.png" alt="">
                        </button>
                    </div>
                </div>
            </div>
        `;
        allPostContainer.appendChild(postCard)

    })

    for(let post of posts){
        if(post.isActive === true){
            document.getElementById('active-color').classList.add('bg-[#10B981]')
        }
        else{
            document.getElementById('active-color').classList.remove('bg-[#10B981]')
            document.getElementById('active-color').classList.add('bg-red-600')
    
        }
    }
        
    


    toggleLoadingSpinner(false)

    

}

let count = 0 ;
const addReadPosts = async (title) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    const data = await res.json()
    const allRead = data.posts.find(post => post.title === title)

    
        const readPostContainer = document.getElementById('readPost-container')
        const readPost = document.createElement('div')
        readPost.classList = `flex items-center gap-4  bg-white p-4 rounded-lg`
        readPost.innerHTML = `
        <h3 class="font-semibold text-black">${allRead.title}</h3>
        <div class="flex gap-2">
            <div class="w-5"><img src="images/seen.png" alt=""></div>
            <p>${allRead.view_count}</p>
        </div>
        `
        readPostContainer.appendChild(readPost)


    
       let readCountText = document.getElementById('read-count')
       let count = parseInt(readCountText.innerText)
       count++
       readCountText.innerText = count 

    
}






// handle search button
const handleSearch = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    console.log(searchText)

}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {

        setTimeout(() => {
            toggleLoadingSpinner(false);
        }, 2000)
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}



loadAllPosts();
toggleLoadingSpinner(true)
