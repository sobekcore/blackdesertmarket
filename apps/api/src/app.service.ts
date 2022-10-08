import { Injectable } from '@nestjs/common';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';

@Injectable()
export class AppService {
  getExampleItem(): BlackDesertItem {
    return {
      id: 5600,
      name: 'Weeds',
      count: 7836,
      grade: 0,
      price: 5300,
    };
  }
}
