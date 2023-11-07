import React, { Fragment, useState } from "react";
import { BUTTON_SIZE_SHOW_MESSAGE, DEFAULT_IMAGEM_THUMBNAIL, SERVIDOR_GET_IMAGEM } from "../../config/config";
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import { useEffect } from "react";
import { listagemUsuarios } from "../../service/UsuarioService";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import Status from "./Status";
import { Link } from "react-router-dom";


const Listar = () => {

  const [usuarios, setUsuarios] = useState([])
  const [showModal, setShowModal] = useState(false);
  

  useEffect( () => {
    
    async function loadUsuario() {
        const response = await listagemUsuarios()
              .catch( ( error )=> {
                console.log(error);
              });
        setUsuarios(response)    
    }
    loadUsuario();

  },[]) 
    
  
  const onShowModal = () => {
    setShowModal(true);
    console.log("valor do showmodal "+showModal)
  }
  
  const closeModal = () => {
    setShowModal(false);
  }


  return (
    <Fragment>
      <ShowMensagem
        iconTitulo={<FaIcons.FaListAlt size={BUTTON_SIZE_SHOW_MESSAGE}/>}
        titulo="Manutenção de Usuários"
        descricao="Listar os usuários cadastrados no sistema"
        iconReturn={<AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE}/>}
        url="/dashboard" 
        tituloUrl="Dashboard" 
      />
      { showModal ? 
         (
          <Status 
            showModal={showModal}
            closeModal={closeModal}/>
         ) 
         : null}

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <div className="app-windows">
            <div className="row justify-content-center">
              <form>
                <div className="row mb-3">
                  <label htmlFor="key" className="col-form-label">
                    Filtro:
                  </label>
                  <div className="col-xs-11 col-sm-11 col-md-6">
                    <input
                      type="text"
                      id="key"
                      name="key"
                      className="form-control"
                    />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <button
                      type="submit"
                      className="btn btn-success form-control"
                    >
                      Consulta
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <table className="table table-striped table-bordered table-hover app-tabela">
                <thead>
                <tr className="bg-success text-white app-cabecalho-tabela">
                  <th>Foto</th>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Ativo</th>
                  <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                  { 
                      usuarios && 
                         usuarios.map( ( usuario ) => (
                        <tr className="app-coluna-detalhe-centro" key={usuario.id}>
                          <td>
                          <img
                            src={
                              usuario.foto === null
                                    ? DEFAULT_IMAGEM_THUMBNAIL
                                    : `${SERVIDOR_GET_IMAGEM}${usuario.foto}`
                            }
                            alt="foto usuário"
                            className="img-avatar"
                          />
                        </td>
                        <td>{ usuario.id }</td>
                        <td>{ usuario.username }</td>
                        <td>{ usuario.email }</td>
                        <td>
                          <input
                            type="checkbox"
                            className="btn-check"
                            name={`ativo_${usuario.id}`}
                            id={`ativo_${usuario.id}`}
                            autoComplete="off"
                            checked 
                            onChange={onShowModal}
                          />
                          { usuario.ativo ? (
                            <label
                                className="btn btn-outline-success"
                                htmlFor={`ativo_${usuario.id }`}
                              >
                              <i><BsIcons.BsPersonFillCheck/></i>
                            </label>
                          ) : (
                            <label
                                className="btn btn-outline-success"
                                htmlFor={`ativo_${usuario.id }`}
                            >
                            <i><BsIcons.BsPersonFillLock/></i>
                          </label>   
                          )}

                        </td>
                        <td>
                          <a href="#" type="button" className="btn btn-secondary">
                            <i><FaIcons.FaPencilAlt/></i>
                          </a>
                          <a href="#" type="button" className="btn btn-danger">
                          <i><FaIcons.FaTrashAlt/></i>
                          </a>
                          <a href="#" type="button" className="btn btn-info">
                          <i><FaIcons.FaSearchPlus/></i>
                          </a>{" "}
                        </td>
                      </tr>
                 
                 
                 
                    ))}
                    
                  
                </tbody>
              </table>
              <Link to="/usuario/incluir" type="button" className="btn btn-primary btn-lg">
                 Cadastrar novo usuário &nbsp;&nbsp;
                 <i><FaIcons.FaSave/></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Listar;
