import { CreditSpreadGridB, type CreditSpreadRow } from './CreditSpreadGridB';
import type { Meta, StoryObj } from '@storybook/react-vite';
import mockRows from './data/mock-credit.json';

const meta = {title: 'CreditSpreadGridB', component: CreditSpreadGridB} satisfies Meta<typeof CreditSpreadGridB>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {args: {rows: [] }};

const rows = mockRows as CreditSpreadRow[];
export const Populated: Story = { args: { rows } };
