import React from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar';
import Music from './components/Music/music';
import News from './components/News/news';
import Settings from './components/Settings/settings';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar/sidebar';
import DialogsContainer from './components/Dialogs/dialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/headerContainer';
import LoginPage from './components/Login/login';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/preloader/preloader';
import { withSuspense } from './hoc/withSuspense';

const UsersContainer = withSuspense(React.lazy(() => import ('./components/Users/usersContainer')));

class App extends React.Component {

  componentDidMount () {

    this.props.initializeApp();      
 }

  render () {

    if (!this.props.initialized) {
      return <Preloader />
    }

     return (
    
    <div className='app-wrapper'>
       <HeaderContainer />
       <Navbar />
       <div className='app-wrapper-content'>
        <Routes>          
           <Route path='/dialogs' element={<DialogsContainer />} />                                                    
           <Route path='/profile/:userId?' element={<ProfileContainer />} />
           <Route path='/music' element={<Music/>} />
           <Route path='/news' element={<News/>} />
           <Route path='/users' element={<UsersContainer/>} />
           <Route path='/settings' element={<Settings/>} />
           <Route path='/friends' element={<Sidebar />} />
           <Route path='/login' element={<LoginPage />} />
        </Routes>         
       </div>     
    </div>   
    );
  }
}

const mapStateToProps = (state) => ({  
  initialized: state.app.initialized
})

const WithRouter = (props) => {       
  const location = useLocation()
  const params = useParams();

  return <App location={location} params={params} {...props} />   
}

export default connect (mapStateToProps, {initializeApp}) (WithRouter);
