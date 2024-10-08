import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '@/shared/modules/entities/core.entity';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';

@ObjectType()
export class OrderItemOption {
	@Field(() => String)
	name: string;

	@Field(() => String, { nullable: true })
	choice: string;
}

@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
	@Field(() => RestaurantDish)
	@ManyToOne(() => RestaurantDish, { nullable: true, onDelete: 'CASCADE' })
	dish: RestaurantDish;

	@Field(() => [OrderItemOption], { nullable: true })
	@Column({ type: 'json', nullable: true })
	options?: OrderItemOption[];
}
