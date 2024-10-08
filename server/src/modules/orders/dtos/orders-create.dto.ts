import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';
import { Order } from '../entities/order.entity';
import { OrderItemOption } from '../entities/order-item.entity';

@ArgsType()
export class CreateOrderItemArgs {
	@Field(() => Number)
	dishId: number;

	@Field(() => [OrderItemOption], { nullable: true })
	options?: OrderItemOption[];
}

@ArgsType()
export class CreateOrdersArgs {
	@Field(() => Number)
	restaurantId: number;

	@Field(() => [CreateOrderItemArgs])
	items: CreateOrderItemArgs[];
}

@ObjectType()
export class CreateOrdersData {
	@Field(() => Order)
	order: Order;
}

@ObjectType()
export class CreateOrdersOutput extends CoreOutput<CreateOrdersData> {
	@Field(() => CreateOrdersData, { nullable: true })
	data?: CreateOrdersData;
}
