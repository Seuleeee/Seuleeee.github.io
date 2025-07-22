document.addEventListener('DOMContentLoaded', function() {
    // 현재 연도 자동 업데이트
    var yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 모바일 메뉴 토글
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 모달 배경 클릭 시 닫기
    const modalElem = document.getElementById('projectModal');
    if (modalElem) {
        modalElem.addEventListener('click', function(e) {
            if (e.target === this) {
                closeProjectModal();
            }
        });
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
});

// 프로젝트 모달 관련 함수들
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const projectData = getProjectData(projectId);
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = projectData.title;
        modalContent.innerHTML = projectData.content;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // 배경 스크롤 복원
    }
}

// 프로젝트 데이터 반환 함수 (index.html L322~L749 전체 반영)
function getProjectData(projectId) {
    const projects = {
        'aipaas': {
            title: 'AI PaaS - LLMOps',
            content: `
                <div class="space-y-6">
                    <p class="text-gray-600 text-lg">
                        AI PaaS 솔루션으로, LLM Serving, Chatbot App builder 등 LLM 솔루션 개발 및 운영을 위한 환경을 제공하는 솔루션
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">기간 / 인원</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>기간: 2024.09 - 진행중</li>
                                <li>전체인원: 총 7개 기관/기업 참여</li>
                                <li>인원(1): <strong>BE(1)</strong></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">주요 기능 및 역할</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>RAG 기반 솔루션 백오피스 API 개발</li>
                                <li>Chatbot App Builder API 개발</li>
                                <li>Model(LLM, Embedding Model, Re-Rank Model) 등록 및 관리 API 개발</li>
                                <li>LLM Serving 환경 구축</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술적 도전과 해결</h4>
                        <div class="text-gray-600 space-y-2">
                            <p><strong>LLM Serving : </strong></p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">결과 및 배운 점</h4>
                        <div class="text-gray-600 space-y-2">
                            <p>...</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술 스택</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">Python</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Kubernetes</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">KServe</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Ollama</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">vLLM</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">LangChain</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">LangGraph</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">HuggingFace</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Milvus</span>
                            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">FastAPI</span>
                            <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">MariaDB</span>
                        </div>
                    </div>
                </div>
            `
        },
        'ondevice': {
            title: 'On-Device RAG',
            content: `
                <div class="space-y-6">
                    <p class="text-gray-600 text-lg">
                        On-Device 환경에서 동작하는 Chatbot을 No-Code로 개발하고 배포하는 솔루션
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">기간 / 인원</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>기간: 2024.09 - 진행중</li>
                                <li>인원(3): FE(1), <strong>BE(2)</strong></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">주요 기능 및 역할</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>RAG 기반 솔루션 백오피스 API 개발</li>
                                <li>On-Device RAG Chatbot App Builder API 개발</li>
                                <li>Model(LLM, Embedding Model, Re-Rank Model) 등록 및 관리 API 개발</li>
                                <li>LLM Serving 환경 구축</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술적 도전과 해결</h4>
                        <div class="text-gray-600 space-y-2">
                            <p><strong>LLM Serving : </strong></p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">결과 및 배운 점</h4>
                        <div class="text-gray-600 space-y-2">
                            <p>...</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술 스택</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">Python</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">LangChain</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">LangGraph</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">HuggingFace</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">SQLite</span>
                            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">FastAPI</span>
                            <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">MariaDB</span>
                            <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">LLM Fine-Tuning</span>
                        </div>
                    </div>
                </div>
            `
        },
        'domainqa': {
            title: '법률 질의응답, 문서생성 PoC',
            content: `
                <div class="space-y-6">
                    <p class="text-gray-600 text-lg">
                        법무법인, 세무법인, 바이오/제약, 공장 등 다양한 도메인의 질의 응답 PoC 수행
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">기간 / 인원</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>기간: 2024.10 - 지속</li>
                                <li>인원(1): <strong>BE(1)</strong></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">주요 기능 및 역할</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>도메인별 데이터 분석</li>
                                <li>데이터 정제 및 저장 파이프라인 설계, 구축, 개발</li>
                                <li>문제 유형별 해결방안(LLM, 비즈니스 로직 등) 적용</li>
                                <li>질의 응답 파이프라인 설계, 구축, 개발</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술적 도전과 해결</h4>
                        <div class="text-gray-600 space-y-3">
                            <p><strong>데이터 품질 향상</strong><br> 고객에게 제공받은 데이터(PDF)의 경우, 법률과 상관 없는 데이터(법제처 담당자 연락처, 주소 등)가 많음으로 <strong>국가법령정보센터API</strong> 사용을 고객에게 역제안</p>
                            <p><strong>검색 품질 향상 : </strong><br> 장, 조, 항, 호, 목으로 구분되는 법 조항을 '항' 기준으로 분리하였으며, 상위 개념인 '장', '조' 를 meta data로 활용</p>
                            <p><strong>정확한 금액 계산 : </strong><br> 금액 계산에 필요한 <strong>'매개 변수'를 추출</strong>한 후 사전 정의된 계산식에 대입하여, 정확한 금액 계산 결과 제공</p>
                            <p><strong>용어 사전 활용 : </strong><br> 특정 도메인 특화 용어를 사전 정의하여, LLM 생성 결과물의 품질 향상</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">결과 및 배운 점</h4>
                        <div class="text-gray-600 space-y-2">
                            <p>LLM 솔루션은 결국, 프롬프트를 잘 구성하기 위해 필요한 데이터를 잘 정제하고 저장하여 검색하는 것이 가장 중요</p>
                            <p>Vector DB 기반의 유사도 검색에만 치우쳐서는 안되며, 데이터 유형에 따라 RDBMS, 레거시 시스템 연동 등 다양한 방법을 고민해야 함</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술 스택</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">Python</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">LangChain</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">LangGraph</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">HuggingFace</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">OpenAI</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Milvus</span>
                            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Streamlit</span>
                            <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">MariaDB</span>
                        </div>
                    </div>
                </div>
            `
        },
        'docgen': {
            title: 'LLM/RAG 기반 문서 생성 솔루션',
            content: `
                <div class="space-y-6">
                    <p class="text-gray-600 text-lg">
                        RAG 파이프라인을 활용한 지능형 문서 자동 생성 시스템으로, 지식 베이스를 참조하여 표, 차트, 그래프를 포함한 문서 생성
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">기간 / 인원</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>기간: 2024.12 - 2025.03</li>
                                <li>인원(3): FE(1), <strong>BE(2)</strong></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">주요 기능 및 역할</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>RAG 파이프라인 구축 : 쿼리 분석/분해, 하이브리드 검색, Function Calling, 웹 검색</li>
                                <li>다양한 문서 포맷 지원 (PDF, MS Word/PPT/Excel)</li>
                                <li>문서 내부 표, 이미지, 그래프 등 데이터 추출</li>
                                <li>Milvus를 활용한 문서 벡터 저장 및 검색</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술적 도전과 해결</h4>
                        <div class="text-gray-600 space-y-2">
                            <p>다양한 포맷의 문서를 지원하고, 문서 내부 표, 이미지, 그래프 등 데이터를 추출</p>
                            <p>표와 이미지가 포함된 문서의 맥락이 유지되도록 컨텍스트 추출 및 청킹(Chunking) 전략 구현</p>
                            <p>LLM 생성 결과물을 차트, 표, 그래프로 재생성하는 기능 구현</p>
                            <p>검색 성능 향상을 위해 Multi Lingual Embedding Model 활용 및 Hybrid Search 적용</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">결과 및 배운 점</h4>
                        <div class="text-gray-600 space-y-2">
                            <p>
                                <a href="https://www.linkedin.com/posts/hanseul-jo-446528301_aw-2025-%EC%8A%A4%EB%A7%88%ED%8A%B8%EA%B3%B5%EC%9E%A5%EC%9E%90%EB%8F%99%ED%99%94%EC%82%B0%EC%97%85%EC%A0%84%EC%97%90-surrodocs-studio-activity-7307333161225445377-cr5D?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE0kZnYBb6yhNEPUlj8Pfvab8FYqJP2UylU" target="_blank" class="text-sky-600 hover:text-sky-700 transition duration-300">
                                    <i class="fas fa-external-link-alt mr-2"></i>AW2025 (스마트공장·자동화산업전) 출품 및 전시회 참가 목표 달성
                                </a>
                            </p>
                            <p>차트, 그래프 생성 기능을 통한 문서 생성 솔루션 홍보 효과 확인</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술 스택</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">Python</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">LangChain</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">HuggingFace</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">OpenAI</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Milvus</span>
                            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">FastAPI</span>
                            <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">MariaDB</span>
                        </div>
                    </div>
                </div>
            `
        },
        'aitextbook': {
            title: 'AI 교과서 영어 챗봇',
            content: `
                <div class="space-y-6">
                    <p class="text-gray-600 text-lg">
                        초등 저학년 영어 단어 학습을 위한 형태소 검색 기반 챗봇 개발
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">기간 / 인원</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>기간: 2024.04 - 2024.09</li>
                                <li>인원(10): PM(1), 디자인(1), <strong>BE(3)</strong>, FE(2), ML(3)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">주요 기능 및 역할</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>영어 단어 관련 레거시 시스템 연동</li>
                                <li>VLM 활용, 영어 단어 이미지별 description 생성</li>
                                <li>형태소 기반 단어 검색기 개발</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술적 도전과 해결</h4>
                        <p class="text-gray-600">
                            학년별 단어 검색 결과를 제한해야 하는 요구사항 구현을 위해, 형태소 분석기 활용 및 검색 범위 제한<br>
                            FastText 기반 단어 벡터 모델 활용, 단어 검색 결과 정확도 향상<br>
                            레거시 시스템 연동 인터페이스 정의
                        </p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">결과 및 배운 점</h4>
                        <p class="text-gray-600">
                            레거시 시스템이 제대로 구축되지 않은 경우, 고객과 지속 협의 및 구현을 통한 납기 준수<br>
                            초등 저학년 대상 영어 단어 학습 챗봇 개발 실무 경험
                        </p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술 스택</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">Python</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">FastAPI</span>
                        </div>
                    </div>
                </div>
            `
        },
        'contract': {
            title: '계약서 자동생성 AI 솔루션',
            content: `
                <div class="space-y-6">
                    <p class="text-gray-600 text-lg">
                        계약서 템플릿을 활용한 손쉬운 작성과 계약서 Life Cycle (작성-검토-승인) 관리 시스템 백엔드 개발
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">기간 / 인원</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>기간: 2021.07 - 2023.02</li>
                                <li>인원(10): PM(1), 기획(2), <strong>BE(2)</strong>, FE(2), ML(2), 변호사(1)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">주요 기능 및 역할</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>계약서 템플릿 관리 시스템 개발</li>
                                <li>계약서 Life Cycle 관리</li>
                                <li>Reminder 메일 발송 기능 개발</li>
                                <li>핵심 키워드 추출 AI 연동 시스템 개발</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술적 도전과 해결</h4>
                        <p class="text-gray-600">
                            레거시 시스템 연동 인터페이스, 계약서 분석을 위한 비동기 처리 아키텍처를 구축하고, Django와 Celery를 활용한 백그라운드 작업 시스템을 구현
                        </p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">결과 및 배운 점</h4>
                        <p class="text-gray-600">
                            계약 검토 시간을 60% 단축시키는 성과를 달성했으며, 엔터프라이즈급 AI 시스템 개발 경험
                        </p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">기술 스택</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">Python</span>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Django</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Celery</span>
                            <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Redis</span>
                            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">MariaDB</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Docker</span>
                        </div>
                    </div>
                </div>
            `
        }
    };
    return projects[projectId] || { title: 'Project Not Found', content: '<p>프로젝트 정보를 찾을 수 없습니다.</p>' };
}
