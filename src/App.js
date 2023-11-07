import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Incluir from './paginas/usuario/Incluir';
import Listar from './paginas/usuario/Listar';
import Rotas from './rotas/Rotas';
import { Fragment } from 'react';
import Dashboard from './paginas/dashboard/Dashboard';


function App() {
  return (
     <Fragment> 
        <BrowserRouter>
          <Routes>
             <Route element={<Rotas/>}>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/usuario/listar" element={<Listar/>}/>
              <Route path="/usuario/incluir" element={<Incluir/>}/>
             </Route> 
          </Routes>
        </BrowserRouter>
    </Fragment>
  );
}

export default App;
