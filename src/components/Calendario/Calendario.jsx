import React, { useEffect, useState } from 'react';
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
import Refeicao from '../../telas/Refeicao';

import { json, useNavigate } from 'react-router-dom';
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
    Wednesday: 'Quarta-feira',
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
    const [dadosUsuario, setDadosUsuario] = useState(JSON.parse(localStorage.getItem('user'))); 
    let start = moment().clone().startOf('month').format('YYYY-MM-DD')
    let end = moment().clone().endOf('month').format('YYYY-MM-DD')
    const navigate1 = useNavigate();


     const fetchEventos = async () =>{
     
        try{
            const response = await fetch(`http://localhost:3000/meal/${dadosUsuario[0].user_id}/${start}/${end}`);
            if(!response.ok){
                throw new Error('Não foi possível carregar os eventos');
            }
            const data = await response.json()
            
            const eventosFormatados = data.map(evento => ({
                id: evento.meal_id,              
                title: evento.name,             
                start: new Date(evento.start_date), 
                end: new Date(evento.end_date),        
                calories: evento.calories,            
                fat: evento.fat,                      
                carbohydrates: evento.carbohydrates,  
                sodium: evento.sodium,            
                fiber: evento.fiber,              
                protein: evento.protein,          
                color: evento.name === "Café Da Manhã" ? "green" : evento.name === "Almoço" ? "#3174AD" : evento.name === "Merenda" ? "#311579" : "red",
                quantidade: evento.amount
            }));
            
            setEventos(eventosFormatados)
            console.log(eventosFormatados)
        }catch(error){
            console.error(error);
        }
     }   

     useEffect(()=>{
        fetchEventos();
     },[])

    const eventStyle = (e) => ({
        style: {
            backgroundColor: e.color,
        },
    });

    const MoverEnvetos = (data) => {
        const { start_date, end_date } = data;
        const updatedEventos = teste.map((event) => {
            if (event.food_id === data.event.id) {
                return {
                    ...event,
                    start: new Date(start_date),
                    end: new Date(end_date),
                };
            }
            return event;
        });
        setEventos(updatedEventos);
    };

    const handleEventOpen = (e) => {
        setEventoSelecionados(e);
    
        navigate1('/refeicao', { 
            state: { 
                meal_id: e.id, 
                title: e.title 
            } 
        });
    };

    const handleEventClose = () => {
        setEventoSelecionados(null);
    };

    return (
        <div className='tela'>
            <div className="header-barra">
                <Header
                inputQuantidade={true}
                valor='Adicione Alimento'
                />
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
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('PREV')} style={{ marginLeft: '15px',marginTop:'18px' }}>
                        <i className="bi bi-caret-left"></i>
                    </button>
                    <button className='btn btn-secondary btn-1s mr-2 border-0' 
                    onClick={() => onNavigate('TODAY')} style={{width:'100px',height:'40px',marginTop:'18px'}}>Hoje</button>
                    <button className='btn btn-sm mr-2 text-secondary'
                     style={{marginTop:'15px'}}
                     onClick={() => onNavigate('NEXT')}>
                        <i className="bi bi-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Calendario;