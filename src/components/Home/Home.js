import { Container, Grid, Grow,Paper,AppBar,TextField,Button } from '@material-ui/core'
import React ,{useEffect,useState}from 'react'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import {useHistory,useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input' //normal input for tags
import {useDispatch} from 'react-redux'//dispatch an action
import {getPosts,getPostsBySearch} from '../../actions/posts'
import Pagination from '../Pagination'
import useStyles from './Styles'
function useQuery(){
  return new URLSearchParams(useLocation().search)
}
function Home() {
    const [currentId,setCurrentId]=useState(null);
  const classes=useStyles();
  const dispatch=useDispatch();
  const query=useQuery();
  const history=useHistory();
  const page=query.get('page') || 1
  const searchQuery=query.get('searchQuery')
  const [search,setSearch]=useState('');
  const [tags,setTags]=useState([]);
  useEffect(()=>{
     dispatch(getPosts());
  },[currentId,dispatch])
  const handleKeyPress=(e)=>{
    if(e.keyCode===13){
      //search post on enter key
      searchPost();
    }
  }
  const handleAdd=(tag)=>{
    setTags([...tags,tag])
  }
  const handleDelete=(tagToDelete)=>{
    setTags(tags.filter((tag)=>tag!==tagToDelete))
  }
  const searchPost=()=>{
    if(search.trim() || tags){
      //dispatch to fetch search posts
      dispatch(getPostsBySearch({search,tags:tags.join(',')}));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else{
      history.push('/posts')
    }
  }
    return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts currentId={currentId} setCurrentId={setCurrentId}></Posts>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField 
              name='search' 
              variant='outlined' 
              label='Search Memories'
              onKeyPress={handleKeyPress}
              fullWidth
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}></TextField>
              <ChipInput
              style={{margin:'10px 0'}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label='Search tags'
              variant='outlined'></ChipInput>
              <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
            </AppBar> 
            <br></br>
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
