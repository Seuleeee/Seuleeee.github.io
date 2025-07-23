// main.js (예시)

const postsData = {
  python: [
    { slug: 'test', title: '파이썬 테스트 게시글' },
  ]
};

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get('category') || 'python',
    slug: params.get('slug') || postsData['python'][0].slug,
    lang: params.get('lang') || 'en',
  };
}

function renderSidebar(currentCategory, currentSlug, currentLang) {
  const sidebar = document.querySelector('.sidebar');
  sidebar.innerHTML = '';

  for (const [category, posts] of Object.entries(postsData)) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    if (category === currentCategory) categoryDiv.classList.add('active');

    const span = document.createElement('span');
    span.innerHTML = `<i class="folder-icon fa fa-folder"></i> ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    categoryDiv.appendChild(span);

    const toggleIcon = document.createElement('i');
    toggleIcon.className = 'toggle-icon fa fa-chevron-right';
    categoryDiv.appendChild(toggleIcon);

    sidebar.appendChild(categoryDiv);

    const ul = document.createElement('ul');
    ul.className = 'post-list';
    if (category === currentCategory) ul.classList.add('open');

    posts.forEach(post => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `?category=${category}&slug=${post.slug}&lang=${currentLang}`;
      a.textContent = post.title;
      if (category === currentCategory && post.slug === currentSlug) {
        a.classList.add('selected');
      }
      li.appendChild(a);
      ul.appendChild(li);
    });

    sidebar.appendChild(ul);

    // 접었다 폈다 이벤트
    categoryDiv.addEventListener('click', () => {
      ul.classList.toggle('open');
      toggleIcon.classList.toggle('fa-chevron-down');
      toggleIcon.classList.toggle('fa-chevron-right');
    });
  }
}

async function loadPost(category, slug, lang) {
  const path = `posts/${category}/${slug}/${lang}.md`;
  const postContainer = document.getElementById('post');

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Not found');
    const md = await res.text();
    const html = marked.parse(md);
    postContainer.innerHTML = html;
  } catch {
    postContainer.innerHTML = '<p>해당 게시글을 찾을 수 없습니다.</p>';
  }
}

function updatePostList(category, lang) {
  const postListSection = document.getElementById('post-list');
  postListSection.innerHTML = '';
  postsData[category].forEach(post => {
    const li = document.createElement('li');
    li.textContent = post.title;
    postListSection.appendChild(li);
  });
}

function init() {
  const { category, slug, lang } = getParams();
  renderSidebar(category, slug, lang);
  updatePostList(category, lang);
  loadPost(category, slug, lang);
}

window.addEventListener('popstate', init);
window.addEventListener('DOMContentLoaded', init);
