import type { ReactNode } from 'react';
import './DemoColumns.css';

const DemoColumns: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="demo-columns">{children}</div>
);

export default DemoColumns;
