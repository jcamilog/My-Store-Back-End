import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Company extends Document {
    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true, unique: true})
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
    internationalDeliveries: boolean;

    @Prop({required: true})
    isActive: boolean;
}
export const CompanySchema = SchemaFactory.createForClass(Company);