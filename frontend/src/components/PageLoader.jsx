import Spinner from './Spinner.jsx';

export default function PageLoader({ width = '' }) {
  return (
    <div className={`page page-container ${width}`.trim()}>
      <div className="page__state">
        <Spinner />
      </div>
    </div>
  );
}
