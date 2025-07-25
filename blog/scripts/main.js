// main.js
const postsData = {
    python: [
        { slug: 'test', title: '파이썬 테스트 게시글', titleEn: 'Python Test Post' },
    ]
};

// 번역 텍스트
const translations = {
    ko: {
        sidebarTitle: '게시글 목록',
        placeholderText: '게시글을 선택하세요.',
        notFoundText: '해당 게시글을 찾을 수 없습니다.',
        categories: {
            python: 'Python',
        }
    },
    en: {
        sidebarTitle: 'Posts',
        placeholderText: 'Select a post to read.',
        notFoundText: 'Post not found.',
        categories: {
            python: 'Python',
        }
    }
};

let currentLang = 'en';
let userCountry = 'US';

// 사용자 국가 확인 (IP 기반)
async function detectUserCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        userCountry = data.country_code || 'US';
        console.log('Detected country:', userCountry);
        return userCountry === 'KR' ? 'ko' : 'en';
    } catch (error) {
        console.warn('Failed to detect user country, using default:', error);
        return 'en'; // 기본값
    }
}

// URL 파라미터 가져오기
function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('category') || Object.keys(postsData)[0],
        slug: params.get('slug') || postsData[Object.keys(postsData)[0]][0].slug,
        lang: params.get('lang') || currentLang,
    };
}

// URL 업데이트
function updateURL(category, slug, lang) {
    const newURL = `${window.location.pathname}?category=${category}&slug=${slug}&lang=${lang}`;
    window.history.pushState({ category, slug, lang }, '', newURL);
}

// 언어 설정
function setLanguage(lang) {
    console.log('Setting language to:', lang);
    currentLang = lang;
    
    // 언어 버튼 활성화 상태 변경
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const langBtn = document.getElementById(`lang-${lang}`);
    if (langBtn) {
        langBtn.classList.add('active');
        console.log('Language button activated:', lang);
    } else {
        console.error('Language button not found:', `lang-${lang}`);
    }
    
    // UI 텍스트 업데이트
    updateUIText();
    
    // 현재 선택된 게시글 다시 로드
    const { category, slug } = getParams();
    renderSidebar(category, slug, lang);
    loadPost(category, slug, lang);
    updateURL(category, slug, lang);
}

// UI 텍스트 업데이트
function updateUIText() {
    const t = translations[currentLang];
    document.getElementById('sidebar-title').textContent = t.sidebarTitle;
    document.getElementById('placeholder-text').textContent = t.placeholderText;
}

// 사이드바 렌더링
function renderSidebar(currentCategory, currentSlug, currentLang) {
    console.log('Rendering sidebar with:', { currentCategory, currentSlug, currentLang });
    
    const sidebarContent = document.querySelector('.sidebar-content');
    if (!sidebarContent) {
        console.error('Sidebar content element not found!');
        return;
    }
    
    sidebarContent.innerHTML = '';
    
    const t = translations[currentLang];
    
    for (const [category, posts] of Object.entries(postsData)) {
        console.log('Processing category:', category, 'with posts:', posts);
        
        // 카테고리 헤더
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        if (category === currentCategory) categoryDiv.classList.add('active');
        
        categoryDiv.innerHTML = `
            <span class="category-title">
                <i class="fas fa-folder folder-icon"></i>
                ${t.categories[category] || category}
            </span>
            <i class="fas fa-chevron-right toggle-icon"></i>
        `;
        
        sidebarContent.appendChild(categoryDiv);
        
        // 게시글 목록
        const ul = document.createElement('ul');
        ul.className = 'post-list';
        if (category === currentCategory) ul.classList.add('open');
        
        posts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = currentLang === 'ko' ? post.title : (post.titleEn || post.title);
            
            if (category === currentCategory && post.slug === currentSlug) {
                a.classList.add('selected');
            }
            
            a.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Post clicked:', category, post.slug);
                loadPost(category, post.slug, currentLang);
                updateURL(category, post.slug, currentLang);
                
                // 사이드바 업데이트
                renderSidebar(category, post.slug, currentLang);
            });
            
            li.appendChild(a);
            ul.appendChild(li);
        });
        
        sidebarContent.appendChild(ul);
        
        // 토글 이벤트
        categoryDiv.addEventListener('click', () => {
            const wasOpen = ul.classList.contains('open');
            
            // 모든 카테고리 닫기
            document.querySelectorAll('.post-list').forEach(list => {
                list.classList.remove('open');
            });
            document.querySelectorAll('.category').forEach(cat => {
                cat.classList.remove('active');
                const icon = cat.querySelector('.toggle-icon');
                if (icon) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-right');
                }
            });
            
            // 클릭한 카테고리만 열기 (이미 열려있지 않았다면)
            if (!wasOpen) {
                ul.classList.add('open');
                categoryDiv.classList.add('active');
                const toggleIcon = categoryDiv.querySelector('.toggle-icon');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-chevron-right');
                    toggleIcon.classList.add('fa-chevron-down');
                }
            }
        });
        
        // 초기 상태 설정
        if (category === currentCategory) {
            const toggleIcon = categoryDiv.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-chevron-right');
                toggleIcon.classList.add('fa-chevron-down');
            }
        }
    }
    
    console.log('Sidebar rendering complete');
}

// 게시글 로드
async function loadPost(category, slug, lang) {
    const path = `posts/${category}/${slug}/${lang}.md`;
    const postContainer = document.getElementById('post');
    
    // 로딩 상태 표시
    postContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('Not found');
        const md = await res.text();
        
        // Marked 설정
        marked.setOptions({
            breaks: true,
            gfm: true,
            highlight: function(code, lang) {
                // 간단한 코드 하이라이팅
                return `<code class="language-${lang}">${code}</code>`;
            }
        });
        
        const html = marked.parse(md);
        postContainer.innerHTML = `<div class="markdown-content">${html}</div>`;
        
        // 코드 블록에 복사 버튼 추가
        addCopyButtons();
        
    } catch (error) {
        const t = translations[currentLang];
        postContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${t.notFoundText}</p>
            </div>
        `;
    }
}

// 코드 블록에 복사 버튼 추가
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(code => {
        const pre = code.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Copy code';
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(code.textContent).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

// 초기화
async function init() {
    console.log('Initializing blog...');
    
    // 사용자 국가 확인 및 기본 언어 설정
    const detectedLang = await detectUserCountry();
    console.log('Detected language:', detectedLang);
    
    // URL 파라미터가 없으면 감지된 언어 사용
    const params = new URLSearchParams(window.location.search);
    if (!params.has('lang')) {
        currentLang = detectedLang;
    } else {
        currentLang = params.get('lang');
    }
    
    console.log('Current language set to:', currentLang);
    
    const { category, slug } = getParams();
    console.log('Current params:', { category, slug, lang: currentLang });
    
    // 언어 버튼 이벤트 설정
    document.getElementById('lang-en').addEventListener('click', () => {
        console.log('English selected');
        setLanguage('en');
    });
    document.getElementById('lang-ko').addEventListener('click', () => {
        console.log('Korean selected');
        setLanguage('ko');
    });
    
    // 초기 설정
    setLanguage(currentLang);
    renderSidebar(category, slug, currentLang);
    loadPost(category, slug, currentLang);
    
    // URL이 파라미터 없이 접근된 경우 업데이트
    if (!params.has('category') || !params.has('slug') || !params.has('lang')) {
        updateURL(category, slug, currentLang);
    }
}

// 브라우저 뒤로/앞으로 가기 처리
window.addEventListener('popstate', (event) => {
    if (event.state) {
        const { category, slug, lang } = event.state;
        currentLang = lang;
        setLanguage(lang);
        renderSidebar(category, slug, lang);
        loadPost(category, slug, lang);
    }
});

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', init);