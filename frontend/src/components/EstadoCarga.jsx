import Alert from './Alert.jsx';
import Button from './Button.jsx';
import Spinner from './Spinner.jsx';

export default function EstadoCarga({ cargando, error, onReintentar }) {
  if (cargando) {
    return (
      <div className="page__state">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <Alert
        action={
          <Button variant="outline" size="sm" onClick={onReintentar}>
            Reintentar
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }
  return null;
}
