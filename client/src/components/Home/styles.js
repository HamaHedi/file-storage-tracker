import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: 350,
  },
  bar: {
    width: 250,
  },
  media: {
    height: 80,
  },
  image: {
    color: 'white',
    borderRadius: 15,
    height: 40,
    width: 40,
  },
  box: {
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),

    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
  card: {
    width: 250,
    height: 130,
  },
}));
