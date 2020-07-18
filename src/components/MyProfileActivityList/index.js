import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import membership from './../../services/membership';
import List from '@material-ui/core/List';
import LockIcon from '@material-ui/icons/Lock';
import ListItem from '@material-ui/core/ListItem';
import '../ProfileList/profileList.css';
import '../../app.css';
import './index.css';

export default class MyProfileActivityList extends Component {
  handleChangeMembershipPrivacy(userMembership) {
    membership.toggleMembershipPrivacy(userMembership);
    this.forceUpdate();
  }

  render() {
    // Gets the membership and involvement privacy
    const { Membership, InvolvementPrivacy } = this.props;

    // Style of privacy text
    const toggleTextStyle = {
      fontSize: '12pt',
    };
    // Creates the opacity of the card to reflect the membership's privacy
    const membershipItemStyle = {
      opacity: Membership.Privacy || InvolvementPrivacy ? '0.5' : '1',
    };
    // The Grid lengths for each content inside of the card based on Material-UI's breakpoints
    const cardContentLengths = {
      contentOne: {
        xs: 8,
        sm: 9,
        md: 9,
        lg: 8,
        xl: 9,
      },
      contentTwo: {
        xs: 4,
        sm: 3,
        md: 3,
        lg: 4,
        xl: 3,
      },
    };

    // If the Involvement is a regular (non-special/secret group - AKA Public) it is False.
    let myProfileInvolvementsList;
    if (!InvolvementPrivacy) {
      myProfileInvolvementsList = (
        <div>
          <Grid container alignItems="center" justify="center" className="my-profile-info-card">
            {/* CONTENT ONE (Activity Text and Privacy) */}
            <Grid
              container
              xs={cardContentLengths.contentOne.xs}
              sm={cardContentLengths.contentOne.sm}
              md={cardContentLengths.contentOne.md}
              lg={cardContentLengths.contentOne.lg}
              xl={cardContentLengths.contentOne.xl}
              justify="center"
              alignItems="center"
              className="my-profile-info-card-info-one"
            >
              <Grid container xs={8} alignItem="center">
                <List>
                  <ListItem className="my-profile-info-card-info-one-text">
                    {/* A link to the activity is only available if the user is online */}
                    {this.props.network === 'online' ? (
                      <Link
                        className="gc360-link"
                        to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                        style={membershipItemStyle}
                      >
                        <Typography>
                          <b>{Membership.ActivityDescription}</b>
                        </Typography>
                        <Typography>{Membership.SessionDescription}</Typography>
                        <Typography>{Membership.ParticipationDescription}</Typography>
                      </Link>
                    ) : (
                      <div style={membershipItemStyle}>
                        <Typography>
                          <b>{Membership.ActivityDescription}</b>
                        </Typography>
                        <Typography>{Membership.SessionDescription}</Typography>
                        <Typography>{Membership.ParticipationDescription}</Typography>
                      </div>
                    )}
                  </ListItem>
                </List>
              </Grid>
              <Grid container xs={4} alignItems="center">
                {this.props.network === 'online' && (
                  <Grid container direction="column">
                    <Grid item align="center">
                      <Switch
                        onChange={() => {
                          this.handleChangeMembershipPrivacy(Membership);
                        }}
                        checked={!Membership.Privacy}
                      />
                    </Grid>

                    <Grid item align="center">
                      <Typography style={toggleTextStyle}>
                        {Membership.Privacy ? 'Private' : 'Public'}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {/* CONTENT TWO (Activity Picture) */}
            <Grid
              container
              xs={cardContentLengths.contentTwo.xs}
              sm={cardContentLengths.contentTwo.sm}
              md={cardContentLengths.contentTwo.md}
              lg={cardContentLengths.contentTwo.lg}
              xl={cardContentLengths.contentTwo.xl}
              className="my-profile-info-card-info-two"
              alignItems="center"
            >
              {/* A link to the activity is only available if the user is online */}
              {this.props.network === 'online' ? (
                <Link
                  className="gc360-link"
                  to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                  style={membershipItemStyle}
                >
                  <img src={Membership.ActivityImagePath} alt="" className="active" />
                </Link>
              ) : (
                <div style={membershipItemStyle}>
                  <img src={Membership.ActivityImagePath} alt="" />
                </div>
              )}
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
      // If the Involvement is some kind of Private group (ejj.g. scholarship group etc. - AKA Private) it is False.
    } else {
      myProfileInvolvementsList = (
        <div>
          <Grid container alignItems="center" justify="center" className="my-profile-info-card">
            {/* CONTENT ONE (Activity Text and Privacy) */}
            <Grid
              container
              xs={cardContentLengths.contentOne.xs}
              sm={cardContentLengths.contentOne.sm}
              md={cardContentLengths.contentOne.md}
              lg={cardContentLengths.contentOne.lg}
              xl={cardContentLengths.contentOne.xl}
              justify="center"
              alignItems="center"
              className="my-profile-info-card-info-one"
            >
              <Grid container xs={8} alignItem="center">
                <List>
                  <ListItem className="my-profile-info-card-info-one-text">
                    {/* A link to the activity is only available if the user is online */}
                    {this.props.network === 'online' ? (
                      <Link
                        className="gc360-link"
                        to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                        style={membershipItemStyle}
                      >
                        <Typography>
                          <b>{Membership.ActivityDescription}</b>
                        </Typography>
                        <Typography>{Membership.SessionDescription}</Typography>
                        <Typography>{Membership.ParticipationDescription}</Typography>
                      </Link>
                    ) : (
                      <div style={membershipItemStyle}>
                        <Typography>
                          <b>{Membership.ActivityDescription}</b>
                        </Typography>
                        <Typography>{Membership.SessionDescription}</Typography>
                        <Typography>{Membership.ParticipationDescription}</Typography>
                      </div>
                    )}
                  </ListItem>
                </List>
              </Grid>

              <Grid container xs={4} alignItems="center">
                {this.props.network === 'online' && (
                  <Grid container>
                    <Grid item xs={12} align="center">
                      <Grid container justify="center">
                        <Grid item>
                          <LockIcon className="lock-icon" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} align="center">
                      <Typography style={toggleTextStyle}>
                        {InvolvementPrivacy ? 'Private' : 'Public'}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {/* CONTENT TWO (Activity Picture) */}
            <Grid
              container
              xs={cardContentLengths.contentTwo.xs}
              sm={cardContentLengths.contentTwo.sm}
              md={cardContentLengths.contentTwo.md}
              lg={cardContentLengths.contentTwo.lg}
              xl={cardContentLengths.contentTwo.xl}
              className="my-profile-info-card-info-two"
              alignItems="center"
            >
              {/* A link to the activity is only available if the user is online */}
              {this.props.network === 'online' ? (
                <Link
                  className="gc360-link"
                  to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                  style={membershipItemStyle}
                >
                  <img src={Membership.ActivityImagePath} alt="" className="active" />
                </Link>
              ) : (
                <div style={membershipItemStyle}>
                  <img src={Membership.ActivityImagePath} alt="" />
                </div>
              )}
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
    }

    return <div>{myProfileInvolvementsList}</div>;
  }
}

MyProfileActivityList.propTypes = {
  Membership: PropTypes.shape({
    ActivityDescription: PropTypes.string.isRequired,
    ActivityImagePath: PropTypes.string.isRequired,
    SessionDescription: PropTypes.string.isRequired,
    ActivityCode: PropTypes.string,
    Participation: PropTypes.string,
    ParticipationDescription: PropTypes.string,
    GroupAdmin: PropTypes.bool,
  }).isRequired,
};
