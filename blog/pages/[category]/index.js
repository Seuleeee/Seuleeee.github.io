import Layout from '../../components/Layout';
import Link from 'next/link';
import { getCategories, getPostsByCategory } from '../../utils/blogUtils';

export default function CategoryPage({ category, posts, categories }) {
  return (
    <Layout categories={categories}>
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {category} 카테고리
        </h1>
        
        <div className="grid gap-6">
          {posts.map(post => (
            <article key={post.slug} className="border-b pb-6 last:border-b-0">
              {post.metadata.date && (
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(post.metadata.date).toLocaleDateString('ko-KR')}
                </div>
              )}
              
              <h2 className="text-xl font-semibold mb-3">
                <Link 
                  href={`/${category}/${post.slug}/ko`}
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
                    href={`/${category}/${post.slug}/${lang}`}
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

export async function getStaticPaths() {
  const categories = getCategories();
  const paths = categories.map(category => ({
    params: { category }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { category } = params;
  const categories = getCategories();
  const posts = getPostsByCategory(category);

  return {
    props: {
      category,
      posts,
      categories
    }
  };
}