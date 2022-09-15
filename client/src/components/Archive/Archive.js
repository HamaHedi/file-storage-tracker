import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Box from '@material-ui/core/Box';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MUIDataTable from 'mui-datatables';
import useStyles from './styles';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {
  getAllArchived,
  deleteArchivedFiles,
} from '../../redux/actions/archivedAction';
import { connect } from 'react-redux';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const options = {
  elevation: 1,
  filter: true,
  filterType: 'textField',
  responsive: 'stacked',
  tableBodyHeight: '100%',

  rowsPerPageOptions: [5, 10, 20],
  selectableRowsHideCheckboxes: true,
  selectableRowsHeader: false,
};
const Archive = (props) => {
  const classes = useStyles();
  const archivedFiles = props.archiveds;

  useEffect(() => {
    props.getArchivedFiles();
  }, []);
  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const extension = tableMeta.rowData[5].substring(
            0,
            tableMeta.rowData[5].indexOf('/')
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
      name: 'Action',
      label: 'Actions',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Tooltip title='Delete' arrow>
                <IconButton
                  onClick={() => {
                    props.deleteArchive(tableMeta.rowData[4]);
                  }}
                >
                  <DeleteForeverRoundedIcon
                    color='secondary'
                    fontSize='large'
                  />
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
    {
      name: 'type',
      label: 'type',
      options: {
        filter: true,
        sort: true,
        display: 'excluded',
      },
    },
  ];
  return (
    <Box className={classes.box}>
      <MUIDataTable
        title='Archived Files'
        data={archivedFiles}
        columns={columns}
        options={options}
      />
    </Box>
  );
};
const mapStateToProps = (state) => {
  const archivedReducers = 'archived';

  return {
    archiveds: state[archivedReducers].archived,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArchivedFiles: () => dispatch(getAllArchived()),
  deleteArchive: (id) => dispatch(deleteArchivedFiles(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Archive);
