baseUrl = "https://jsonplaceholder.typicode.com"

all = []

allPosts()

async function allPosts() {
    let posts = await postWithAuth()
    AppendPosts(posts)
    all = (posts)
} 


async function postWithAuth() {
    try {
        let postsResponse = await fetch(`${baseUrl}/posts`);
        let posts = await postsResponse.json();
        let postWithAuth = await Promise.all(posts.map(async (post) => {
             let userResponse = await fetch(`${baseUrl}/users/${post.userId}`);
             let user = await userResponse.json();
           return {...post, auth: user.username}
            })
        );
        return postWithAuth
    } catch {
        console.log(Error);
    }
}



async function AppendPosts(posts)
{
    posts.map((post) => {
        document.getElementById('crd-container').innerHTML += `
            <li class="card">
            <img src="https://picsum.photos/300/200?${post.id}" alt="">
            <div class="crd-content">
                <h2 class="crd-title">${post.title}</h2>
                <h3 class="crd-author">${post.auth}</h3>
                <p>${post.body}</p>
                <button class="crd-btn-cmt">Commantaires</button>
            </div>
            </li>
            `
    });           
}
function clearli() {
    const clear = document.querySelectorAll('li.card');
clear.forEach(li => {
    li.remove()
});
}


function authSorting() {
    c('auth')
    clearli()
    SortPostsByTitle(all)
      }
      
function titleSorting() {
    clearli()
    SortPostsByAuth(all)
}


function SortPostsByAuth(posts) {
    posts.sort((p1, p2) =>  (p1.auth > p2.auth) ? 1 : -1)
    AppendPosts(posts)
}

function SortPostsByTitle(posts) {
    posts.sort((p1, p2) =>  (p1.title > p2.title) ? 1 : -1) 
    AppendPosts(posts)
}

function c (msg) {
    return (console.log(msg))
}



