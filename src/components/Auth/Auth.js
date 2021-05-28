import React , {useState} from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container, TextField} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import useStyles from './Styles'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { Input } from './Input'
import {GoogleLogin} from 'react-google-login'
import Icon from './icon';
import {signin,signup} from '../../actions/auth'
export const Auth = () => {
    const initialState={
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    }
    const dispatch=useDispatch();
    const classes=useStyles();
    const history=useHistory();
    const [isSignUp,setIsSignUp]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialState);
    const handleShowPassword=()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword)
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(isSignUp){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
    }
    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        })
    }
    const switchMode=()=>{
        setIsSignUp((previsSignUp)=>!previsSignUp)
        setShowPassword(false)
    }
    const googleSuccess=async (res)=>{
        const result=res?.profileObj;//if res object doesn't exist, no error
        const token=res?.tokenId;
        try{
            dispatch({type:'AUTH',data:{result,token}});
            history.push('/')
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const googleFailure=()=>{
        console.log('Google sign in was unsuccessful. Try Again')
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>
                <Typography variant="h5">{
                    isSignUp? 'Sign Up' : 'Sign In'
                }
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                <Input name='firstName' label='FIRST NAME' handleChange={handleChange} autoFocus half> 
                                </Input>
                                <Input name='lastName' label='LAST NAME' handleChange={handleChange} autoFocus half> 
                                </Input>
                                </>
                            ) 
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"></Input>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}></Input>
                        {
                            isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"></Input>
                        }
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {
                                isSignUp? 'Sign Up':'Sign In'
                            }
                        </Button>
                        <GoogleLogin
                        clientId="798545596591-021qotttpllahtr7cfofockb9rjrifp0.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon></Icon>} variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin">

                        </GoogleLogin>
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp? 'Already have an account? Sign In': ' Dont have an account? Sign Up'}
                                </Button>
                            </Grid>
                        </Grid>
                </form>
            </Paper>
        </Container>
    )
}
