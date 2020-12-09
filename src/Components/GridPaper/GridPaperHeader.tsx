import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gridPaperBoxTop: {
        borderRadius: "15px 15px 0 0",
        backgroundColor: theme.palette.primary.dark,
        minHeight: 7,
        marginBottom: 15
    },
}));

interface GridPaperHeaderProps
{
    style?: React.CSSProperties,
}

export const GridPaperHeader: React.FC<GridPaperHeaderProps> = (props) => {

    const classes = useStyles();

    return(
        <Box style={props.style} className={classes.gridPaperBoxTop}>
            {props.children}
        </Box>
    );
}

export default GridPaperHeader;