import * as jwt from 'jsonwebtoken';
import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { AuthService } from '../auth/auth.service';
import { UserPayload } from '../auth/interfaces/user-payload.interface';
import { ResourcesService } from './resources.service';
import { UsersService } from '../users/users.service';
import { switchMap } from 'rxjs/operators';

@WebSocketGateway(8080)
export class ResourcesGateway implements OnGatewayConnection {
  constructor(
    private readonly authService: AuthService,
    private readonly resourcesService: ResourcesService,
    private readonly usersService: UsersService,
  ) {}

  handleConnection(client) {
    this.validateQueryToken(client);
  }

  @SubscribeMessage('start')
  handleReadyEvent(client, data): Observable<any> {
    return interval(3000).pipe(
      switchMap(_ => this.sendRandomResource(client)),
    );
  }

  async sendRandomResource(client) {
    const payload = this.validateQueryToken(client);
    if (!payload) {
      return undefined;
    }
    const resourceWithAmount = await this.resourcesService.getRandomResource();
    await this.usersService.addResourceToUserById(payload.id, resourceWithAmount);

    const { resource, amount } = resourceWithAmount;
    return { event: 'resource', data: { name: resource.name, value: amount } };
  }

  validateQueryToken(client): UserPayload | null {
    if (!client || !client.handshake) return null;

    const { query } = client.handshake;
    if (!query.access_token) {
      client.disconnect();
      return null;
    }
    return this.authService.validateToken(query.access_token);
  }
}
