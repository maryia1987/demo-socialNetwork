import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, requestUsers} from '../../redux/users-reducer';
import Users from './users';
import Preloader from '../common/preloader/preloader';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../selectors/users-selectors';


class UsersContainer extends React.Component {           
    
    componentDidMount () {                         // все перенеслось в reducer как thunk
          
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);

          /*this.props.toggleIsFetching(true);                         - когда идет загрузка

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);                        -  когда завершилась загрузка
            this.props.setUsers(data.items)                   -  добавляется this так как не приходят нам props
            this.props.setUsersTotalCount(data.totalCount);   - dispatch этот запрос, чтобы было известно сколько на сервере 
        });*/
    }

    onPageChanged = (pageNumber) => {                    //создаем метод для переключения страниц
        
        this.props.requestUsers(pageNumber, this.props.pageSize);
        
        /* this.props.setCurrentPage(pageNumber);
            this.props.toggleIsFetching(true); 
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);    
            this.props.setUsers(data.items);                                   
        });*/
    }
   
    render () {  

        return  <>   
                                                      
        {this.props.isFetching ? <Preloader/> : null}    

        <Users totalUsersCount={this.props.totalUsersCount}   //props получаем через connect от UsersContainer
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       users={this.props.users}
                      // toggleFollowingProgress={this.props.toggleFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
        />
        </>
       }
}

let mapStateToProps = (state) => {
    return { 
      //users: getUsersSuperSelector(state),
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }

};

/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));               сокращаем код и в connect заменяем mapDispatchToProps на объект со свойствами из 
        },                                            АС, только убираем везде АС, чтобы совпадало имя обьекта и его свойство
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));                                         setUsers: setUsersAC => setUsers
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setUsersTotalCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
    
};*/

/*export default connect (mapStateToProps, {follow, unfollow,  setCurrentPage, 
                                         - setUsersTotalCount, toggleIsFetching, setUsers - уже здесь не нужны -
                                          toggleFollowingProgress, getUsers}) (UsersContainer);*/

export default compose (connect (mapStateToProps, {follow, unfollow,  setCurrentPage, toggleFollowingProgress, requestUsers}), 
                        WithAuthRedirect) (UsersContainer);
 