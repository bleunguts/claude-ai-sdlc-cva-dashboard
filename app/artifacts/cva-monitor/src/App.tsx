import { Link, Route, Switch } from 'wouter';
import CvaMonitor from './pages/CvaMonitor';
import CreditSpreads from './pages/CreditSpreads';

export default function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12, padding: '6px 12px' }}>        
        <Link href="/" data-testid="nav-credit">Credit spreads</Link>
        <Link href="/cva" data-testid="nav-cva">CVA monitor</Link>
      </nav>
      <Switch>
        <Route path="/" component={CreditSpreads} />
        <Route path="/cva" component={CvaMonitor} />        
        <Route>Not found</Route>
      </Switch>
    </>
  );
}
