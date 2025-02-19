import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function MultiSelect(
	options: string[],
	value: string,
	onChange: (value: string) => void
) {
	return (
		<Select onValueChange={onChange} defaultValue={value}>
			<SelectTrigger className="px-3 py-1 bg-gray-200 text-sm rounded-md">
				<SelectValue placeholder={value} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option} value={option}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
