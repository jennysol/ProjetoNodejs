import { Router } from 'express';
import  { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

//Método Get
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository (AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

//Método Post
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment =  await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch(err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
