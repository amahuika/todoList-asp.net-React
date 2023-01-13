import React, {  useContext } from 'react';
import {  Route,  Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';


import './custom.css';
import AuthContext from './store/auth-context';






export default function App() {
  const ctx = useContext(AuthContext);


  


 
    return (
      <Layout>
    
  
        <Routes>
       
       
        
     
    
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;

          })}
     
        </Routes>
      
       
      </Layout>
    );

}
