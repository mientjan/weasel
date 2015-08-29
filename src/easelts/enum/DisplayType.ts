/**
 * @enum ValueType
 */
const enum DisplayType {
	UNKNOWN = 1 << 0,
	STAGE = 1 << 1,
	CONTAINER = 1 << 2,
	DISPLAYOBJECT = 1 << 3,
	SHAPE = 1 << 4,
	GRAPHICS = 1 << 5,
	MOVIECLIP = 1 << 6,
	BITMAP = 1 << 7,
	BITMAPVIDEO = 1 << 8,
	TEXTURE = 1 << 8,
}

export = DisplayType;