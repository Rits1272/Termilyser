/*global chrome*/
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

var tablink; 
function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet} >•</span>;



  var sumdata;
  const [listing, setList] = useState([]);
  const [point, setPoint] = useState();
  const [fraud, setFraud] = useState();

  function setData(res){
    console.log("jkjkhjkhjkhj",res);
    setList(res['summary']);
    setPoint(res['point']);
    setFraud(res['fraud']);
    console.log(listing)
  }

  var fo = new FormData();
  console.log("WORKIGN")
  fo.append('url',"https://www.business-standard.com/terms-conditions")
  fetch("http://localhost:5000/news",
  {
    method: "POST",
    body: fo
  })
  .then(resp => resp.json())
  .then(res => setData(res))
  .catch(err => console.log(err))

  // const listing = [
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  // ]
if (listing.length > 0)
{
  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography variant="h5" component="h2">
          T&C frictionless
        </Typography>
        {fraud ? <Alert severity="error">{point}</Alert>  
         : <Alert severity="success" style={{fontSize:"20px",marginTop: "20px"}} align="left">All's Good</Alert>}
        <Paper elevation={3} style={{padding:"20px"}} >
        <Typography variant="h5" component="h2" align="left">
          Summary
          <br/><br/>
        </Typography>
        {listing.map(listi => 
        <Typography variant="body2" component="p" align="justify">
          {bull}{" "}{listi}
        </Typography>
        )}
          </Paper>
      </CardContent>
    </Card>
  );
        }
        return <div>Loading</div>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SimpleCard/>
      </header>
    </div>
  );
}

export default App;
