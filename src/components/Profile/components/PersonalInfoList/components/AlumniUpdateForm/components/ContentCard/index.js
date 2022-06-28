import { Grid, Card, CardContent, CardHeader } from '@material-ui/core/';
import styles from './ContentCard.module.css';

const ContentCard = (props) => {
  return (
    <Card>
      <CardHeader className={styles.update_header} title={props.title} />
      <CardContent>
        hi
        <Grid container>{props.children}</Grid>
      </CardContent>
    </Card>
  );
};

export { ContentCard };
