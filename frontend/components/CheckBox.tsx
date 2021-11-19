import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox';
import styled from 'styled-components';
import '@reach/checkbox/styles.css';

interface CheckboxProps {
	checked?: boolean;
	className?: string;
	label: string;
	onChange: () => void;
}

export default function CheckBox({ checked, label, onChange, className }: CheckboxProps) {
	return (
		<StyledLabel className={`flex items-center cursor-pointer ${className}`}>
			<CustomCheckboxContainer
				className={`border p-[1px] rounded shadow-md`}
				onChange={onChange}
				checked={checked}
			>
				<CustomCheckboxInput />
			</CustomCheckboxContainer>
			{label && <span className="opacity-70 font-light text-sm">{label}</span>}
		</StyledLabel>
	);
}

const StyledLabel = styled.label`
	[data-reach-custom-checkbox-container] {
		height: 1.28rem;
		width: 1.28rem;
		margin-right: 0.5rem;
		cursor: pointer;

		&:focus-within,
		& > [data-focus] {
			box-shadow: none;
		}

		&:focus-within,
		&:focus-visible {
			outline: none;
		}
	}

	[data-reach-custom-checkbox-container][data-state='checked'] {
		&::before {
			position: absolute;
			left: 0;
			top: 49%;
			height: 45%;
			width: 1.5px;
			background-color: #999999;
			content: '';
			transform: translateX(7px) translateY(-2px) rotate(-45deg);
			transform-origin: left bottom;
		}

		&::after {
			position: absolute;
			left: 0;
			bottom: 1px;
			height: 2px;
			width: 81%;
			background-color: #999999;
			content: '';
			transform: translateX(7px) translateY(-2px) rotate(-53deg);
			transform-origin: left bottom;
		}
	}

	[data-reach-custom-checkbox-container][data-state='unchecked'] {
		background: transparent;
	}
`;
