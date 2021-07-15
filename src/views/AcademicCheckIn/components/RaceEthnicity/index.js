import { gordonColors } from 'theme';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import info from './info.json';

const RaceEthnicity = ({ demographic, handleChangeDemographic, handleCheckDemographic }) => {
  const cyan = gordonColors.primary.cyan;
  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1}>
      <Grid item style={{ color: cyan }}>
        <Typography variant="h5" gutterBottom>
          Step 4: Provide Your Race and Ethnicity
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" align="center" gutterBottom>
          <b>{info.header}</b>
        </Typography>
        <Typography variant="body1" gutterBottom>
          {info.para1}
        </Typography>
        <br />
        <Typography variant="body1">
          The first question asks students to designate ethnicity as either:{' '}
        </Typography>
        <ul>
          <li>Hispanic or Latino OR</li>
          <li>Not Hispanic or Latino</li>
        </ul>
        <br />
        <Typography variant="body1" gutterBottom>
          {info.para2}
        </Typography>
        <br />
        <Typography variant="body1">
          The second question asks individuals to indicate one or more races that apply from the
          following (you can select multiple categories):{' '}
        </Typography>
        <ul>
          <li>
            American Indian or Alaska Native (Having origins in any of the original peoples of North
            and South America, including Central America)
          </li>

          <li> Asian</li>
          <li>Black or African American</li>
          <li> Native Hawaiian or Other Pacific Islander </li>
          <li>
            White (Having origins in any of the original peoples of Europe, North Africa, or the
            Middle East)
          </li>
        </ul>
        <br />
        <Typography variant="subtitle1" gutterBottom>
          Please provide/confirm the following information:
        </Typography>
        <br />
      </Grid>
      <Grid container direction="row">
        <FormControl>
          <FormLabel component="legend">Ethnicity:</FormLabel>
          <RadioGroup
            aria-label="ethnicity"
            name="ethnicity"
            value={demographic.ethnicity}
            onChange={handleChangeDemographic}
          >
            <FormControlLabel value={-2} control={<Radio />} label="Not Hispanic/Latino" />
            <FormControlLabel value={-1} control={<Radio />} label="Hispanic/Latino" />
            <FormControlLabel value={-3} control={<Radio />} label="Prefer not to say" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel component="legend">Race:</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.nativeAmerican}
                name="nativeAmerican"
                onChange={handleCheckDemographic}
              />
            }
            label="American Indian or Alaska Native"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.asian}
                name="asian"
                onChange={handleCheckDemographic}
              />
            }
            label="Asian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.black}
                name="black"
                onChange={handleCheckDemographic}
              />
            }
            label="Black or African American"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.hawaiian}
                name="hawaiian"
                onChange={handleCheckDemographic}
              />
            }
            label="Native Hawaiian or Other Pacific Islander"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.white}
                name="white"
                onChange={handleCheckDemographic}
              />
            }
            label="White"
          />
          <FormControlLabel
            control={
              <Checkbox checked={demographic.none} name="none" onChange={handleCheckDemographic} />
            }
            label="Prefer not to say"
          />
        </FormControl>
      </Grid>
      <Typography variant="subtitle1" gutterBottom>
        <b>
          {info.subtext}
          <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>.
        </b>
      </Typography>
    </Grid>
  );
};

export default RaceEthnicity;
