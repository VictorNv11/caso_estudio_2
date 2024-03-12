import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Footer from '../ui/Footer';
import NavBar from '../ui/NavBar';
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import Logo from '..//..//assets/img/planetas.png';

const ShowCompany = () => {
  const endpoint = 'http://localhost:8000/api';

  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);

  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllCompanies = async () => {
    try {
      const response = await axios.get(`${endpoint}/companies`);
      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las compañías:', error);
      setLoading(false);
    }
  };

  const discard = async () => {
    if (companyIdToDelete) {
      await axios.delete(`${endpoint}/companies/delete/${companyIdToDelete}`);
      getAllCompanies();
      setCompanyIdToDelete(null);
    }
    setShowConfirmation(false);
  };

  const showDeleteConfirmation = (id) => {
    setShowConfirmation(true);
    setCompanyIdToDelete(id);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCompanies = search
    ? companies.filter((company) =>
        company.name_company.toLowerCase().includes(search.toLowerCase()) ||
        (company.phone && company.phone.toString().includes(search.toString()))
      )
    : companies;

  const validateSearch = (searchInput) => {
    if (!isNaN(searchInput) && searchInput.toString().length === 10) {
      return true;
    }
    if (typeof searchInput === 'string' && searchInput.trim() !== '') {
      return true;
    }
    return false;
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    // Validar el campo de búsqueda
    if (validateSearch(value)) {
      setSearch(value);
    } else {
      setSearch('');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div style={{ backgroundColor: '#50727B', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
        <div>
          <NavBar />

          <div style={{ marginLeft: '4%', marginTop: '2%' }}>
            <input value={search} style={{ borderRadius: 5 }} onChange={handleSearch} type='text' placeholder='Buscar Nombre o Teléfono' className='form'></input>
            <BsSearch style={{ marginLeft: 5, color: 'white' }} />
            <Link className='btn btn-success btn-sm' to={'/Clientes'} style={{ marginLeft: '65.5%' }}>Importar</Link>{' '}
            <Link to='/create' className='btn btn-sm' style={{ backgroundColor: '#78A083', color: 'white' }}>Crear</Link>{' '}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a className="navbar-brand" href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={Logo} alt="Logo" title='Logo de la Pagina' style={{ width: 70, height: 60 }} />
            </a>
            <div>
              <table className='table table-striped container' style={{ marginTop: '2%', border: '1px solid black', backgroundColor: 'white' }}>
                <thead className='content'>
                  <tr>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Nit</th>
                    <th>Telefono</th>
                    <th>email</th>
                    <th>Documento</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map(company => (
                    <tr key={company.id}>
                      <td>{company.name_company}</td>
                      <td>{company.address}</td>
                      <td>{company.nit}</td>
                      <td>{company.phone}</td>
                      <td>{company.email}</td>
                      <td>{company.document}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => showDeleteConfirmation(company.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {showConfirmation && (
                <div className="modal fade show " style={{ display: 'block' }}>
                  <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                      <div className="modal-header">
                        <h5 className="modal-title text-white">Confirmar eliminación</h5>
                      </div>
                      <div className="modal-body text-white">
                        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger border " onClick={discard}>Eliminar</button>
                        <button type="button" className="btn btn-secondary border " onClick={() => setShowConfirmation(false)}>Cancelar</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <section>
                <div style={{ marginLeft: '46.5%', marginTop: 'auto' }}>
                  <ul className="pagination">
                    <li className="page-item" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                      <a className="page-link " href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {Array.from({ length: Math.ceil(filteredCompanies.length / itemsPerPage) }, (_, index) => (
                      <li key={index + 1} className={`page-item ${currentPage === index + 1 && 'active'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(companies.length / itemsPerPage)}>
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ShowCompany;