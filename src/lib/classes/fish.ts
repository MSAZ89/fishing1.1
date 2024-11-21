export interface Fish {
	id: number;
	name: string;
	description: string;
	minWeight: number;
	maxWeight: number;
}

export const fishList: Fish[] = [
	{
		id: 1,
		name: 'Salmon',
		description: 'A popular fish known for its pink flesh and rich flavor.',
		minWeight: 2,
		maxWeight: 15
	},
	{
		id: 2,
		name: 'Tuna',
		description: 'A large and fast fish, often used in sushi and sashimi.',
		minWeight: 10,
		maxWeight: 150
	},
	{
		id: 3,
		name: 'Trout',
		description: 'A freshwater fish known for its delicate flavor.',
		minWeight: 1,
		maxWeight: 5
	},
	{
		id: 4,
		name: 'Cod',
		description: 'A versatile white fish often used in fish and chips.',
		minWeight: 2,
		maxWeight: 40
	},
	{
		id: 5,
		name: 'Mackerel',
		description: 'A small, oily fish known for its strong flavor.',
		minWeight: 0.5,
		maxWeight: 3
	},
	{
		id: 6,
		name: 'Herring',
		description: 'A small, oily fish often pickled or smoked.',
		minWeight: 0.2,
		maxWeight: 1.5
	},
	{
		id: 7,
		name: 'Bass',
		description: 'A popular game fish known for its fighting ability.',
		minWeight: 1,
		maxWeight: 10
	},
	{
		id: 8,
		name: 'Catfish',
		description: 'A bottom-dwelling fish known for its whisker-like barbels.',
		minWeight: 1,
		maxWeight: 20
	},
	{
		id: 9,
		name: 'Pike',
		description: 'A predatory fish known for its long, slender body and sharp teeth.',
		minWeight: 2,
		maxWeight: 25
	},
	{
		id: 10,
		name: 'Carp',
		description: 'A large freshwater fish often found in ponds and lakes.',
		minWeight: 2,
		maxWeight: 30
	}
];
