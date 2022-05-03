import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import {
  StudantContainer,
  ProfilePicture,
  Form,
  NewStudant,
  Paginate,
} from './styled';
import { Container } from '../../styles/GlobalStyle';
import axios from '../../services/axios';
import Loading from '../../components/Loading';

export default function Studants() {
  const [studants, setStudants] = useState([]);
  const [allStudants, setAllStudants] = useState([]);
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function getStudants() {
    const response = await axios.get(`/aluno`);
    setAllStudants(response.data);
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get(`/alunos?page=${page}&limit=5`);
      setStudants(response.data);
      setIsLoading(false);
    }
    async function getStudant() {
      const response = await axios.get(`/alunos/${search}`);
      setStudants(response.data);
    }
    if (search.length === 0) {
      getData();
    } else {
      getStudant();
    }
    getStudants();
  }, [search, page]);

  const totalPages = Math.round(allStudants.length / 5);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Studants</h1>
      <NewStudant to="/studant">New Studant</NewStudant>
      <Form>
        <label htmlFor="search">
          Search studant:
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </Form>
      <StudantContainer>
        {studants.map((studant) => (
          <div key={String(studant.id)}>
            <ProfilePicture>
              {get(studant, 'Fotos[0].url', false) ? (
                <img src={studant.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{studant.nome} </span>
            <span>{studant.email} </span>
            <Link to={`/studant/${studant.id}/edit`}>
              <FaEdit size={20} />
            </Link>
          </div>
        ))}
      </StudantContainer>
      <Paginate>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={totalPages}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </Paginate>
    </Container>
  );
}
