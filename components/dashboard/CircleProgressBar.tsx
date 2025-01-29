const CircleProgressBar = ({ progress }: { progress: number }) => {
	const radius = 50;
	const stroke = 10;
	const circunference = 2 * Math.PI * radius;

	// Ensure `progress` is a valid number and falls within the 0-100 range
	const validProgress =
		typeof progress === "number" && !isNaN(progress) ? progress : 0;
	const strokeDashoffset =
		circunference - (validProgress / 100) * circunference;

	return (
		<div className="flex justify-center items-center">
			<svg width={120} height={120} className="rotate-90">
				<circle
					cx="60"
					cy="60"
					r={radius}
					stroke="#e6e6e6"
					strokeWidth={stroke}
					fill="none"
				/>
				<circle
					cx="60"
					cy="60"
					r={radius}
					stroke="#FF8800"
					strokeWidth={stroke}
					strokeDasharray={circunference}
					strokeDashoffset={strokeDashoffset}
					fill="none"
					className="transition-all duration-500"
				/>
			</svg>
			<span className="absolute text-2xl">{progress}%</span>
		</div>
	);
};

export default CircleProgressBar;
