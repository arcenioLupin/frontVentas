import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Empresas from './Empresas';
import Regimen from './Regimen';
import Usuarios from './Usuarios';
import Perfil from './Perfil';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs 
             value={value} onChange={handleChange} aria-label="simple tabs example"
             >
          <Tab label="Empresas" {...a11yProps(0)} />
          <Tab label="Régimen Laboral" {...a11yProps(1)} />
          <Tab label="Usuarios" {...a11yProps(2)} />
          <Tab label="Perfil de Usuarios" {...a11yProps(3)} />
          <Tab label="Tipo de Documento" {...a11yProps(4)} />
          <Tab label="Rubro" {...a11yProps(5)} />
          <Tab label="Unidad de Medida" {...a11yProps(6)} />
          <Tab label="Tipo de Movimiento" {...a11yProps(7)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Empresas />
      </TabPanel>
      <TabPanel value={value} index={1}>
         <Regimen />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Usuarios />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Perfil />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Tipo de Documento
      </TabPanel>
      <TabPanel value={value} index={5}>
        Rubro
      </TabPanel>
      <TabPanel value={value} index={6}>
        Unidad de Medida
      </TabPanel>
      <TabPanel value={value} index={7}>
        Tipo de Movimiento
      </TabPanel>
    </div>
  );
}