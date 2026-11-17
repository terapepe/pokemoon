import { createRoot } from 'react-dom/client';
import Home from '@/app/page';
import { IS_SINGLE, PRIMARY } from '@/config/chains';

document.body.style.setProperty('--chain', IS_SINGLE ? PRIMARY.color : '#485CFF');
createRoot(document.getElementById('root')).render(<Home />);
