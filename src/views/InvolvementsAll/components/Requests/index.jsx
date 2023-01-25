import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import GordonLoader from 'components/Loader';
import parseISO from 'date-fns/parseISO';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import membershipService from 'services/membership';
import requestService from 'services/request';
import RequestSent from './components/RequestSent';
import RequestReceived from './components/RequestsReceived';
import styles from './Requests.module.css';

const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [requestsSent, setRequestsSent] = useState([]);
  const [involvementsLeading, setInvolvementsLeading] = useState([]);
  const { profile } = useUser();

  useEffect(() => {
    membershipService
      .getLeaderPositions(profile.AD_Username)
      .then(setInvolvementsLeading)
      .then(() => setLoading(false));
    requestService.getSentMembershipRequests().then(setRequestsSent);
  }, [profile]);

  const handleCancelRequest = (request) => {
    setRequestsSent((prevRequestsSent) => prevRequestsSent.filter((r) => r !== request));
  };

  let content;
  if (loading) {
    content = <GordonLoader />;
  } else if (involvementsLeading?.length > 0) {
    content = (
      <>
        <CardHeader title="Membership Requests" className={styles.requests_header} />

        <CardContent>
          <Accordion>
            <AccordionSummary
              aria-controls="received-requests-content"
              expandIcon={<ExpandMore style={{ color: 'white' }} />}
              className={styles.requests_header}
            >
              <Typography variant="h6">Requests Received</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column' }}>
              {involvementsLeading.map((involvement) => (
                <RequestReceived
                  key={involvement.ActivityCode + involvement.SessioinCode}
                  involvement={involvement}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              aria-controls="sent-requests-content"
              expandIcon={<ExpandMore style={{ color: 'white' }} />}
              className={styles.requests_header}
            >
              <Typography variant="h6">Requests Sent</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container align="right" direction="row">
                {requestsSent?.length > 0 ? (
                  requestsSent
                    .sort((a, b) => parseISO(b.DateSent) - parseISO(a.DateSent))
                    .map((request) => (
                      <RequestSent
                        member={request}
                        key={request.RequestID}
                        onCancel={handleCancelRequest}
                      />
                    ))
                ) : (
                  <Typography variant="h6">You haven't sent any requests</Typography>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </>
    );
  } else if (requestsSent?.length > 0) {
    content = (
      <>
        <Accordion defaultExpanded>
          <AccordionSummary
            aria-controls="received-requests-content"
            expandIcon={<ExpandMore style={{ color: 'white' }} />}
            className={styles.requests_header}
          >
            <CardHeader
              title="Membership Requests"
              className={styles.requests_header}
              style={{ padding: 0 }}
            />
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: 'column' }}>
            <CardContent>
              <Grid container align="right" direction="row">
                {requestsSent?.length > 0 ? (
                  requestsSent
                    .sort((a, b) => parseISO(b.DateSent) - parseISO(a.DateSent))
                    .map((request) => (
                      <RequestSent
                        member={request}
                        key={request.RequestID}
                        onCancel={handleCancelRequest}
                      />
                    ))
                ) : (
                  <Typography variant="h6">You haven't sent any requests</Typography>
                )}
              </Grid>
            </CardContent>
          </AccordionDetails>
        </Accordion>
      </>
    );
  } else {
    // otherwise hide component entirely since we have no requests
    return null;
  }

  return (
    <Grid item xs={12} lg={8}>
      <Card className={styles.requests}>{content}</Card>
    </Grid>
  );
};

export default Requests;