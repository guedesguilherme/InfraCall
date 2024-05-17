import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            senha: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Digite um e-mail válido')
                .required('O e-mail é obrigatório'),
            senha: Yup.string()
                .required('A senha é obrigatória'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/usuario/entrar', values);

                if (response.status === 401) {
                    setError('E-mail ou senha incorretos');
                    return;
                }

                if (!response.data) {
                    throw new Error('Erro ao fazer login');
                }

                // Login bem-sucedido, redirecione para a página adequada
                navigate('/usuario/form');
            } catch (error) {
                setError(error.message);
            }
        },
    });

    return (
        <div className='container'>

            <div className="inner-container">   
                <h1>Login de Usuário</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-control">
                        <div className='input-control'>
                            <label htmlFor="email">E-mail:</label>
                            <input id="email" type="email" {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className='input-control'>
                            <label htmlFor="senha">Senha:</label>
                            <input id="senha" type="password" {...formik.getFieldProps('senha')} />
                            {formik.touched.senha && formik.errors.senha ? (
                                <div>{formik.errors.senha}</div>
                            ) : null}
                        </div>
                        {error && <div>{error}</div>}
                        <button type="submit" className='primary-btn'>Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
