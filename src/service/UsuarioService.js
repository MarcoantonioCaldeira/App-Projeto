
import http from '../config/http';

const listagemUsuarios = async () => {
    return (
        http({
            method:'GET',
            url:'/usuario/listar',
        }).then( ( response ) =>{
            return response?.data
        })   
    )   
}

const lerUsuarioPorId = async (id) => {
    return (
        http({
            method:'GET',
            url: `/usuario/buscar/${id}`,
        }).then( ( response ) =>{
            return response?.data
        })  
    )   
}


const incluirUsuario = async (usuario) => {
    return (
        http({
            method:'POST',
            url: '/usuario/salvar',
            data:usuario
        }).then((response) =>{
            return response;
        })
    )
}


export {
    listagemUsuarios,
    lerUsuarioPorId,
    incluirUsuario,
}