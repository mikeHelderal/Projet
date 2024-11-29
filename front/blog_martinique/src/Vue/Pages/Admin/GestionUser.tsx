import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import {  Button } from 'react-bootstrap'

import { URl } from '../../../Utils/Constant/URL';
import ValidationPublication from './ValidationPublication';
import ValidationEvents from './ValidationEvents';

const GestionUser = () => {

    const [users, setUsers] = useState();

    useEffect(() => {
        // code here
        const getUsers = async () => {
            const response = await axios.get(URl.GET_ALL_USER);
            setUsers(response.data.data);
        }
        getUsers();
    },[])


    const passerAdmin = async (user: any) => {
      try {
          user.isAdmin = 1 ;
          const response = await axios.put(URl.UPDATE_USER+user.id, user);
          setUsers(response.data.data);
      } catch (error) {
          console.log(error);          
      }
    }

    const retirerAdmin = async (user: any) => {
      try {
          user.isAdmin = 0 ;
          const response = await axios.put(URl.UPDATE_USER+user.id, user);
          setUsers(response.data.data);
      } catch (error) {
          console.log(error);          
      }
    }





  return (
    <div>
        <Table striped="columns">
      <thead>
        <tr>
            <th>id</th>
          <th>nom</th>
          <th>prenom</th>
          <th>email</th>
          <th>date de naissance </th>
          <th>statut</th>
          <th>publication en attente</th>
          <th>evenement en attente</th>
          <th>mot de passe </th>
          <th>modifier statut </th>
        </tr>
      </thead>
      <tbody>      
        {users && users.map((item : any,index : any) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.born}</td>
            {
              item.isSuperAdmin == true ?
                <td>super admin</td>
              : 
                item.isAdmin == true ?
                  <td>admin</td>
                : 
                  <td>membre</td>
            }
            <td><ValidationPublication UserId = {item.id}></ValidationPublication></td>
            <td><ValidationEvents UserId = {item.id}></ValidationEvents></td>
            <td><Button variant="danger">reinitialiser</Button></td>
            {
              item.isSuperAdmin == true ?
                <td>super admin</td>
              : 
                item.isAdmin == true ?
                  <td><Button onClick={() => {retirerAdmin(item)}} variant="danger">retirer admin</Button></td>
                : 
                  <td><Button onClick={() => {passerAdmin(item)}} variant="danger">passer admin</Button></td>
            }
          </tr>
        ))}       
      </tbody>
    </Table>
    </div>
  )
}

export default GestionUser