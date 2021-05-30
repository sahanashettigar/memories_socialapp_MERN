import React,{useEffect} from 'react'
import {Pagination,PaginationItem} from '@material-ui/lab'
import useStyles from './Posts/styles'
import {useDispatch,useSelector} from 'react-redux'
import {getPosts} from '../actions/posts'
import {Link} from 'react-router-dom'
const Paginate=({page})=>{
    const {numberOfPages}=useSelector((state)=>state.posts);
    const classes=useStyles();
    const dispatch=useDispatch();
    useEffect(()=>{
        if(page){
            dispatch(getPosts(page))
        }
    },[page])
    return (
        <Pagination
            classes={{ul:classes.ul}}
            count={numberOfPages}
            page={Number(page)|| 1}
            variant="outlined"
            color="primary"
            renderItem={(item)=>(
                <PaginationItem
                {...item}
                component={Link}
                to={`/posts/?page=${item.page}`}
                ></PaginationItem>
            )}
        ></Pagination>
    )
}
export default Paginate