import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { StudantContainer, ProfilePicture, Form, NewStudant } from './styled';
import { Container } from '../../styles/GlobalStyle';
import axios from '../../services/axios';
import Loading from '../../components/Loading';

export default function Studants() {
  const [studants, setStudants] = useState([]);
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setStudants(response.data);
      setIsLoading(false);
    }
    async function getStudant() {
      const response = await axios.get(`/alunos/${search}`);
      setStudants(response.data);
    }
    if (!search) {
      getData();
    } else {
      getStudant();
    }
  }, [search]);

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
    </Container>
  );
}
