import Layout from '../components/Layout';
import Link from 'next/link';
import { getCategories, getPostsByCategory } from '../utils/blogUtils';

export default function Home({ categories, recentPosts }) {
  return (
    <Layout categories={categories}>
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          최근 게시글
        </h1>
        
        <div className="grid gap-6">
          {recentPosts.map(post => (
            <article key={`${post.category}-${post.slug}`} className="border-b pb-6 last:border-b-0">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
                {post.metadata.date && (
                  <span className="ml-3">
                    {new Date(post.metadata.date).toLocaleDateString('ko-KR')}
                  </span>
                )}
              </div>
              
              <h2 className="text-xl font-semibold mb-3">
                <Link 
                  href={`/${post.category}/${post.slug}/ko`}
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              {post.metadata.description && (
                <p className="text-gray-600 mb-3">
                  {post.metadata.description}
                </p>
              )}
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">언어:</span>
                {post.languages.map(lang => (
                  <Link
                    key={lang}
                    href={`/${post.category}/${post.slug}/${lang}`}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                  >
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = getCategories();
  
  // 모든 카테고리에서 최근 게시글 가져오기
  const allPosts = [];
  categories.forEach(category => {
    const posts = getPostsByCategory(category);
    allPosts.push(...posts);
  });
  
  // 날짜순 정렬하여 최근 10개만
  const recentPosts = allPosts
    .sort((a, b) => {
      const dateA = new Date(a.metadata.date || 0);
      const dateB = new Date(b.metadata.date || 0);
      return dateB - dateA;
    })
    .slice(0, 10);

  return {
    props: {
      categories,
      recentPosts
    }
  };
}