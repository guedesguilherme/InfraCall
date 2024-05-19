import AppFetch from '../../../axios/config';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import NavAdmin from '../../../components/NavAdmin/NavAdmin';

import "./CadastroAdmin.css"

const CadastroAdmin = () => {

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nome: '',
            sobrenome: '',
            email: '',
            senha: '',
            confirmacaoSenha: '',
            setor: ''
    },

    validationSchema: Yup.object({
        nome: Yup.string().required('O nome é obrigatório'),
        sobrenome: Yup.string().required('O sobrenome é obrigatório'),
        email: Yup.string()
        .email('Digite um e-mail válido')
        .test('email-bricobread', 'O email deve terminar com @bricobread.com.br', (value) => {
            if (!value) return true; // Permitir se não houver valor
            return value.endsWith('@bricobread.com.br');
        })
        .required('O e-mail é obrigatório'),
        senha: Yup.string().required('A senha é obrigatória'),
        confirmacaoSenha: Yup.string()
        .oneOf([Yup.ref('senha'), null], 'As senhas precisam coincidir')
        .required('Confirme a senha'),
        setor: Yup.string().required('O setor é obrigatório')
    }),
    onSubmit: async (values) => {
        try {
            const response = await AppFetch.post('/admin/post', values)
            alert('Administrador cadastrado com sucesso!');
   
        } catch (error) {
            setError(error.message);
        }

        navigate("/admin/post/login")
    }
    });

    return (
    <div className='container'>
        <NavAdmin></NavAdmin>
        <div className="inner-container">
            <h1>Cadastro de Administrador</h1>
            <form onSubmit={formik.handleSubmit}>

            <div className="form-control">
                <div className='input-control'>
                    <label htmlFor="nome">Nome:</label>
                    <input id="nome" type="text" {...formik.getFieldProps('nome')} />
                    {formik.touched.nome && formik.errors.nome ? (
                    <div className='error-message'>{formik.errors.nome}</div>
                    ) : null}
                </div>

                <div className='input-control'>
                    <label htmlFor="sobrenome">Sobrenome:</label>
                    <input id="sobrenome" type="text" {...formik.getFieldProps('sobrenome')} />
                    {formik.touched.sobrenome && formik.errors.sobrenome ? (
                    <div className='error-message'>{formik.errors.sobrenome}</div>
                    ) : null}
                </div>

                <div className='input-control'>
                    <label htmlFor="email">E-mail:</label>
                    <input id="email" type="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                    <div className='error-message'>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className='input-control'>
                    <label htmlFor="senha">Senha:</label>
                    <input id="senha" type="password" {...formik.getFieldProps('senha')} />
                    {formik.touched.senha && formik.errors.senha ? (
                    <div className='error-message'>{formik.errors.senha}</div>
                    ) : null}
                </div>

                <div className='input-control'>
                    <label htmlFor="confirmacaoSenha">Confirme a Senha:</label>
                    <input id="confirmacaoSenha" type="password" {...formik.getFieldProps('confirmacaoSenha')} />
                    {formik.touched.confirmacaoSenha && formik.errors.confirmacaoSenha ? (
                    <div className='error-message'>{formik.errors.confirmacaoSenha}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="setor">Selecione o seu setor:</label>
                        <select className='input-control' id="setor" {...formik.getFieldProps('setor')}>
                            <option value="administrativo" label="Administrativo" />
                            <option value="fábrica" label="Fábrica" />
                            <option value="loja" label="Loja" />
                            <option value="portaria" label="Portaria" />
                        </select>
                    {formik.touched.setor && formik.errors.setor ? (
                    <div className='error-message'>{formik.errors.setor}</div>
                    ) : null}
                </div>

                <button type="submit" className='primary-btn'>Cadastrar</button>
            
            </div>
            
            </form>
        </div>
    </div>
    );
};

export default CadastroAdmin