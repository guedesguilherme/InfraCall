import React, { useState, useEffect } from 'react';
import AppFetch from '../../axios/config';

const SearchAdmin = () => {
    const [administradores, setAdministradores] = useState([]);
    const [adminSelecionado, setAdminSelecionado] = useState('');
    const [chamadosFiltrados, setChamadosFiltrados] = useState([]);

    useEffect(() => {
        const fetchAdministradores = async () => {
            try {
                const response = await AppFetch.get('/admin'); // Endpoint para obter lista de administradores
                setAdministradores(response.data);
            } catch (error) {
                console.error('Erro ao buscar administradores:', error);
            }
        };

        fetchAdministradores();
    }, []);

    const handleAdminChange = (e) => {
        setAdminSelecionado(e.target.value);
    };

    const handleBuscarChamados = async () => {
        try {
            const response = await AppFetch.get(`/info/admin/${adminSelecionado}`); // Endpoint para buscar chamados atribuídos ao admin
            setChamadosFiltrados(response.data);
        } catch (error) {
            console.error('Erro ao buscar chamados atribuídos ao administrador:', error);
        }
    };

    return (
        <div>
            <h2>Filtrar Chamados por Administrador</h2>
            <select value={adminSelecionado} onChange={handleAdminChange}>
                <option value="">Selecione um administrador</option>
                {administradores.map(admin => (
                    <option key={admin.admin_id} value={admin.admin_id}>
                        {admin.nome} {admin.sobrenome}
                    </option>
                ))}
            </select>
            <button onClick={handleBuscarChamados}>Buscar Chamados</button>

            <div>
                <h3>Chamados Filtrados</h3>
                <ul>
                    {chamadosFiltrados.map(chamado => (
                        <li key={chamado.id_chamado}>
                            {chamado.titulo_form} - {chamado.descricao_form}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchAdmin;
