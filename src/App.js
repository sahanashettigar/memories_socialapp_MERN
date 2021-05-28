import React from 'react'
import {Container} from '@material-ui/core'
import useStyles from './styles'
import { Navbar } from './components/Navbar/Navbar'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Home from './components/Home/Home'
import { Auth } from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
const App=()=> {
  const user=JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
      <Navbar></Navbar>
      <Switch>
        <Route path='/' exact component={()=><Redirect to='/posts'></Redirect>}></Route>
        <Route path='/posts' exact component={Home}></Route>
        <Route path='/posts/search' exact component={Home}></Route>
        <Route path='/posts/:id' component={PostDetails}></Route>
        <Route path='/auth' exact component={()=>(!user?<Auth></Auth>:<Redirect to='/posts'></Redirect>)}></Route>
      </Switch>
    </Container>
    </BrowserRouter>
    
  )
}

export default App;
