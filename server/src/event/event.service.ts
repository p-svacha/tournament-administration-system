import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { Repository } from 'typeorm';
import { EventModel } from './dto/event.model';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async findAllEvents(): Promise<EventModel[]> {
    const events: EventEntity[] = await this.eventRepository.find();
    return events.map((event) => new EventModel(event));
  }

  async findEventById(id: number): Promise<EventModel> {
    const event = await this.eventRepository.findOne({
      where: { id: id },
    });

    if (!event) {
      throw Error('Event not found');
    }

    return new EventModel(event);
  }

  async createEvent(input: CreateEventInput): Promise<EventModel> {
    // Create entity
    const event = this.eventRepository.create({
      name: input.name,
    });

    // Save to database
    const newEvent: EventEntity = await this.eventRepository.save(event);

    // Return
    return new EventModel(newEvent);
  }

  async updateEvent(id: number, input: UpdateEventInput): Promise<EventModel> {
    // Find event
    const event = await this.eventRepository.findOne({ where: { id: id } });
    if (!event) {
      throw new Error('Event not found');
    }

    // Update fields
    if (input.name !== undefined) event.name = input.name;

    // Save updated entity to db
    const updatedEvent = await this.eventRepository.save(event);

    // Return updated model
    return new EventModel(updatedEvent);
  }

  async deleteEvent(id: number): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return result.affected != undefined && result.affected > 0;
  }
}
