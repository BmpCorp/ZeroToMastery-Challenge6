const convertHexRgb = (str) =>
{
	// Firstly, we find the direction of conversion and check if the input string is valid.
	let hexToRgb;
	if (str.search(/#([0-9A-Fa-f]{3}$|[0-9A-Fa-f]{6}$)/) !== -1) hexToRgb = true;
	else if (str.search(/rgb\(\d{1,3}, *\d{1,3}, *\d{1,3}\)/) !== -1) hexToRgb = false;
	else return "Wrong color format";

	let red, green, blue;
	if (hexToRgb)
	{
		// If HEX string is short-formatted (0xFFF), let's expand it.
		if (str.length === 4)
		{
			str = str[1] + str[1] + str[2] + str[2] + str[3] + str[3];
		}
		else
		{
			str = str.substr(1);
		}
		// Converting HEX using bitwise operators.
		let color = parseInt(str, 16);
		red = (color & 0xFF0000) >> 16;
		green = (color & 0x00FF00) >> 8;
		blue = color & 0x0000FF;
		return `rgb(${red}, ${green}, ${blue})`;
	}
	else
	{
		// Finding and checking RGB values.
		let matches = str.match(/(\d+)/g);
		[red, green, blue] = [matches[0], matches[1], matches[2]];
		// Here, strings are casted to numbers implicitly...
		if (red > 255 || green > 255 || blue > 255) return "Wrong RGB values";
		// But here we have to cast them explicitly.
		let color = (Number(red) << 16) + (Number(green) << 8) + Number(blue);
		return "#" + color.toString(16).toUpperCase().padStart(6, "0");
	}
}