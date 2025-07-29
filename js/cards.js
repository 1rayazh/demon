const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const cardsContainer = document.getElementById('cards-container');
const defaultImage = 'https://via.placeholder.com/400x150.png?text=Изображение';

async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    const posts = await response.json();
    renderCards(posts.slice(0, 20)); 
  } catch (error) {
    console.log(e)
  }
}

function renderCards(posts) {
  cardsContainer.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="https://avatars.mds.yandex.net/i?id=a3a8b3dd62c726caf360a74b28204f5e2de30ba3-16498523-images-thumbs&n=13" >
      <div class="card-content">
        <h3 class="card-title">${post.title}</h3> 
        <p class="card-desc">${post.body}</p>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

fetchPosts();
