import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {DataGrid} from '@material-ui/data-grid';
import * as PropTypes from 'prop-types';


const useStyles = makeStyles(() => ({
    mainWrapper: {
        width: '100%',
    },
    wrapper: {
        display: 'flex',
        height: '100%',
    },
    root: {
        flexGrow: 1,
        '& > div': {
            height: '100% !important',
        },
    },
}));

const CustomDataGridContainer = ({rows, columns, className, pageSize}) => {

    const classes = useStyles();
    pageSize = !pageSize ? 25 : pageSize;

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.wrapper}>
                <div className={classes.root}>
                    <DataGrid rows={rows} columns={columns} pagination pageSize={pageSize} showToolbar autoHeight columnBuffer={2} disableSelectionOnClick={true} className={className}/>
                </div>
            </div>
        </div>
    );
};

CustomDataGridContainer.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array.isRequired,
    className: PropTypes.string,
    pageSize: PropTypes.number,
};

export default CustomDataGridContainer;