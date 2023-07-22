import Font from '../enums/Font';
import Point from './Point';
import Size from './Size';
import ResText from '../modules/ResText';

const gameScreen = mp.game.graphics.getScreenActiveResolution(0, 0);

export const Screen = {
	width: gameScreen.x,
	height: gameScreen.y,

	ResolutionMaintainRatio: () => {
		const screenw = gameScreen.x;
		const screenh = gameScreen.y;
		const ratio = screenw / screenh;
		const width = 1080.0 * ratio;

		return new Size(width, 1080.0);
	},

	getMousePosition: (relative: boolean = false) => {
		const res = Screen.ResolutionMaintainRatio();
		const cursor = mp.gui.cursor.position;
		let [mouseX, mouseY] = [cursor[0], cursor[1]];
		if (relative) [mouseX, mouseY] = [cursor[0] / res.Width, cursor[1] / res.Height];
		return [mouseX, mouseY];
	},

	IsMouseInBounds: (topLeft: Point, boxSize: Size) => {
		const [mouseX, mouseY] = Screen.getMousePosition();
		return (
			mouseX >= topLeft.X &&
			mouseX <= topLeft.X + boxSize.Width &&
			(mouseY > topLeft.Y && mouseY < topLeft.Y + boxSize.Height)
		);
	},

	GetTextWidth: (text: string, font: Font, scale: number) => {
		// Start by requesting the game to start processing a width measurement
		mp.game.ui.setTextEntryForWidth('CELL_EMAIL_BCON'); // THREESTRINGS
		// Add the text string
		ResText.AddLongString(text);

		// Set the properties for the text
		mp.game.ui.setTextFont(font);
		mp.game.ui.setTextScale(1.0, scale);

		// Ask the game for the relative string width
		const width: number = mp.game.ui.getTextScreenWidth(true);
		// And return the literal result
		const res = Screen.ResolutionMaintainRatio();
		return res.Width * width;
	},
	   
	GetLineCount: (text: string, position: Point, font: Font, scale: number, wrap: number) => {
		// Tell the game that we are going to request the number of lines
		mp.game.ui.setTextGxtEntry('CELL_EMAIL_BCON'); // THREESTRINGS
		// Add the text that has been sent to us
		ResText.AddLongString(text);

		// Get the resolution with the correct aspect ratio
		const res: Size = Screen.ResolutionMaintainRatio();
		// Calculate the x and y positions
		const x: number = position.X / res.Width;
		const y: number = position.Y / res.Height;

		// Set the properties for the text
		mp.game.ui.setTextFont(font);
		mp.game.ui.setTextScale(1.0, scale);

		// If there is some text wrap to add
		if (wrap > 0) {
			// Calculate the wrap size
			const start: number = position.X / res.Width;
			const end: number = start + (wrap / res.Width);
			// And apply it
			mp.game.ui.setTextWrap(x, end);
		}

		// Finally, return the number of lines being made by the string
		return mp.game.invoke('0x9040DFB09BE75706', x, y); // _GET_TEXT_SCREEN_LINE_COUNT
	}
};
