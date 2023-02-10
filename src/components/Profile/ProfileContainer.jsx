import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reduser';
import { useLocation, useParams } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component {

    componentDidMount () {

      let userId = this.props.params.userId;
      
      if(!userId) {
        userId = this.props.authorizedUserId;
      }
      console.log(this.props)

      this.props.getUserProfile(userId);

      this.props.getStatus(userId);  //это не прокидываем в Profile, а только здесь, потому что дальше не надо его использовать
         
    }

    render () {

    return (       
        <div>
             <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>    
        </div>
    )
  }
}

let AuthRedirectComponent = WithAuthRedirect(ProfileContainer);

/*let mapStateToPropsForRedirect = (state) => ({          - выносим в hoc повторяющийся props
    isAuth: state.auth.isAuth
});
AuthRedirectComponent = connect (mapStateToPropsForRedirect) (AuthRedirectComponent);*/

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth    
});


const WithUrlDataContainerComponent = (props) => {    
    const location = useLocation()
    const params = useParams();
  
    return <AuthRedirectComponent location={location} params={params} {...props} />  
  }

export default connect (mapStateToProps, {getUserProfile, getStatus, updateStatus}) (WithUrlDataContainerComponent);   //setUserProfile меняется на getUserProfile