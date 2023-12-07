baseUrl = "https://jsonplaceholder.typicode.com"
// async function LoadPosts() {
//     let url = (baseUrl.concat("posts"))
//     const response = await fetch(url);
//     const posts = await response.json();
//     AppendPosts(posts)
// }

// LoadPosts()

AppendPosts()

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



async function AppendPosts()
{
    let posts = await postWithAuth();
    c(posts)
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



function SortPostsByAuth(posts) {
    posts.sort((p1, p2) =>  (p1.auth > p2.auth) ? 1 : -1) 
}

function SortPostsByTitle(posts) {
    posts.sort((p1, p2) =>  (p1.auth > p2.auth) ? 1 : -1) 
}

function c (msg) {
    return (console.log(msg))
}



