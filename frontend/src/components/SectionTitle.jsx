import './SectionTitle.css';

export default function SectionTitle({ as: Tag = 'h2', color = 'wine', id, className = '', children }) {
  return (
    <Tag id={id} className={`section-title section-title--${color} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
