import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import history from '../../services/history';
import { Form } from './styled';
import { Container } from '../../styles/GlobalStyle';
import axios from '../../services/axios';

export default function Studant({ match }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const [hide, setHide] = useState(false);
  const [sure, setSure] = useState(false);

  const id = get(match, 'params.id', 0);

  useEffect(() => {
    if (!id) setHide(true);
  });

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

  return (
    <Container>
      <h1>{id ? 'Edit studant' : 'Register studant'}</h1>

      <Form>
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
