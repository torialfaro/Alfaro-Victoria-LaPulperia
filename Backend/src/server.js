import crearApp from './app.js';
import { Messages } from './enums/Messages.js';

const PORT = process.env.PORT || 3000;

crearApp().listen(PORT, () => console.log(`${Messages.SERVER_RUNNING} ${PORT}`));
