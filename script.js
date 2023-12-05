url = "https://jsonplaceholder.typicode.com/posts"
async function LoadPosts(url) {
    const response = await fetch(url);
    const posts = await response.json();
    AppendPosts(posts)
}

LoadPosts(url)

function AppendPosts(posts)
{
    posts.forEach(post => {
        console.log(post)
        let item = document.createElement('li')
        document.getElementById('crd-container').innerHTML += `
        <li class="card">
            <img src="https://picsum.photos/300/200?${post.id}" alt="">
            <div class="crd-content">
                <h2 class="crd-title">${post.title}</h2>
                <h3 class="crd-author">Auteur</h3>
                <p>${post.body}</p>
                <button class="crd-btn-cmt">Commantaires</button>
            </div>
        </li>
        
        `;
    });

        
        
                
}

