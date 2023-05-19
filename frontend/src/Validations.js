export default function Validations({ reqsNotMet }) {
	const renderValidations = reqsNotMet.map((description, index) =>
		<li key={index}>
			{description}
		</li>
	);

	return (
		<ul className='validations'>
			{renderValidations}
		</ul>
	);
}