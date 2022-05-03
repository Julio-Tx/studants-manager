import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import { isEmail, isInt, isFloat } from 'validator';

// import { Link } from 'react-router-dom';
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
  const [photo, setPhoto] = useState('');

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
        const Photo = get(response.data, 'Fotos[0].url', '');
        setName(response.data.nome);
        setSurname(response.data.sobrenome);
        setEmail(response.data.email);
        setAge(response.data.idade);
        setWeight(response.data.peso);
        setHeight(response.data.altura);
        setPhoto(Photo);

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

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);

    setPhoto(fileURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Photo updated.');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Error uploading image');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

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
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (surname.length < 3 || surname.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido');
      formErrors = true;
    }

    if (!isInt(String(age))) {
      toast.error('Idade inválida');
      formErrors = true;
    }

    if (!isFloat(String(weight))) {
      toast.error('Peso inválido');
      formErrors = true;
    }

    if (!isFloat(String(height))) {
      toast.error('Altura inválida');
      formErrors = true;
    }

    if (formErrors) return;

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
          nome: name,
          sobrenome: surname,
          email,
          idade: age,
          peso: weight,
          altura: height,
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
      {id ? (
        <ProfilePicture>
          {photo ? (
            <img src={photo} alt="profile user" />
          ) : (
            <FaUserCircle size={120} />
          )}
          <input type="file" id="photo" onChange={handlePhotoChange} />
        </ProfilePicture>
      ) : (
        <div />
      )}

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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Studant's email"
          />
        </label>
        <label htmlFor="age">
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Studant's age"
          />
        </label>
        <label htmlFor="weight">
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Studant's weight"
          />
        </label>
        <label htmlFor="height">
          Height:
          <input
            type="number"
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
