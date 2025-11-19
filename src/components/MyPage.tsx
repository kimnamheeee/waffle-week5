import NavigationBar from './NavigationBar';
import '../styles/common.css';
import '../styles/MyPage.css';
import { useEffect, useState } from 'react';
import { getBookmarks } from '../api/post/getBookmarks';
import type { Post } from '../api/post/getPosts';
import { useAuth } from '../contexts/AuthContext';
import BookMarkCard from './BookMarkCard';
import Button from './Button';

const MyPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'bookmark' | 'myinfo'>(
    'bookmark'
  );
  const [bookmarks, setBookmarks] = useState<Post[]>([]);
  const [applicant, setApplicant] = useState<null | {
    id: string;
    name?: string;
  }>(null);
  useEffect(() => {
    getBookmarks().then((res) => {
      setBookmarks(res.posts);
    });
  }, []);

  useEffect(() => {
    if (selectedTab === 'myinfo') {
      // 프로필 조회 (API의 /applicant/me 사용)
      import('../api/applicant/getApplicant')
        .then((m) => m.getApplicant())
        .then((data) => setApplicant(data))
        .catch(() => setApplicant(null));
    }
  }, [selectedTab]);

  return (
    <div className="page-container">
      <NavigationBar isAuthenticated={isAuthenticated} onLogout={logout} />
      <main className="my-page-main">
        <div className="my-page-content">
          <div className="my-page-tabs">
            <Button
              variant="primary"
              onClick={() => setSelectedTab('bookmark')}
            >
              찜한 목록
            </Button>
            <Button variant="primary" onClick={() => setSelectedTab('myinfo')}>
              내 정보
            </Button>
          </div>
          {selectedTab === 'bookmark' && (
            <div className="book-mark-cards">
              {bookmarks.map((bookmark) => (
                <BookMarkCard
                  key={bookmark.id}
                  positionTitle={bookmark.positionTitle}
                  emplymentEndDate={bookmark.employmentEndDate}
                  positionType={bookmark.positionType}
                />
              ))}
            </div>
          )}
          {selectedTab === 'myinfo' && (
            <div className="myinfo-section">
              {applicant ? (
                <div className="profile-card">
                  <h3>{applicant.name ?? '프로필'}</h3>
                  <p>ID: {applicant.id}</p>
                  <Button
                    variant="secondary"
                    onClick={() => alert('프로필 수정 페이지 미구현')}
                  >
                    내 프로필 수정
                  </Button>
                </div>
              ) : (
                <div className="no-profile">
                  <p>아직 프로필이 등록되지 않았어요!</p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      // 실제 생성 페이지는 만들지 않음 — 라우트만 이동
                      window.location.href = '/create-profile';
                    }}
                  >
                    내 프로필 생성
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      window.location.href = '/create-profile';
                    }}
                  >
                    지금 바로 프로필 작성하기
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyPage;
