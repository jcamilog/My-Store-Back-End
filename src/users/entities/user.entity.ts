import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Company } from '../../company/entities/company.entity';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true, type: Types.ObjectId, ref: Company.name })
    idCompany: Company | Types.ObjectId;

}
export const UserSchema = SchemaFactory.createForClass(User);