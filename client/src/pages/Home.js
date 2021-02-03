import React from 'react'
import { Row,Col,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {gql,useQuery} from '@apollo/client'
import {useAuthDispatch} from '../contextAuth'

const GET_USERS = gql`
  query getUsers{
    getUsers{
      user 
      email
      createdAt
    }
  }
`

export default function Home(props) {
  const dispatch = useAuthDispatch()

  const logout = () => {
    dispatch({type: 'LOGOUT'})
    props.history.push('/login')
  }

  const {loading,data,error} = useQuery(GET_USERS)
  
  if(error){
    console.log(error)
  }

  if(data){
    console.log(data)
  }
  let userMarkup
  if(!data || loading){
    userMarkup = <p>Loading...</p>
  }
  else if(data.getUsers.length === 0){
    userMarkup = <p>No user have joined</p>
  }
  else if(data.getUsers.length !== 0){
    userMarkup = data.getUsers.map((user) => (
      <div key={user.user}>
        <p>{user.user}</p>
      </div>
    ))
  }

  return (
    <>
    <Row className="mb-1 bg-white justify-content-around">
      <Link to="/login">
        <Button variant="link">Login</Button>
      </Link>
      <Link to="/login">
        <Button variant="link">register</Button>
      </Link>
      <Button variant="link" onClick={logout}>Logout</Button>
    </Row>
    <Row className="bg-white">
      <Col xs={4}>
        {userMarkup}
      </Col>
      <Col xs={8}>
        <p>message</p>
      </Col>
    </Row>
    </>
  )
}
