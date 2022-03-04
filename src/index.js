import './style.css';
import Application from './components/app';
import {
  alertElement,
  submitButton,
} from './components/utils';
import showAlert from './components/animations';

const application = new Application();
application.initialize();

submitButton.addEventListener('click', (e) => showAlert(e).then(() => alertElement.classList.remove('.alert')));
