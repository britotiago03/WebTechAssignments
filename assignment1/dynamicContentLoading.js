document.addEventListener("DOMContentLoaded", function() {
  let page = 1;
  const dynamicContentLoading =
      document.getElementById("posts-box");

  function loadPosts() {
    const xhr = new XMLHttpRequest();

    initAjax(xhr)

    xhr.onload = function() {
      const posts = JSON.parse(xhr.responseText);

      const rowDiv = document.createElement("div");
      rowDiv.classList.add("info-row");

      addPosts(posts, rowDiv)

      dynamicContentLoading.appendChild(rowDiv);
      page++;
    };
    xhr.send();
  }

  function initAjax(xhr) {
    xhr.open('GET',
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=3`,
        true);
  }

  function addPosts(posts, rowDiv) {
    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("info-item");

      postDiv.innerHTML = `
                        <div class="info-placeholder"></div>
                        <p><strong>Post ${post.id}</strong><br>${post.body}</p>
                    `;

      rowDiv.appendChild(postDiv);
    });
  }

  window.addEventListener("scroll", function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadPosts();
    }
  });

  loadPosts();
});
