import { CreditSpreadGrid, type CreditRow } from './CreditSpreadGrid';
import type { Meta, StoryObj } from '@storybook/react-vite';
import mockRows from './data/mock-credit.json';

const meta = {title: 'CreditSpreadGrid', component: CreditSpreadGrid} satisfies Meta<typeof CreditSpreadGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {args: {rows: [] }};

const rows = mockRows as CreditRow[];
export const Populated: Story = { args: { rows } };
