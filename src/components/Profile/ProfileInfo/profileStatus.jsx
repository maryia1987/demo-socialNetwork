import React from 'react';
import s from './profileInfo.module.css';


class ProfileStatus extends React.Component {   
    
 state = {
    editMode: false,
    status: this.props.status                      // статус возьми значение из приходящего статуса
 }

  activatedEditMode = () => {     
   this.setState ( {
       editMode: true
   } ) 
  }
 
  deactivatedEditMode = () => {
    this.setState ( {
        editMode: false
    } );
    this.props.updateStatus(this.state.status);
  }


  onStatusChange = (e) => {                                 //создаем этот метод так как повесили value на input
    this.setState({
        status:  e.currentTarget.value
    })  
  }

  componentDidUpdate = (prevProps) => {                       //метод жизненного цикла, чтобы статус обноленный сохранялся
    if (prevProps.status !== this.props.status) {        
        this.setState ({
            status: this.props.status  
        });
    }
  }

    render () {
    return (
        <div>
            <div className={s.status}>
            {!this.state.editMode &&
              <span onDoubleClick={this.activatedEditMode}>{this.props.status || 'no status'}</span>
            }
            {this.state.editMode &&
              <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivatedEditMode} value={this.state.status} />
            }
            </div>        
        </div>
    );
  }
}

export default ProfileStatus;