const RequireAuth = (Component) => { 

  return class AuthCheck extends Component { 

      componentWillMount() { 
          const getToken = localStorage.getItem('user.token'); 
          if(!getToken) { 
             this.props.history.replace({pathname: '/'}); 
          } 
      } 
      render() { 
         return <Component {...this.props} /> 
      }
  } 

} 

export { RequireAuth }