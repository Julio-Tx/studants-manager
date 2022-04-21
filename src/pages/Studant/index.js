import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import history from '../../services/history';
import { Form, ProfilePicture } from './styled';
import { Container } from '../../styles/GlobalStyle';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

export default function Studant({ match }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [foto, setFoto] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [hide, setHide] = useState(false);
  const [sure, setSure] = useState(false);

  const id = get(match, 'params.id', 0);

  useEffect(() => {
    if (!id) setHide(true);

    async function getData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/aluno/${id}`);
        const Foto = get(response.data, 'Fotos[0].url', '');
        setName(response.data.nome);
        setSurname(response.data.sobrenome);
        setEmail(response.data.email);
        setAge(response.data.idade);
        setWeight(response.data.peso);
        setHeight(response.data.altura);
        setFoto(Foto);

        setIsLoading(false);
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);
        errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    if (id) {
      getData();
    }
  }, [id]);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    setHide(true);
    setSure(true);
  };

  async function handleDelete() {
    try {
      await axios.delete(`/alunos/${id}`);
      history.push('/');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome: name,
          sobrenome: surname,
          email,
          idade: age,
          peso: weight,
          altura: height,
        });
        toast.success('User updated.');
        history.push('/');
      } else {
        await axios.post(`/alunos/`, {
          name,
          surname,
          email,
          age,
          weight,
          height,
        });
        toast.success('User updated.');
        history.push('/');
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Unknow error');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Edit studant' : 'Register studant'}</h1>

      <ProfilePicture>
        {id ? (
          <img src={foto} alt="profile user" />
        ) : (
          <FaUserCircle size={120} />
        )}
        <Link to={`/photos/${id}`}>
          <FaEdit size={20} />
        </Link>
      </ProfilePicture>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Studant's name"
          />
        </label>
        <label htmlFor="surname">
          Surname:
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Studant's surname"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Studant's email"
          />
        </label>
        <label htmlFor="age">
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Studant's age"
          />
        </label>
        <label htmlFor="weight">
          Weight:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Studant's weight"
          />
        </label>
        <label htmlFor="height">
          Height:
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Studant's height"
          />
        </label>
        <button type="submit">{id ? 'Update studant' : 'Submit'}</button>
        <div>
          {!hide ? (
            <button
              className="delete-button"
              type="button"
              onClick={handleDeleteAsk}
            >
              Delete studant
            </button>
          ) : null}
          {sure ? (
            <div>
              <h1>Are you sure you want to delete?</h1>
              <button
                className="delete-button"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </Form>
    </Container>
  );
}

Studant.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
