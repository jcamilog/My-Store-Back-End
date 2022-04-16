import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Company extends Document {
    @Prop({required: true})
    name: string;

    @Prop({required: true,})
    nit: string;

    @Prop()
    direction: string;

    @Prop({required: true})
    country: string;

    @Prop({required: true})
    image: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    internationalDeliveries: boolean
}
export const CompanySchema = SchemaFactory.createForClass(Company);