import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Log } from '@common/log';

export type LogDocument = HydratedDocument<LogEntity>;

@Schema()
export class LogEntity implements Log {
  @Prop()
  level: string;

  @Prop({ type: Object })
  data: any;

  @Prop({ type: Object })
  stack: any;

  @Prop()
  context: String;

  @Prop({ default: Date.now() })
  ts: number;
}

export const LogSchema = SchemaFactory.createForClass(LogEntity);
