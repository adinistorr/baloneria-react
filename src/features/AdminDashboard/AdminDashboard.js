import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import AddUpdateCalendarEvents from './CalendarEvents/AddUpdateCalendarEvents';
import {useContext} from 'react';
import {FirebaseContext} from '../../utils/firebase/FirebaseContext';
import {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

export default function AdminDashboard() {
    const firebase = useContext(FirebaseContext);
    const db = firebase.firestore();

    const history = useHistory();
    const location = useLocation();

    const [show, setShow] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        if (new URLSearchParams(location.search).get('id') || new URLSearchParams(location.search).get('date')) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [location]);

    useEffect(() => {
        let unsub = db.collection('calendarEvents').onSnapshot(res => {
            const eventList = [];
            res.forEach(doc => {
                eventList.push({id: doc.id, ...doc.data()});
            });
            setCalendarEvents(eventList);
        });
        return unsub;
    }, [db]);

    const handleDateClick = e => {
        history.push(`/admin?date=${e.startStr}`);
        // setShow(true);
    };

    const handleEventClick = e => {
        history.push(`/admin?id=${e.event.id}`);
        // setShow(true);
    };

    return (
        <>
            <AddUpdateCalendarEvents show={show} setShow={setShow} />

            <FullCalendar
                timeZone="Europe/Bucharest"
                themeSystem="bootstrap"
                select={handleDateClick}
                selectable="true"
                eventClick={handleEventClick}
                plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={calendarEvents}
            />
        </>
    );
}
