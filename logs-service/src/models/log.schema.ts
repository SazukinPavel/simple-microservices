import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {

  @Prop()
  level: string

  @Prop({ type: Object })
  data: any

  @Prop({ type: Object })
  stack: any

  @Prop()
  context: String

  @Prop({ default: Date.now() })
  ts: number
}

export const LogSchema = SchemaFactory.createForClass(Log);