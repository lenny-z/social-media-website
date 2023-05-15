export default function Validations({ reqsNotMet }) {
	const renderValidations = reqsNotMet.map(description =>
		<li>
			{description}
		</li>
	);

	return (
		<ul className='validations'>
			{renderValidations}
		</ul>
	);
}