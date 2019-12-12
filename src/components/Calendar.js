import React, { Component } from 'react';
import moment from 'moment';
import range from '../utils/range';
import _ from 'lodash';
import Alert from '../components/Alert';


class Calendar extends Component {
  constructor(props) {
    super(props);

      const lsNewEvent = [];
      this.props.currentEvent.forEach((entry)=>{
        let objNew = {};
        let date = entry.fechProinicio.split(' ')[0];
        let from = entry.fechProinicio.split(' ')[1];
        let to = entry.fechProfin.split(' ')[1];
        objNew = Object.assign({},entry);
        objNew = Object.assign(objNew, { date, from, to });
        lsNewEvent.push(objNew);
      });

    this.state = {
      newEvent: lsNewEvent,
      divSelected: '',
      disabledHours: [],
      futuraAsignacion:'',
      blockedEvents: [],
      listahoraExcepcion:[],
      eventos: this.props.eventosProgramados,
      alertSuccessOpen:false,
    };

    this.selectHour = this.selectHour.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  closeAlertSuccess = () => this.setState({ alertSuccessOpen: false });

  componentWillReceiveProps(props) {


    let futuraAsignacion = moment();
    for (let i = 1; i <= props.asignacionFutura; i += 1) {
      futuraAsignacion = moment(futuraAsignacion).add('1', 'days');
    }


    const blockedEvents = [];
    props.eventosProgramados.forEach((event) => {
      const blockedDate = event.fechProinicio.split(' ')[0];
      let blockedFrom = event.fechProinicio.split(' ')[1];
      const blockedFromFin = event.fechProfin.split(' ')[1];
      do {
        blockedEvents.push(...[blockedDate, `${blockedDate} ${blockedFrom}`]);
        blockedFrom = moment(blockedFrom, 'HH:mm').add(30, 'minutes').format('HH:mm');

      } while (blockedFrom !==  blockedFromFin);
    });

    const disabledCells = document.querySelectorAll('.calendar-body tr .blocked-hour');
    const cells = [...disabledCells].map(c => parseInt(c.getAttribute('index'), 10));
    const disabled = [];
    const disabledCellsIndex = [...new Set(cells)];
    disabledCellsIndex.forEach((cell) => {
      disabled.push(range(cell - ((2 * this.props.rangoHora) - 1), cell));
    });

    let he = props.horaExcepcion[0];// 12
    const arryHe = [];
    arryHe.push(he);
    do {
      if (he.substring(3, 5) === '30') {
        he = `${+he.substring(0, 2) + 1}:00`;
        arryHe.push(he);
      } else {
        he = `${he.substring(0, 2)}:30`;
        arryHe.push(he);
      }
    } while (he !== props.horaExcepcion[1]);// 13

    this.setState({
      disabledHours: [].concat(...disabled),
      blockedEvents,
      eventos: props.eventosProgramados,
      futuraAsignacion: futuraAsignacion.format('YYYY/MM/DD'),
      listahoraExcepcion: arryHe.filter(value => value !== props.horaExcepcion[1]),
    });
  }


  selectHour(e) {

    const oldSelected = this.state.divSelected;
    const allRowsLength = document.querySelectorAll('.calendar-body tr').length;
    if (oldSelected !== '') {
      oldSelected.removeAttribute('style');
      oldSelected.classList.add('calendar-emptyDrop');
    }

    const divSelected = e.target;
    const from = divSelected.getAttribute('from');

    const to = `${(+from.split(':')[0] + +this.props.rangoHora)}:${from.split(':')[1]}`;
    const day = divSelected.getAttribute('day');
    const week = divSelected.getAttribute('week');
    const date = divSelected.getAttribute('date');
    const fechProinicio = `${date} ${from}`;
    const fechProfin = `${date} ${to}`;
    const hourIndex = parseInt(divSelected.getAttribute('index'), 10);

    // validacion de corte de día
    let valDate = moment(date,'DD/MM/YYYY');
    // validacion de corte libre
    

  if(this.props.asignacionFutura !== 0){//Se cambia '0' por 0 para que pueda comparar. AVILCA REQ.86528
    if (this.props.valueHoraCorte !== 'false'  ){
      if(moment(valDate).format('YYYYMMDD') === moment(this.state.futuraAsignacion).format('YYYYMMDD')
      && moment().format('HH:mm').replace(':','') > this.props.valueHoraCorte.replace(':','')) {
      this.setState({alertSuccessOpen:true});
      }else{
        this.setState({alertSuccessOpen:false});
      }
    }
  }

    // cuando es una programación masiva con misma fecha todos deberían, volver hacer reprogramados
    // y sin la reprogramación es por pedido solo eso deberia volver hacer programado
    // const eventos = this.state.eventos.filter(({ codPlanEntrVehi }) => codPlanEntrVehi !== this.state.newEvent.codPlanEntrVehi);

    const eventos = _.differenceBy( this.state.eventos,this.state.newEvent, 'codPlanEntrVehi');

    let eventosActuales;
    if (this.props.maxEntregasTipo === 'D') {
      eventosActuales = eventos.filter(({ fechProinicio }) => fechProinicio.startsWith(date))
                               .map(evento => evento.pedidos.length)
                               .reduce((a, b) => a + b, 0);
    } else if (this.props.maxEntregasTipo === 'S') {
      eventosActuales = eventos.filter(({ fechProinicio }) => this.props.week
                                 .indexOf(fechProinicio.substring(0, 5))>=0)
                               .map(evento => evento.pedidos.length)
                               .reduce((a, b) => a + b, 0);
    }

     let valueAdicionales= 0;
     let valueObjet = {};

     if(this.props.lstAdicionales.length>0){
       valueObjet = this.props.lstAdicionales.filter(({fecExceAdic}) =>  moment(fecExceAdic).format('YYYY/MM/DD') ===  moment(fechProinicio).format('YYYY/MM/DD') );
       if(valueObjet){
         valueAdicionales = valueObjet.canUnidAdic;
       }
     }else{
       valueAdicionales = this.props.maxEntregas;
     }


     if (eventosActuales >= valueAdicionales) {
       return;
     }

    if ((allRowsLength) < hourIndex + (this.props.rangoHora * 2) ||
        (this.state.disabledHours.indexOf(hourIndex)>=0)
    ) {


      this.setState({
        divSelected: '',
        newEvent: this.props.currentEvent,
        eventos,
      }, () => this.props.updateParent(this.state.newEvent, eventos,this.state.alertSuccessOpen));
    } else {

          const nuevoEvento = [];

          this.state.newEvent.forEach((entry)=>{
            let objNew = {};
            objNew = Object.assign({},entry);
            objNew = Object.assign(objNew,
              { from, to, day, week, date, fechProinicio, fechProfin }
            );

            nuevoEvento.push(objNew);
          });

      this.setState({
        divSelected,
        newEvent: nuevoEvento,
        eventos,
      }, () => this.props.updateParent(nuevoEvento, eventos,this.state.alertSuccessOpen));
    }
  }

  addEvent(e) {
    const divSelected = e.target;
    const from = divSelected.getAttribute('from');
    const to = `${(+from.split(':')[0] + +this.props.rangoHora)}:${from.split(':')[1]}`;
    const day = divSelected.getAttribute('day');
    const week = divSelected.getAttribute('week');
    const date = divSelected.getAttribute('date');
    const fechProinicio = `${date} ${from}`;
    const fechProfin = `${date} ${to}`;
    const nuevoEvento = [];
    this.props.currentEvent.forEach((entry)=>{
      let objNew = {};
      objNew = Object.assign({},entry);
      objNew = Object.assign(objNew,
        { from, to, day, week, date, fechProinicio, fechProfin }
      );
      nuevoEvento.push(objNew);
    });

    let eventosActuales;
    if (this.props.maxEntregasTipo === 'D') {
      eventosActuales = this.state.eventos
                            .filter(evento => evento.fechProinicio.startsWith(date))
                            .map(evento => evento.pedidos.length)
                            .reduce((a, b) => a + b, 0);
    } else if (this.props.maxEntregasTipo === 'S') {
      eventosActuales = this.state.eventos
                            .filter(evento => this.props.week
                              .indexOf(evento.fechProinicio.substring(0, 5))>=0)
                            .map(evento => evento.pedidos.length)
                            .reduce((a, b) => a + b, 0);
    }


    if (eventosActuales >= this.props.maxEntregas) {
      return;
    }

    this.setState({
      newEvent: nuevoEvento,
      eventos: [...this.props.eventosProgramados, ...nuevoEvento],
    }, () => this.props.updateParent(this.state.newEvent, this.state.eventos,this.state.alertSuccessOpen));


  }


  renderCell(hour, index, day, week, date, holiday, yeardate,hoy,nDia) {


    if (this.props.disabled) {  // validacion de calendario cuando este se encuentra desahabilito
      return (
        <td className='calendar-cell calendar-cell-default-cursor' from={hour} index={index} nDia={nDia}
       />
      );
    }
    if (this.state.listahoraExcepcion.indexOf(hour)>=0) { // validacion de horario de refigerio
      return (
        <td className={`calendar-cell calendar-cell-disable blocked-hour  ${ hoy?'dia-actual-calendar':'' } `} from={hour}  index={index} nDia={nDia} />
      );
    }
    /*
    if (holiday || this.props.feriados.includes(date)) { // valida si el dia se encuentra marcado como dia no laborable
      return <td className=  {`calendar-cell calendar-cell-default-cursor calendar-cell-disable ${ hoy?'dia-actual-calendar':'' } `} from={hour} index={index} nDia={nDia} />;
    }    */
    if (yeardate < this.state.futuraAsignacion) { // valida la asigancion futura.
      return <td className=  {`calendar-cell calendar-cell-default-cursor ${ hoy?'dia-actual-calendar':'' } `} from={hour} index={index}  nDia={nDia} />;
    }


    if (this.state.blockedEvents.indexOf(`${date} ${hour}`)>=0) { // renderisa eventos ya programados

      const fecha = `${date} ${hour}`;
      const eventos = this.state.eventos.filter(({ fechProinicio }) => fechProinicio === fecha);
      const pedidos = eventos.map(evento => evento.pedidos.length).reduce((a, b) => a + b, 0);

      if (pedidos >= this.props.slots) { // programacion en paralelo
        return (
          <td className={` calendar-cell calendar-cell-disable  ${ hoy?'dia-actual-calendar':'' } `} from={hour}  nDia={nDia}>
            <div className='calendar-item calendar-cell-disable' key={index} style={{ height: `${this.props.rangoHora * 200}%` }}>
              <div className='tooltip'>
                {eventos.map(evento => evento.pedidos.map(({ numPedi, chasis }) => <div key={numPedi}>{`${numPedi} - ${chasis}`}</div>))}
              </div>
              <div className='calendar-data' key={index}>
                {eventos.map(({ nomEmpresa }) => <p key={nomEmpresa}>{nomEmpresa}</p>)}
              </div>
              <p className='calendar-seats'>{pedidos}/{this.props.slots}</p>
            </div>
          </td>
        );
      } else if (pedidos > 0 && pedidos < this.props.slots) { // cuando hay programacion de eventos en paralelos disponibles
        return (
          <td className={`calendar-cell ${ hoy?'dia-actual-calendar':'' } `} from={hour}   index={index} nDia={nDia}>
            <div
              className='calendar-item'
              style={{ height: `${this.props.rangoHora * 200}%` }}
            >
              <div className='tooltip'>
                {eventos.map(evento => evento.pedidos.map(({ numPedi, chasis }) => <div key={numPedi}>{`${numPedi} - ${chasis}`}</div>))}
              </div>
              <div className='calendar-data'>
                {eventos.map(({ nomEmpresa }) => <p
                  key={nomEmpresa}
                  onClick={this.addEvent}
                  from={hour}
                  day={day}
                  index={index + 1}
                  week={week}
                  date={date}
                  yeardate={yeardate}
                >{nomEmpresa}</p>)}
              </div>
              <p className='calendar-seats'>{pedidos}/{this.props.slots}</p>
            </div>
          </td>
        );
      } else{
        return (
          <td className={`calendar-cell calendar-cell-disable `} from={hour}  index={index} nDia={nDia} />
        );
      }

    }

    if (this.state.newEvent[0].date === date && this.state.newEvent[0].from === hour) { // programaciones nueva de eventos.
      return (
        <td className={`calendar-cell ${ hoy?'dia-actual-calendar':'' } `} from={hour}   index={index} nDia={nDia}>
          <div
            from={hour}
            day={day}
            index={index + 1}
            week={week}
            className='calendar-item'
            style={{ height: `${this.props.rangoHora * 200}%`, background: '#1d89b8', color: '#FFFFFF' }}
          >
            <div className='tooltip'>
            {this.state.newEvent.map(entry => entry.pedidos.map(({ numPedi, chasis }) => <div key={numPedi}>{`${numPedi} - ${chasis}`}</div>))}
            </div>
            <p className='calendar-data'>{this.state.newEvent[0].nomEmpresa}</p>
            <p className='calendar-seats'>{this.state.newEvent.length}/{this.props.slots}</p>
          </div>
        </td>
      );
    }

    return (
      <td className={`calendar-cell ${ hoy?'dia-actual-calendar':'' } `}  from={hour} index={index}  nDia={nDia}>
        <div
          from={hour}
          day={day}
          index={index}
          className='calendar-item calendar-emptyDrop'
          onClick={this.selectHour}
          week={week}
          date={date}
          yeardate={yeardate}

          evento='click'
        />
      </td>
    );


  }

  render() {
    const { horaFinal, week, date, month } = this.props;
    let { horaInicio } = this.props;
    const hours = [];

    horaInicio = horaInicio.substring(0, 2) * 1;
    while (horaInicio < horaFinal.substring(0, 2) * 1) {
      if (horaInicio < 10) {
        hours.push(`0${horaInicio}:00`, `0${horaInicio}:30`);
      } else {
        hours.push(`${horaInicio}:00`, `${horaInicio}:30`);
      }
      horaInicio += 1;
    }


    let colSpan = 5;

    if(this.props.sabado === "S" || this.props.domingo === "S"){
      colSpan = 6;
    }

    if(this.props.sabado === "S" && this.props.domingo === "S"){
      colSpan = 7;
    }
    return (
      <div className='calendarWrapper'>
        <table className='calendar' lockcol={this.props.daysLocked}>
          <thead className='calendar-head'>
            <tr>
              <th />
              <th colSpan={colSpan}>{month.toUpperCase()}</th>
            </tr>
            <tr>
              <th />
              <th>Lun {week[0]}</th>
              <th>Mar {week[1]}</th>
              <th>Mie {week[2]}</th>
              <th>Jue {week[3]}</th>
              <th>Vie {week[4]}</th>
              {
                  this.props.sabado === "S"?(
                  <th>Sab {week[5]}</th>
                  ):(null)
              }
                {
                  this.props.domingo === "S"?(
                  <th>Dom {week[6]}</th>
                  ):(null)
              }
            </tr>
          </thead>
          <tbody className='calendar-body'>
            {
              hours.map((hour, index) => (
                <tr key={hour}>
                  <td className='calendar-hr'>{hour}</td>
                  {this.renderCell(
                    hour, index, 'lunes',
                    week[0], date[0], false,
                    moment(date[0], 'DD/MM/YYYY').format('YYYY/MM/DD'),
                    (moment().format('YYYY/MM/DD') ===  moment(date[0], 'DD/MM/YYYY').format('YYYY/MM/DD')),1)
                  }
                  {this.renderCell(
                    hour, index, 'martes',
                    week[1], date[1], false,
                    moment(date[1], 'DD/MM/YYYY').format('YYYY/MM/DD'),
                    (moment().format('YYYY/MM/DD') ===  moment(date[1], 'DD/MM/YYYY').format('YYYY/MM/DD')),2)
                  }
                  {this.renderCell(
                    hour, index, 'miercoles',
                    week[2], date[2], false,
                    moment(date[2], 'DD/MM/YYYY').format('YYYY/MM/DD'),
                    (moment().format('YYYY/MM/DD') ===  moment(date[2], 'DD/MM/YYYY').format('YYYY/MM/DD')),3)

                  }
                  {this.renderCell(
                    hour, index, 'jueves',
                    week[3], date[3], false,
                    moment(date[3], 'DD/MM/YYYY').format('YYYY/MM/DD'),
                    (moment().format('YYYY/MM/DD') ===  moment(date[3], 'DD/MM/YYYY').format('YYYY/MM/DD')),4)

                  }
                  {this.renderCell(
                    hour, index, 'viernes',
                    week[4], date[4], false,
                    moment(date[4], 'DD/MM/YYYY').format('YYYY/MM/DD'),
                    (moment().format('YYYY/MM/DD') ===  moment(date[4], 'DD/MM/YYYY').format('YYYY/MM/DD')),5)

                  }
                   {
                    this.props.sabado === "S" ?(
                    this.renderCell(
                    hour, index, 'sabado',
                    week[5], date[5], false,
                    moment(date[5], 'DD/MM/YYYY').format('YYYY/MM/DD'),
                    (moment().format('YYYY/MM/DD') ===  moment(date[5], 'DD/MM/YYYY').format('YYYY/MM/DD')),6)
                    ):null
                  }
                  {
                  this.props.domingo === "S" ?(
                  this.renderCell(
                    hour, index, 'domingo',
                    week[6], date[6], false,
                    moment(date[6], 'DD/MM/YYYY').format('YYYY/MM/DD'),
                    (moment().format('YYYY/MM/DD') ===  moment(date[6], 'DD/MM/YYYY').format('YYYY/MM/DD')),6)
                  ):null
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
        { this.state.alertSuccessOpen &&
          <Alert type='alert-warning' icon='ion-alert-circled' closeAlert={this.closeAlertSuccess}>
            <p>El pedido no se puede programar por el horario de corte establecido, seleccione otra fecha</p>
          </Alert>
        }


      </div>
    );
  }
}

export default Calendar;
