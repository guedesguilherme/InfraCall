import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AppFetch from '../../../axios/config';
import { jwtDecode } from "jwt-decode";

const Formulario = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            titulo: '',
            local: '',
            descricao: '',
        },
        validationSchema: Yup.object({
            titulo: Yup.string().required('O título é obrigatório'),
            local: Yup.string().required('O local é obrigatório'),
            descricao: Yup.string().required('A descrição é obrigatória'),
        }),
        onSubmit: async (values) => {

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado');
            }
            
            // Decodificar o token para obter o ID do usuário
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            console.log("decoded token " + decodedToken.id)

            // Adicionar o ID do usuário ao corpo da solicitação
            const data = { ...values, usuario: userId };

            try {
              const response = await AppFetch.post('/form/post', data);

                // Se quiser logar a resposta do servidor    
                console.log(response.data); 

                alert('Formulário enviado com sucesso!');

                navigate("/form/post")
                
            } catch (error) {
                console.error(error);
                setError('Erro ao enviar o formulário');
            }
        },
    });

    return (
        <div className='container'>
          <div className="inner-container">
              <h1>Enviar Formulário</h1>
              <form onSubmit={formik.handleSubmit}>
                  <div className="form-control">
                      <label htmlFor="titulo">Título:</label>
                      <input id="titulo" type="text" {...formik.getFieldProps('titulo')} />
                      {formik.touched.titulo && formik.errors.titulo ? (
                          <div>{formik.errors.titulo}</div>
                      ) : null}
                  </div>
                  <div className="form-control">
                      <label htmlFor="local">Local:</label>
                      <input id="local" type="text" {...formik.getFieldProps('local')} />
                      {formik.touched.local && formik.errors.local ? (
                          <div>{formik.errors.local}</div>
                      ) : null}
                  </div>
                  <div className="form-control">
                      <label htmlFor="descricao">Descrição:</label>
                      <textarea id="descricao" {...formik.getFieldProps('descricao')} />
                      {formik.touched.descricao && formik.errors.descricao ? (
                          <div>{formik.errors.descricao}</div>
                      ) : null}
                  </div>
                  <button type="submit" className='primary-btn'>Enviar</button>
                  {error && <div>{error}</div>}
              </form>
            </div>
        </div>
    );
};

export default Formulario;
