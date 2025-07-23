import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children, categories = [] }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
              My Blog
            </Link>
            
            {/* 언어 선택 */}
            <div className="flex space-x-4">
              <button 
                onClick={() => switchLanguage('ko')}
                className={`px-3 py-1 rounded ${router.query.lang === 'ko' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-600'}`}
              >
                한국어
              </button>
              <button 
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 rounded ${router.query.lang === 'en' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-600'}`}
              >
                English
              </button>
              <button 
                onClick={() => switchLanguage('fr')}
                className={`px-3 py-1 rounded ${router.query.lang === 'fr' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Français
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
        {/* 사이드바 */}
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">카테고리</h3>
            <nav className="space-y-2">
              {categories.map(category => (
                <Link
                  key={category}
                  href={`/${category}`}
                  className={`block px-3 py-2 rounded text-sm transition-colors ${
                    router.query.category === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );

  function switchLanguage(newLang) {
    const { category, post } = router.query;
    if (category && post) {
      router.push(`/${category}/${post}/${newLang}`);
    }
  }
}