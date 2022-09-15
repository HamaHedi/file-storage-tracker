import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Box from '@material-ui/core/Box';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import MUIDataTable from 'mui-datatables';
import useStyles from './styles';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import { getAllFiles } from '../../redux/actions/uploadsAction';

import { starredFile, getAllStarred } from '../../redux/actions/starredAction';
import AlertDialog from '../PopUp/PopUp';
import { connect } from 'react-redux';
import {
  archivedFile,
  getAllArchived,
} from '../../redux/actions/archivedAction';
import Notification from '../Notification';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const options = {
  elevation: 6,
  filter: true,
  filterType: 'textField',
  responsive: 'stacked',
  tableBodyHeight: '100%',

  rowsPerPageOptions: [5, 10, 20],
  selectableRowsHideCheckboxes: true,
  selectableRowsHeader: false,
};
const AllFiles = (props) => {
  const file = props.files;
  const archivedFiles = props.archiveds;
  const starredFiles = props.starreds;

  const classes = useStyles();
  const [openPop, setOpenPop] = useState(false);
  const handleClose = () => {
    setOpenPop(false);
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [starredNum, setStarredNum] = useState(false);
  const [archivedNum, setArchivedNum] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    props.getFiles();
    props.getStarredFiles();
    props.getArchivedFiles();
  }, []);
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
        filter: true,
        sort: true,
        display: 'excluded',
      },
    },
    {
      name: 'Action',
      label: 'Actions',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Tooltip title='Add to favorite' arrow>
                <IconButton
                  onClick={() => {
                    starredFiles.map((AllStarredFiles) => {
                      if (AllStarredFiles.fileID === tableMeta.rowData[5]) {
                        setStarredNum(true);
                      }
                    });
                    if (starredNum === false) {
                      props.AddStarredFile({
                        name: tableMeta.rowData[0],
                        size: tableMeta.rowData[2],
                        type: tableMeta.rowData[3],
                        fileID: tableMeta.rowData[5],
                      });
                      setNotify({
                        isOpen: true,
                        message: 'File Starred successfully',
                      });
                    } else {
                      setText(
                        'File already starred check the starred file page'
                      );
                      setOpenPop(true);
                    }
                  }}
                >
                  <StarBorderRoundedIcon color='secondary' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Add to archive' arrow>
                <IconButton
                  onClick={() => {
                    archivedFiles.map((AllArchivedFiles) => {
                      if (AllArchivedFiles.fileID === tableMeta.rowData[5]) {
                        setArchivedNum(true);
                      }
                    });
                    if (archivedNum === false) {
                      props.AddArchivedFile({
                        name: tableMeta.rowData[0],
                        size: tableMeta.rowData[2],
                        type: tableMeta.rowData[3],
                        fileID: tableMeta.rowData[5],
                      });
                      setNotify({
                        isOpen: true,
                        message: 'File Archived successfully',
                      });
                    } else {
                      setText(
                        'File already archived check the archived files page'
                      );
                      setOpenPop(true);
                    }
                  }}
                >
                  <ArchiveRoundedIcon color='primary' />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    },
    {
      name: '_id',
      label: 'id',
      options: {
        filter: false,
        sort: false,
        display: 'excluded',
      },
    },
  ];
  return (
    <Box className={classes.box}>
      <MUIDataTable
        title='All Files'
        data={file}
        columns={columns}
        options={options}
      />
      <AlertDialog
        text={text}
        openP={openPop}
        handleClose={handleClose}
      ></AlertDialog>
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  );
};
const mapStateToProps = (state) => {
  const uploadsReduces = 'file';

  const archivedReducers = 'archived';
  const starredReducers = 'starred';
  return {
    files: state[uploadsReduces].files,
    starreds: state[starredReducers].starred,
    archiveds: state[archivedReducers].archived,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStarredFiles: () => dispatch(getAllStarred()),
  getFiles: () => dispatch(getAllFiles()),
  AddStarredFile: (file) => dispatch(starredFile(file)),
  AddArchivedFile: (file) => dispatch(archivedFile(file)),
  getArchivedFiles: () => dispatch(getAllArchived()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllFiles);
