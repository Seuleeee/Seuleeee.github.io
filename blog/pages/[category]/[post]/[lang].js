import Layout from '../../../components/Layout';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import Link from 'next/link';
import { getCategories, getPostContent, getAllPostPaths } from '../../../utils/blogUtils';

export default function PostPage({ post, categories }) {
  if (!post) {
    return (
      <Layout categories={categories}>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-red-600">게시글을 찾을 수 없습니다</h1>
        </div>
      </Layout>
    );
  }

  const assetBasePath = `/contents/${post.category}/${post.slug}/assets`;

  return (
    <Layout categories={categories}>
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* 브레드크럼 */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">홈</Link>
          <span className="mx-2">/</span>
          <Link href={`/${post.category}`} className="hover:text-blue-600">
            {post.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{post.metadata.title}</span>
        </nav>

        {/* 언어 선택 */}
        {post.availableLanguages.length > 1 && (
          <div className="flex items-center gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">다른 언어로 읽기:</span>
            {post.availableLanguages
              .filter(lang => lang !== post.language)
              .map(lang => (
                <Link
                  key={lang}
                  href={`/${post.category}/${post.slug}/${lang}`}
                  className="text-sm bg-white hover:bg-blue-50 text-blue-600 px-3 py-1 rounded border transition-colors"
                >
                  {lang.toUpperCase()}
                </Link>
              ))}
          </div>
        )}

        {/* 포스트 헤더 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.metadata.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {post.metadata.date && (
              <span>{new Date(post.metadata.date).toLocaleDateString('ko-KR')}</span>
            )}
            {post.metadata.author && (
              <span>작성자: {post.metadata.author}</span>
            )}
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {post.language.toUpperCase()}
            </span>
          </div>
        </header>

        {/* 포스트 내용 */}
        <MarkdownRenderer 
          content={post.content} 
          assetBasePath={assetBasePath}
        />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostPaths();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { category, post: postSlug, lang } = params;
  const categories = getCategories();
  const post = getPostContent(category, postSlug, lang);

  return {
    props: {
      post,
      categories
    }
  };
}