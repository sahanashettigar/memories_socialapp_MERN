import { Container, Grid, Grow,Paper } from '@material-ui/core'
import React ,{useEffect,useState}from 'react'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import {useDispatch} from 'react-redux'//dispatch an action
import {getPosts} from '../../actions/posts'
import useStyles from '../../styles'
import Pagination from '../Pagination'
function Home() {
    const [currentId,setCurrentId]=useState(null);
  const classes=useStyles();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch])
    return (
    <Grow in>
      <Container>
        <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3}>
          <Grid item x s={12} sm={7}>
            <Posts currentId={currentId} setCurrentId={setCurrentId}></Posts>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
            <Paper elevation={6}>
              <Pagination></Pagination>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      </Grow>
    )
}

export default Home
