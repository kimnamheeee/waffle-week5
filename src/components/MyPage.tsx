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
  useEffect(() => {
    getBookmarks().then((res) => {
      setBookmarks(res.posts);
    });
  }, []);

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
          {selectedTab === 'myinfo' && <div>내 정보</div>}
        </div>
      </main>
    </div>
  );
};

export default MyPage;
