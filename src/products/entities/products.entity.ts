import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Category } from './../entities/category.entity';
import { Company } from '../../company/entities/company.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, index: true, required: true  })
  price: number;

  @Prop({ type: Number, required: true  })
  stock: number;

  @Prop({ required: true })
  image: string;
  
  @Prop({ required: true, type: Types.ObjectId, ref: Company.name  })
  idCompany: Company |  Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: Category.name })
  idCategory: Category |  Types.ObjectId;
  

  @Prop({ type: Number, required: true  })
  qualification: number;
  
}
export const ProductSchema = SchemaFactory.createForClass(Product);