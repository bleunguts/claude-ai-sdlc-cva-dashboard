import { CvaGrid, type CvaRow } from './CvaGrid';
import type { Meta, StoryObj } from '@storybook/react-vite';
import mockRows from './data/mock-data.json';
import { ErrorBoundary } from './components/error-boundary';

const meta = {title: 'CvaGrid', component: CvaGrid} satisfies Meta<typeof CvaGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {args: {rows: [] }};

const rows = mockRows as CvaRow[];
export const Populated: Story = { args: { rows } };

export const RenderError: Story = {
    decorators: [(Story) => <ErrorBoundary><Story/></ErrorBoundary>],
    args: { rows: null as unknown as CvaRow[] }
};
