import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import PenstateUniversity from './PenstateUniversity';
import { getStatusOfDarkmode } from '../reducer';
import { withRouter } from 'react-router-dom';
import { formDataToJson } from '../utilities/utility';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import { compose } from 'redux';

class OrganizationAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      highestLoadCount: 0.046,
      impactCount: 3,
      tabActive: 0,
      targetBtn: '',
      totalTeam: 0,
      editTeamClass: '',
      closeBtn: { display: 'none' },
      wantDeleteTeam: false,
      hideEditElement: { display: 'block' },
      showEditPen: { display: 'none' },
      toShowEditPen: '',
      showEditForm: false,
      teamFormData: {}
    };
  }
  toggleTab = (value) => {
    this.setState({ tabActive: value });
  };

  getTargetBtn = (value) => {
    this.setState({ targetBtn: value });
  };

  componentDidUpdate() {
    if (getStatusOfDarkmode().status === true) {
      this.refs.rosterContainer.style.background = '#171b25';
      this.refs.cardContainer.style.background = '#232838';
      // this.refs.smCard2.style.background = '#171b25';

      this.refs.loadCardParent.style.background = 'transparent';

      this.refs.loadCardParent.style.border = '0.5px solid #e8e8e8';
      this.refs.impactCardParent.style.border = '0.5px solid #e8e8e8';

      this.refs.impactCardParent.style.background = 'transparent';

      this.refs.loadCard.style.background = '#171b25';
      this.refs.impactCard.style.background = '#171b25';
      for (let i = 1; i <= this.state.totalTeam; i++) {
        // this.refs['smcard' + i].style.background = '#171b25';
        // this.refs['parentChildTop' + i].style.borderBottom =
        //   '0.5px solid #e8e8e8';
        // this.refs['parentChildLeft' + i].style.borderRight =
        //   '0.5px solid #e8e8e8';
        // this.refs['parentChildLeft' + i].style.borderRight =
        //   '0.5px solid #e8e8e8';
      }
      for (let i = 1; i <= this.state.totalTeam; i++) {
        // this.refs['h' + i].style.color = '#fff';
      }
    }
  }

  addTeam = () => {
    this.setState({ totalTeam: this.state.totalTeam + 1 });
  };

  enableEditTeamOPtion = () => {
    if (this.state.editTeamClass === '') {
      this.setState({
        editTeamClass: 'edit-teams',
        closeBtn: { display: 'block' },
        currentDeleteTarget: ''
      });
    }
  };

  disableEditTeamOPtion = () => {
    if (this.state.editTeamClass === 'edit-teams') {
      this.setState({ editTeamClass: '', closeBtn: { display: 'none' } });
    }
  };

  deleteTeam = (e) => {
    this.setState({
      wantDeleteTeam: true,
      currentDeleteTarget: e.currentTarget.parentNode
    });
  };
  deleteCard = () => {
    this.state.currentDeleteTarget.remove();
    this.setState({ wantDeleteTeam: false });
  };

  hideModal = () => {
    this.setState({ wantDeleteTeam: false });
  };

  hideElementForEdit = (e) => {
    if (this.state.editTeamClass === 'edit-teams') {
      // this.setState({
      //   hideEditElement: { display: 'none' },
      //   showEditPen: { display: 'block' },
      //   toShowEditPen: 'hover_edit'
      // });
      e.currentTarget.classList.add('hover_edit');
      e.currentTarget.firstChild.style = 'display:block';
      e.currentTarget.firstChild.nextSibling.style = 'display:none';
    }
  };

  showElements = (e) => {
    // this.setState({
    //   hideEditElement: { display: 'block' },
    //   showEditPen: { display: 'none' },
    //   toShowEditPen: ''
    // });
    e.currentTarget.classList.remove('hover_edit');
    e.currentTarget.firstChild.style = 'display:none';
    e.currentTarget.firstChild.nextSibling.style = 'display:block';
  };

  makeEditable = () => {
    this.setState({ showEditForm: true });
  };

  hideTeamForm = () => {
    this.setState({ showEditForm: false });
  };

  handleTeamEditSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = formDataToJson(data);
    this.setState({ teamFormData: formData }, () =>
      console.log(this.state.teamFormData)
    );
  };

  teamForm = (fieldName, placeholder, name, labelFor) => {
    return (
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{fieldName}</div>
        </div>
        <input
          name={name}
          type="text"
          className="form-control team-edit-input"
          id={labelFor}
          placeholder={placeholder}
        />
      </div>
    );
  };

  showEditForm = () => {
    return (
      <div className="modal__wrapper ">
        <div className="modal__show modal_form">
          <img
            className="delete__icon"
            onClick={this.hideTeamForm}
            src="/img/icon/close.svg"
            alt=""
          />
          <p className="edit-your-team">Edit your team.</p>
          <form onSubmit={this.handleTeamEditSubmit}>
            {this.teamForm(
              'Team Name:',
              'Enter your team name',
              'team',
              'teamName'
            )}
            {this.teamForm(
              'Athletes:',
              'Enter number of athletes',
              'athletes',
              'athletesFor'
            )}
            {this.teamForm(
              'Impacts:',
              'Enter number of impacts',
              'impacts',
              'impactsFor'
            )}
            {this.teamForm(
              'Alerts:',
              'Enter number of alerts',
              'alerts',
              'alertsFor'
            )}
            <button type="submit" className="dynamic-white-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  showModal = () => {
    return (
      <div className="modal__wrapper">
        <div className="modal__show">
          <p>Are You really want to delete this team? It cannot be undone.</p>
          <div className="action_buttons">
            <button onClick={this.deleteCard}>YES</button>
            <button onClick={this.hideModal}>NO</button>
          </div>
        </div>
      </div>
    );
  };

  smallCards = (reference, noOfAthletes, noOfAlerts, noOfImpacts, key) => {
    // console.log(reference);
    return (
      <div key={key} ref={''} className={this.state.editTeamClass}>
        <img
          className="delete__icon"
          onClick={this.deleteTeam}
          style={this.state.closeBtn}
          src="/img/icon/close.svg"
          alt=""
        />
        <div
          ref={reference[0]}
          onMouseEnter={this.hideElementForEdit}
          onMouseLeave={this.showElements}
          onClick={() => {
            this.state.editTeamClass === 'edit-teams'
              ? this.makeEditable()
              : this.props.history.push('/TeamAdmin');
          }}
          className={`tech-football m-3`}
        >
          <img
            className="pen_icon"
            style={this.state.showEditPen}
            src="/img/icon/pencheck.svg"
            alt=""
          />
          <div style={this.state.hideEditElement}>
            <div ref={reference[1]} className="football-header ">
              <p ref={reference[2]}>
                York tech football <img src="/img/icon/football.svg" alt="" />
              </p>
              <p ref={reference[3]}>{noOfAthletes} Athletes </p>
            </div>
            <div className="football-body d-flex">
              <div ref={reference[4]} className="body-left-part ">
                <p>{noOfImpacts}</p>
                <p ref={reference[5]}>Impacts</p>
              </div>
              <div className="body-right-part">
                <p>{noOfAlerts}</p>
                <p ref={reference[6]}>Alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  iterateTeam = () => {
    let inc = 1;
    var cards = new Array(this.state.totalTeam);
    for (let i = 1; i <= this.state.totalTeam; i++) {
      cards[i] = this.smallCards(
        [
          'smCard' + i,
          'parentChildTop' + i,
          'h' + inc++,
          'h' + inc++,
          'parentChildLeft' + i,
          'h' + inc++,
          'h' + inc++
        ],
        0,
        0,
        0,
        i
      );
    }
    return cards;
  };

  militaryVersionOrNormalVersion = () => {
    return (
      <React.Fragment>
        {this.state.wantDeleteTeam === true ? this.showModal() : ''}
        {this.state.showEditForm === true ? this.showEditForm() : ''}

        <div ref="rosterContainer" className="t-roster pt-5 mt-5">
          <PenstateUniversity />
          <div className="row text-center organization-pad__military">
            <div className="col-md-9">
              <div className="row">
                <div
                  ref="cardContainer"
                  className="col-md-12 current-roster-card mb-5 mt-4 p-0"
                >
                  <div className="rostar-selector">
                    <RostarBtn
                      tabActive={this.toggleTab}
                      makeActive={this.state.tabActive}
                      getBtn={this.getTargetBtn}
                      currentBtn={this.state.targetBtn}
                      content="Overview"
                    />
                    <RostarBtn
                      tabActive={this.toggleTab}
                      makeActive={this.state.tabActive}
                      getBtn={this.getTargetBtn}
                      currentBtn={this.state.targetBtn}
                      content="staff"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-right">
                      <button
                        type="button"
                        onClick={this.enableEditTeamOPtion}
                        className="edit-team-btn"
                      >
                        Edit Teams
                      </button>
                      {this.state.editTeamClass === 'edit-teams' ? (
                        <button
                          type="button"
                          onClick={this.disableEditTeamOPtion}
                          className="edit-team-btn"
                        >
                          Done
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="football-container mt-4 d-flex flex-wrap">
                    {this.iterateTeam()}
                    <div className="tech-football m-3">
                      <div className="addTeam text-center">
                        <div onClick={this.addTeam} className="plus">
                          +
                        </div>
                        <p>Add Team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 pt-5 mb-3">
              <div className="highest-load mb-5">
                <div ref="loadCardParent" className="card">
                  <div ref="loadCard" className="load-heading">
                    HIGHEST LOAD
                  </div>
                  <p ref="john1" className="mt-4 ">
                    John Sylvester <span>- York Tech football</span>
                  </p>
                  <div className="load-count mt-3 mb-3">
                    {this.state.highestLoadCount}
                  </div>
                </div>
              </div>

              <div className="most-impacts">
                <div ref="impactCardParent" className="card">
                  <div ref="impactCard" className="impact-heading">
                    MOST IMPACTS
                  </div>
                  <p ref="john2" className="mt-4">
                    John Sylvester <span>- York Tech football</span>
                  </p>
                  <div className="impact-count mt-3 mb-3">
                    {this.state.impactCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.props.isMilitaryVersionActive === true ? (
          <div className="militay-view">
            <div className="military-sidebar">
              <SideBar />
            </div>
            <div className="military-main-content">
              {this.militaryVersionOrNormalVersion()}
            </div>
          </div>
        ) : (
          <React.Fragment>
            {this.militaryVersionOrNormalVersion()}
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    isMilitaryVersionActive: state.militaryVersion
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(OrganizationAdmin);
