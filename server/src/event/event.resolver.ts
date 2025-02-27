import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';
import { EventModel } from './dto/event.model';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { TournamentModel } from 'src/tournament/dto/tournament.model';
import { TournamentService } from 'src/tournament/tournament.service';

@Resolver(() => EventModel)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly tournamentService: TournamentService,
  ) {}

  @Query(() => [EventModel!]!)
  async events(): Promise<EventModel[]> {
    return this.eventService.findAllEvents();
  }

  @Query(() => EventModel, { nullable: true })
  async event(@Args('id', { type: () => Int }) id: number): Promise<EventModel> {
    return this.eventService.findEventById(id);
  }

  @ResolveField(() => [TournamentModel!]!)
  async tournaments(@Parent() event: EventModel): Promise<TournamentModel[]> {
    return this.tournamentService.findTournamentsByEventId(event.id);
  }

  @Mutation(() => EventModel!)
  async createEvent(@Args('data', { type: () => CreateEventInput }) data: CreateEventInput): Promise<EventModel> {
    return this.eventService.createEvent(data);
  }

  @Mutation(() => EventModel)
  async updateEvent(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateEventInput }) data: UpdateEventInput,
  ): Promise<EventModel> {
    return this.eventService.updateEvent(id, data);
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.eventService.deleteEvent(id);
  }
}
