import { createRoot } from 'react-dom/client'
import { useRoute, useLocation } from 'wouter'
import './styles.css'
import { Logo } from '@pmndrs/branding'
import { App } from './App'

function Root() {
  const [, params] = useRoute('/item/:id')
  const [, params1] = useRoute('/item/:id/:id')
  const [, setLocation] = useLocation()

  // Function to navigate to the parent level
  const handleBackClick = () => {
    // Get the current location path
    const currentPath = window.location.pathname;

    // Split the current path into segments and remove the last segment
    const pathSegments = currentPath.split('/').filter(Boolean);

    // If there are more than one segment, join the segments to form the higher level path
    if (pathSegments.length > 1) {
      pathSegments.pop(); // Remove the last segment
      const parentPath = `/${pathSegments.join('/')}`;
      setLocation(parentPath); // Navigate to the parent path
    } else {
      setLocation('/'); // If no parent, navigate to the root
    }
  }

  return (
    <>
      <App />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px', color: 'white' }}>
          Huu Khiem Nguyen
          <br />
          pmnd.rs dev collective
        </a>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px', color: 'white' }}>
          14/02/2025
        </div>
        <a
          style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px', color: 'white' }}
          href="#"
          onClick={handleBackClick}
        >
          {params || params1 ? '< back' : 'double click to enter portal'}
        </a>

        {/* Footer Instructions */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '13px',
            color: 'white',
            textAlign: 'center',
            maxWidth: '300px',
          }}
        >
          <p>
            Hold the left mouse button and scroll around to explore.
            <br />
            Zoom in and out using the scroll wheel or touch pad.
          </p>
        </div>
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
