
import React, { useState, useEffect } from 'react';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';

// Styles, Icons
import Wrapper from './styles';
import { BiSearchAlt2 } from "react-icons/bi";

// Components
import Header from '../../components/Header';
import BookCard from '../../components/BookCard';

import bookData from '../../dummy-data/bookData';

function Books() {


  function handleBookClick(bookId) {
    if (bookId !== 1) {
      setShowModal(true);
    }
  }
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [searchedBooks, setSearchedBooks] = useState([]); // 검색된 책들의 상태 추가
  const booksPerPage = 6; // 한 페이지에 보여질 책의 수

  useEffect(() => {
    setBooks(bookData);
  }, []);

  useEffect(() => {
    // 검색어가 변경될 때마다 검색 결과 업데이트
    if (searchTerm.trim() !== '') {
      const formattedSearchTerm = searchTerm.trim().toLowerCase().replace(/\s+/g, ''); // 띄어쓰기 제거 및 소문자로 변환
      const filteredBooks = books.filter((book) => book.title.toLowerCase().replace(/\s+/g, '').includes(formattedSearchTerm));
      setSearchedBooks(filteredBooks);
      setCurrentPage(1); // 검색 결과가 바뀌면 페이지를 1로 초기화
    } else {
      setSearchedBooks([]);
    }
  }, [searchTerm, books]);

  const closeModal = () => {
    setShowModal(false);
  }
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchTerm ? searchedBooks.slice(indexOfFirstBook, indexOfLastBook) : books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop(); // 페이지네이션을 클릭하면 페이지 상단으로 스크롤
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 검색 결과 업데이트
    if (searchTerm.trim() !== '') {
      const formattedSearchTerm = searchTerm.trim().toLowerCase().replace(/\s+/g, ''); // 띄어쓰기 제거 및 소문자로 변환
      const filteredBooks = books.filter((book) => book.title.toLowerCase().replace(/\s+/g, '').includes(formattedSearchTerm));
      setSearchedBooks(filteredBooks);
      setCurrentPage(1); // 검색 결과가 바뀌면 페이지를 1로 초기화
    } else {
      setSearchedBooks([]);
    }
  };

  const handleKeyPress = (e) => {
    // 엔터 키 입력 시 검색 결과 업데이트
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지의 상단으로 스크롤
  };

  return (
    <div>
      <Header />
        {/* 검색 입력 상자와 검색 버튼 추가 */}
        <Wrapper>
      <div className='search-container'> 
        <div 
        className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="책 제목을 검색해 보세요! 🙆‍♀️"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
              <button className="btn btn-primary" onClick={handleSearch} style={{ backgroundColor: '#9D4FE0', border: 'none' }}>
                <BiSearchAlt2 />
              </button>
        </div>
      </div>
      <br />
      {/* BookCard 컴포넌트 */}
      <div className="container">
        <Row xs={1} md={1} lg={2} xl={3} className="g-4">
          {currentBooks.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} onClick={() => handleBookClick(book.id)} />
            </Col>
          ))}
        </Row>
      </div>
      {showModal && (
  <div className="modal" onClick={closeModal}> {/* 바깥 부분 클릭시 모달 닫기 */}
    <div className="modal-content" onClick={e => e.stopPropagation()}> {/* 이 부분은 클릭 전파를 막음 */}
      <span>아직 이야기가 만들어지지 않았어요. <br />다음에 다시 와주세요! 😊📚</span>
      <button onClick={closeModal}>닫기</button>
    </div>
  </div>
)}

      <br />
        {/* 페이지네이션 */}
        <Pagination>
          {[...Array(Math.ceil((searchTerm ? searchedBooks.length : books.length) / booksPerPage)).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Wrapper>
    </div>
  );
}

export default Books;
