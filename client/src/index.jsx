import React from 'react';
import ReactDOM from 'react-dom';
import FollowButton from './components/FollowButton.jsx';
import $ from 'jquery';

const round = {
  borderRadius: "50%"
};

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'JimHendrix',
      photo: 'https://unsplash.it/120/120/?random',
      followers: 741,
      tracks: 4,
      isFollowed: false
    }
    this.handleAddFollowClick = this.handleAddFollowClick.bind(this);
  }

  handleAddFollowClick( ) {
    console.log('AddFollowButton was clicked');
    if (this.state.isFollowed === true) {
    this.setState({isFollowed: !this.state.isFollowed, followers: this.state.followers - 1});
    $.ajax({
      url: '/decrementFollowers',
      type: 'PATCH',
      data: { username: this.state.username },
      success: (status) => {
        console.log('This is the status inside the succes of PATCH decrement request": ', status);
      },
      error: (error) => {
        console.log('This is the error from the PATCH decrement request: ', error);
      }
    });
  } else {
    this.setState({isFollowed: !this.state.isFollowed, followers: this.state.followers + 1 });
    $.ajax({
      url: '/incrementFollowers',
      type: 'PATCH',
      data: { username: this.state.username },
      success: (status) => {
        console.log('This is the status inside the succes of PATCH increment request": ', status);
      },
      error: (error) => {
        console.log('This is the error from the PATCH increment request: ', error);
      }
    });
  }
  }

  render() {


    return (
      <div id="user_module" className="l-about-left user container">
        <div className="listenArtistInfo">
          <div className="user photo container">
            <img className="circle" src={this.state.photo} />
          </div>
          <div className="user_module_username_container">
            <div className="user_module_username">{this.state.username}</div>
          </div>
          <div className="user icon container">
            <span className="user_meta-data_container">
              <div className="user_followers_stats">
                <span className="user_follwers_icon">
                  <div className="user followers icon">
                    <span className="user_followers">
                      <i className="fad fa-user-friends"></i>
                    </span>
                  </div>
                  <div className="user followers">{this.state.followers}</div>
                </span>
              </div>
              <span className="user_tracks_container">
                <span className="user_tracks_icon">
                  <i className="fal fa-waveform tracks_icon"></i>
                </span>
                <span className="user tracks">{this.state.tracks}</span>
              </span>
            </span>
          </div>

          <FollowButton handleClick={this.handleAddFollowClick} isFollowed={this.state.isFollowed} />

            {/* <div className="user_add_follow_button">
              <button className="user_add_follow_btn">
                <span className="user_add_follow_icon_in_button">
                  <a href=""><i className="fal fa-user-plus add_follow_icon"></i></a>
                </span> Follow</button>
            </div> */}


          <div className="report_button_container">
            <span className="report_button_span">
              <a className="report_button_a">
                <span className="report_button_exclamation_icon">
                <i className="fas fa-diamond fa-lg"></i>
                <i className="fas fa-exclamation fa-xs" ></i>
                </span>
                <span className="report_text">Report</span></a>
            </span>
          </div>
        </div >
      </div >
    )
  }
}

ReactDOM.render(<User />, document.getElementById('app'));