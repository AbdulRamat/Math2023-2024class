const authorInput = document.getElementById('post-author');
const categorySelect = document.getElementById('post-category');
const editorElement = document.getElementById('editor');
const fileInput = document.getElementById('post-file');
const dateInput = document.getElementById('post-date');
const createPostBtn = document.getElementById('create-post-btn');
const postsContainer = document.getElementById('posts-container');
const filterCategory = document.getElementById('filter-category');
const searchInput = document.getElementById('search-input');


const quill = new Quill(editorElement, {
  theme: 'snow'
});
let posts = JSON.parse(localStorage.getItem('posts') || '[]');

function savePosts(){
  localStorage.setItem('posts', JSON.stringify(posts));
}
function createPostElement(post){
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    postElement.innerHTML = 
    <h3>
       <span>Author:</span> ${post.author}
       <span>Category:</span> ${post.category}
        <span>Date:</span> ${post.date}
    </h3>
  <div class="post-content">${post.content}</div>
   <div class ="post-footer">
   <span>${post.file ? File: ${post.file}: ''}</span>
   <button onclick = "likePost(${post.id})">Like (${post.likes || 0})</button>
    <button onclick = "addComment(${post.id})">Comment</button>
   </div>
    ;
    return postElement;
}

function displayPosts(){
    postsContainer.innerHTML = '';

    let filteredPosts = posts;
    const selectedCategory = filterCategory.value;
    const searchTerm = searchInput.value.toLowerCase();

    if (selectedCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }

  if (searchTerm) {
        filteredPosts = filteredPosts.filter(post =>
            post.author.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm)
        );
  }

   filteredPosts.sort((a,b)=> new Date(b.date) - new Date(a.date));

    filteredPosts.forEach(post=>{
      const postElement = createPostElement(post);
     postsContainer.appendChild(postElement);
    });
}
createPostBtn.addEventListener('click', () =>{
  const author = authorInput.value;
    const category = categorySelect.value;
    const content = quill.root.innerHTML;
    const file = fileInput.files.length > 0 ? fileInput.files[0].name : '';
    const date = dateInput.value || new Date().toISOString();
     if (author && content){
         const newPost = {
           id: Date.now(),
             author: author,
            category: category,
           content: content,
          file: file,
           date: date,
            likes: 0,
          comments: []
         };
      posts.push(newPost);
       savePosts();
      displayPosts();
      authorInput.value = '';
       categorySelect.value = 'announcement';
       quill.root.innerHTML = '';
       fileInput.value = '';
        dateInput.value = '';
     }else{
       alert('Please enter both your name and the content for the post')
     }
});
searchInput.addEventListener('input', displayPosts);
filterCategory.addEventListener('change', displayPosts);

function likePost(postId) {
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex > -1) {
        posts[postIndex].likes = (posts[postIndex].likes || 0) + 1;
        savePosts();
        displayPosts();
    }
}
function addComment(postId){
  const comment = prompt('Add Comment:');
  const postIndex = posts.findIndex(post => post.id === postId);
 if (postIndex > -1){
   posts[postIndex].comments = posts[postIndex].comments || [];
   posts[postIndex].comments.push(comment);
  savePosts();
    displayPosts();
  }
}
displayPosts();

