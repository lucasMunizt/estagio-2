import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendario.css';
import EventosPadrao from './EventosPadrao';
import Modal from '../Modal/Modal';
import Header from '../Header/Header';
import Card from '../Card/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
moment.locale('pt-br'); // Define o locale do moment para português
const localizer = momentLocalizer(moment); // Passa o moment para o localizer

const messages = {
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Dia todo',
    week: 'Semana',
    work_week: 'Semana de trabalho',
    day: 'Dia',
    month: 'Mês',
    previous: 'Anterior',
    next: 'Próximo',
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    today: 'Hoje',
    agenda: 'Agenda',
    Sun: 'Domingo', // Alterado para o dia correto
    Mon: 'Segunda',
    Tue: 'Terça-feira',
    Wed: 'Quarta-feira',
    Thu: 'Quinta-feira',
    Fri: 'Sexta-feira',
    Sat: 'Sábado',
    noEventsInRange: 'Nenhum evento neste período.',
    showMore: total => `+ Ver mais (${total})`
};

const formats = {
    weekdayFormat: (date, culture, localizer) => {
        const day = moment(date).format('ddd'); // Get the full name of the day
        switch (day) {
            case 'Sun':
                return messages.Sun;
            case 'Mon':
                return messages.Mon;
            case 'Tue':
                return messages.Tue;
            case 'Wed':
                return messages.Wed;
            case 'Thu':
                return messages.Thu;
            case 'Fri':
                return messages.Fri;
            case 'Sat':
                return messages.Sat;
            default:
                return day; // Fallback
        }
    },
};

const Calendario = () => {
    const DragAndDropCalendar = withDragAndDrop(Calendar);
    const [eventos, setEventos] = useState(EventosPadrao);
    const [eventoSelecionados, setEventoSelecionados] = useState(null);
 
    

    const eventStyle = (e) => ({
        style: {
            backgroundColor: e.color,
        },
    });

    const MoverEnvetos = (data) => {
        const { start, end } = data;
        const updatedEventos = eventos.map((event) => {
            if (event.id === data.event.id) {
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end),
                };
            }
            return event;
        });
        setEventos(updatedEventos);
    };

    const handleEventOpen = (e) => {
        setEventoSelecionados(e);
    };

    const handleEventClose = () => {
        setEventoSelecionados(null);
    };

    return (
        <div className='tela'>
            <div className="header-barra">
                <Header/>
            </div>
            <div className="container-calendario">
            <div className="toolbar">
                <p>Ferramentas</p>
            </div>
            <div className="calendario">
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView='month'
                    events={eventos}
                    localizer={localizer}  // Certifique-se de passar o localizer corretamente
                    resizable
                    className='calendar'
                    onEventDrop={MoverEnvetos}
                    onEventResize={MoverEnvetos}
                    onSelectEvent={handleEventOpen}
                    eventPropGetter={eventStyle}
                    messages={messages} 
                    formats={formats} // Traduções personalizadas
                    components={{
                        toolbar: CustomToolbar,
                    }}
                />
            </div>
            </div>
                 
            {eventoSelecionados && (
              <Modal
              isOpen={true}
              onClose={handleEventClose}
              nome={eventoSelecionados.title.value}
              descricao={eventoSelecionados.desc}
              calorias={eventoSelecionados.calorias}
              proteinas={eventoSelecionados.proteinas}
              img={eventoSelecionados.img}
              id='butao-fechar-calendario'
              edicaoModal = {true}
              opamen='tes-botao-modal-calendario'
              />
            )}
        </div>
    );
};

const CustomToolbar = ({ label, onView, onNavigate, views }) => {
    const [itemText, setItemText] = useState('Mês');  // Alterado para português

    return (
        <div className="toolbar-container">
            <h1 className='mesAno'>{label}</h1>
            <div className="dirtop">
                <div className='dropdown'>
                    <button
                        type="button"
                        className="btn btn-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        id='dropdownMenuButton'
                        style={{width: '100px'}}
                    >
                        {itemText}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby='dropdownMenuButton'>
                        {views.map((view, index) => (
                            <div key={index}>
                                <li>
                                    <button className='dropdown-item' onClick={() => { 
                                        onView(view); 
                                        setItemText(view === 'month' ? 'Mês' : view === 'week' ? 'Semana' : view === 'day' ? 'Dia' : 'Agenda'); 
                                    }}>
                                        {view === 'month' ? 'Mês' : view === 'week' ? 'Semana' : view === 'day' ? 'Dia' : 'Agenda'}
                                    </button>
                                </li>
                                {index === 2 && <hr className='dropdown-divider'></hr>}
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="toolbar-navegation" style={{ marginLeft: '0px' }}>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('PREV')} style={{ marginLeft: '15px' }}>
                        <i className="bi bi-caret-left"></i>
                    </button>
                    <button className='btn btn-secondary btn-1s mr-2 border-0' 
                    onClick={() => onNavigate('TODAY')} style={{width:'100px'}}>Hoje</button>
                    <button className='btn btn-sm mr-2 text-secondary'
                     onClick={() => onNavigate('NEXT')}>
                        <i className="bi bi-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Calendario;