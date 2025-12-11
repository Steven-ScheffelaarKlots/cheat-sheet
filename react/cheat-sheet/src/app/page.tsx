import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Auto-discover all route directories
async function getRoutes() {
  const appDir = path.join(process.cwd(), 'src/app');
  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  
  const routes = entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('_') && entry.name !== 'pages')
    .filter(entry => {
      // Check if directory has a page.tsx
      const pagePath = path.join(appDir, entry.name, 'page.tsx');
      return fs.existsSync(pagePath);
    })
    .map(entry => ({
      path: `/${entry.name}`,
      name: entry.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }));
  
  return routes;
}

export default async function Home() {
  const routes = await getRoutes();
  
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React Cheat Sheet Examples</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Standalone React examples for learning and reference
      </p>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {routes.map(route => (
            <li key={route.path} style={{ marginBottom: '15px' }}>
              <Link 
                href={route.path}
                style={{ 
                  fontSize: '18px',
                  color: '#4A90E2',
                  textDecoration: 'none',
                  display: 'block',
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
