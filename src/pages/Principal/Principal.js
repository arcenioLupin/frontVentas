import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Prueba from '../Prueba/Prueba';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BuildIcon from '@material-ui/icons/Build';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import TableChartIcon from '@material-ui/icons/TableChart';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import Configuracion from '../Configuracion/Configuracion';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 524,
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Inventarios" icon={<PlaylistAddCheckIcon />} {...a11yProps(0)} />
        <Tab label="Activos" icon={<AccountBalanceIcon />} {...a11yProps(1)}  />
        <Tab label="Operaciones" icon={<BuildIcon />} {...a11yProps(2)}  />
        <Tab label="Recursos Humanos" icon={<SupervisedUserCircleIcon />} {...a11yProps(3)}  />
        <Tab label="Maestros" icon={<TableChartIcon />} {...a11yProps(4)} />
        <Tab label="Configuración" icon={<PermDataSettingIcon />} {...a11yProps(5)}  />
      </Tabs>
      <TabPanel value={value} index={0}>
         <Prueba />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
      Item Six
      </TabPanel>
      <TabPanel value={value} index={5}>
       <Configuracion />
      </TabPanel>
    </div>
  );
}
