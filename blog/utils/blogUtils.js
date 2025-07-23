import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentsDirectory = path.join(process.cwd(), 'contents');

// 모든 카테고리 가져오기
export function getCategories() {
  const categories = fs.readdirSync(contentsDirectory);
  return categories.filter(name => {
    return fs.statSync(path.join(contentsDirectory, name)).isDirectory();
  });
}

// 특정 카테고리의 모든 포스트 가져오기
export function getPostsByCategory(category) {
  const categoryPath = path.join(contentsDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const postDirs = fs.readdirSync(categoryPath);
  const posts = [];

  postDirs.forEach(postDir => {
    const postPath = path.join(categoryPath, postDir);
    if (fs.statSync(postPath).isDirectory()) {
      // 사용 가능한 언어 확인
      const files = fs.readdirSync(postPath);
      const languages = files
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));

      if (languages.length > 0) {
        // 첫 번째 언어의 메타데이터 가져오기 (제목, 날짜 등)
        const firstLangPath = path.join(postPath, `${languages[0]}.md`);
        const fileContents = fs.readFileSync(firstLangPath, 'utf8');
        const { data } = matter(fileContents);

        posts.push({
          slug: postDir,
          category,
          languages,
          metadata: data,
          title: data.title || postDir
        });
      }
    }
  });

  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date || 0);
    const dateB = new Date(b.metadata.date || 0);
    return dateB - dateA;
  });
}

// 특정 포스트와 언어의 내용 가져오기
export function getPostContent(category, postSlug, language = 'ko') {
  const postPath = path.join(contentsDirectory, category, postSlug);
  const filePath = path.join(postPath, `${language}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // 사용 가능한 언어 목록
  const files = fs.readdirSync(postPath);
  const availableLanguages = files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));

  return {
    metadata: data,
    content,
    availableLanguages,
    category,
    slug: postSlug,
    language
  };
}

// 모든 포스트의 경로 가져오기 (정적 생성용)
export function getAllPostPaths() {
  const categories = getCategories();
  const paths = [];

  categories.forEach(category => {
    const posts = getPostsByCategory(category);
    posts.forEach(post => {
      post.languages.forEach(lang => {
        paths.push({
          params: {
            category,
            post: post.slug,
            lang
          }
        });
      });
    });
  });

  return paths;
}