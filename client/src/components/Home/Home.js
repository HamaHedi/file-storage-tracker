import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Box from '@material-ui/core/Box';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import Divider from '@material-ui/core/Divider';
import { LinearProgress } from '@material-ui/core';
import { getAllFiles, getLatestFiles } from '../../redux/actions/uploadsAction';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import { getAllArchived } from '../../redux/actions/archivedAction';
import { getAllStarred } from '../../redux/actions/starredAction';
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);
const defaultProps = {
  bgcolor: '#f44336',
  borderRadius: 15,
  m: 1,

  style: { width: '5rem', height: '5rem' },
};
const defaultProps2 = {
  bgcolor: '#005df4',
  borderRadius: 15,
  m: 1,

  style: { width: '5rem', height: '5rem' },
};
const defaultProps3 = {
  bgcolor: '#009b00',
  borderRadius: 15,
  m: 1,

  style: { width: '5rem', height: '5rem' },
};
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
function imageStockProgress(file) {
  var imageTaille = 0;
  file.map((allFiles) => {
    if (allFiles.type.substring(0, allFiles.type.indexOf('/')) === 'image') {
      imageTaille = imageTaille + allFiles.size;
    }
  });

  return imageTaille;
}

function videoStockProgress(file) {
  var videoTaille = 0;

  file.map((allFiles) => {
    if (allFiles.type.substring(0, allFiles.type.indexOf('/')) === 'video') {
      videoTaille = videoTaille + allFiles.size;
    }
  });

  return videoTaille;
}
function fileStockProgress(file) {
  var filleTaille = 0;
  file.map((allFiles) => {
    if (
      allFiles.type.substring(0, allFiles.type.indexOf('/')) === 'application'
    ) {
      filleTaille = filleTaille + allFiles.size;
    }
  });

  return filleTaille;
}
const columns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const extension = tableMeta.rowData[3].substring(
          0,
          tableMeta.rowData[3].indexOf('/')
        );

        return (
          <div>
            {(() => {
              if (extension === 'image') {
                return (
                  <div>
                    {' '}
                    <ImageOutlinedIcon color='primary' /> {value}
                  </div>
                );
              } else if (extension === 'video') {
                return (
                  <div>
                    <VideoLibraryOutlinedIcon /> {value}
                  </div>
                );
              } else {
                return (
                  <div>
                    {' '}
                    <FileCopyOutlinedIcon color='secondary' /> {value}
                  </div>
                );
              }
            })()}
          </div>
        );
      },
    },
  },
  {
    name: 'createdAt',
    label: 'Created Date',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        var date = new Date(value);

        return (
          <div>
            <Typography>{date.toLocaleString()}</Typography>
          </div>
        );
      },

      filter: true,
      sort: true,
    },
  },
  {
    name: 'size',
    label: 'Size',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <Typography>{formatBytes(value)}</Typography>
          </div>
        );
      },
      filter: true,
      sort: true,
    },
  },
  {
    name: 'type',
    label: 'type',
    options: {
      filter: false,
      sort: false,
      display: 'excluded',
    },
  },
];

const options = {
  elevation: 6,
  filter: true,
  filterType: 'textField',
  responsive: 'stacked',
  tableBodyHeight: '100%',
  rowsPerPageOptions: [5],
  selectableRowsHideCheckboxes: true,
};
const Home = (props) => {
  const classes = useStyles();
  const files = props.files;
  const history = useHistory();
  const latestFiles = props.latestFile;
  const starreds = props.starreds;
  const archiveds = props.archiveds;

  useEffect(() => {
    props.getFiles();
    props.latestFiles();
    props.getStarredFiles();
    props.getArchivedFiles();
  }, [latestFiles]);

  return (
    <>
      <Box className={classes.box} flexDirection='row' display='flex'>
        <Box className={classes.box} display='flex'>
          <Card className={classes.root} elevation={6}>
            <CardActionArea>
              <CardContent>
                <Box
                  {...defaultProps}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <FileCopyOutlinedIcon
                    className={classes.image}
                    color='inherit'
                  ></FileCopyOutlinedIcon>
                </Box>

                <Typography variant='h5' color='textSecondary' component='p'>
                  Documents
                </Typography>
                <Divider />
              </CardContent>
              <Box p={2}>
                <BorderLinearProgress
                  className={classes.bar}
                  variant='determinate'
                  value={(fileStockProgress(files) / 10737418240) * 100}
                />
                <Box display='flex' flexDirection='row'>
                  <Box p={1}>
                    <Typography variant='h4'>
                      {((fileStockProgress(files) / 10737418240) * 100).toFixed(
                        2
                      )}
                      %
                    </Typography>{' '}
                  </Box>
                  <Box p={1}>
                    {' '}
                    <Typography>
                      {' '}
                      {formatBytes(fileStockProgress(files))} of 10gb Used
                    </Typography>{' '}
                  </Box>
                </Box>
              </Box>
            </CardActionArea>
            <Box
              className={classes.box}
              flexDirection='row'
              display='flex'
            ></Box>
          </Card>
        </Box>
        <Box className={classes.box} display='flex'>
          <Card className={classes.root} elevation={6}>
            <CardActionArea>
              <CardContent>
                <Box
                  {...defaultProps2}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <ImageOutlinedIcon
                    className={classes.image}
                    color='inherit'
                  ></ImageOutlinedIcon>
                </Box>

                <Typography variant='h5' color='textSecondary' component='p'>
                  Images
                </Typography>
                <Divider />
              </CardContent>
              <Box p={2}>
                <BorderLinearProgress
                  className={classes.bar}
                  variant='determinate'
                  value={(imageStockProgress(files) / 10737418240) * 100}
                />
                <Box display='flex' flexDirection='row'>
                  <Box p={1}>
                    <Typography variant='h4'>
                      {(
                        (imageStockProgress(files) / 10737418240) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>{' '}
                  </Box>
                  <Box p={1}>
                    {' '}
                    <Typography>
                      {' '}
                      {formatBytes(imageStockProgress(files))} of 10gb Used
                    </Typography>{' '}
                  </Box>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Box>
        <Box className={classes.box} display='flex'>
          <Card className={classes.root} elevation={6}>
            <CardActionArea>
              <CardContent>
                <Box
                  {...defaultProps3}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <VideoLibraryOutlinedIcon
                    className={classes.image}
                    color='inherit'
                  ></VideoLibraryOutlinedIcon>
                </Box>

                <Typography variant='h5' color='textSecondary' component='p'>
                  Videos
                </Typography>
                <Divider />
              </CardContent>
              <Box p={2}>
                <BorderLinearProgress
                  className={classes.bar}
                  variant='determinate'
                  value={(videoStockProgress(files) / 10737418240) * 100}
                />
                <Box display='flex' flexDirection='row'>
                  <Box p={1}>
                    <Typography variant='h4'>
                      {(
                        (videoStockProgress(files) / 10737418240) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>{' '}
                  </Box>
                  <Box p={1}>
                    {' '}
                    <Typography>
                      {' '}
                      {formatBytes(videoStockProgress(files))} of 10gb Used
                    </Typography>{' '}
                  </Box>
                </Box>
              </Box>
            </CardActionArea>
          </Card>{' '}
        </Box>
      </Box>

      <Box>
        <Typography variant='h2'>Recents Files</Typography>
      </Box>
      <Divider variant='inset' />

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper elevation={0} className={classes.paper}>
            {' '}
            <Box className={classes.box}>
              <MUIDataTable
                title='Recents added Files'
                data={latestFiles}
                columns={columns}
                options={options}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>
            <Card elevation={6} className={classes.card}>
              <CardActionArea
                onClick={() => {
                  history.push('/starred');
                }}
              >
                <CardContent>
                  <Box display='flex' flexDirection='row'>
                    <Box>
                      <Box
                        {...defaultProps2}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      >
                        <StarBorderRoundedIcon
                          fontSize='large'
                          className={classes.image}
                          color='inherit'
                        ></StarBorderRoundedIcon>
                      </Box>
                    </Box>
                    <Box p={3}>
                      <Typography color='textSecondary'>
                        {starreds.length} Starred
                      </Typography>
                      Go to view
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <Card elevation={6} className={classes.card}>
              <CardActionArea
                onClick={() => {
                  history.push('/archived');
                }}
              >
                <CardContent>
                  <Box display='flex' flexDirection='row'>
                    <Box>
                      <Box
                        {...defaultProps}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      >
                        <ArchiveRoundedIcon
                          fontSize='large'
                          className={classes.image}
                          color='inherit'
                        ></ArchiveRoundedIcon>
                      </Box>
                    </Box>
                    <Box p={3}>
                      <Typography color='textSecondary' component='p'>
                        {archiveds.length} Archived
                      </Typography>
                      Go to view
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  const uploadsReduces = 'file';
  const starredReducers = 'starred';
  const archivedReducers = 'archived';
  return {
    files: state[uploadsReduces].files,
    latestFile: state[uploadsReduces].latestFile,
    starreds: state[starredReducers].starred,
    archiveds: state[archivedReducers].archived,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStarredFiles: () => dispatch(getAllStarred()),
  getFiles: () => dispatch(getAllFiles()),
  latestFiles: () => dispatch(getLatestFiles()),
  getArchivedFiles: () => dispatch(getAllArchived()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
