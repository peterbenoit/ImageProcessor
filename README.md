# ImageProcessor Library

A lightweight JavaScript library for advanced image processing in the browser. Supports a variety of filters, transformations, and watermarks.

## Features

-   Apply filters like grayscale, sepia, invert, brightness, contrast, blur, saturation, hue rotation, and opacity.
-   Perform transformations such as rotation, cropping, and resizing.
-   Add text or image watermarks with customizable positions, repeats, and angles.
-   Lazy loading, crossorigin, decoding, and referrer policy support.
-   Event hooks for processing start, completion, and errors.
-   Supports multiple images and batch processing.
-   Wrap processed images in customizable HTML elements (e.g., div, section) with specified class lists.

## Getting Started

### Installation

Include the `ImageProcessor.js` script in your HTML file:

```html
<script src="path/to/ImageProcessor.js"></script>
```

### Usage

#### Basic Usage

To apply basic filters and transformations:

```javascript
new ImageProcessor('https://example.com/image.jpg', {
    width: 400,
    height: 300,
    grayscale: 'grayscale(100%)',
    brightness: 'brightness(3)',
    altText: 'Processed image',
    targetElement: document.getElementById('image-target'),
});
```

#### Advanced Usage with Watermark

To add a watermark to an image:

```javascript
new ImageProcessor('https://example.com/image.jpg', {
    watermark: 'Confidential',
    watermarkPosition: 'center',
    watermarkStyle: {
        fontSize: '20px',
        fontFamily: 'Arial',
        color: 'rgba(255, 255, 255, 0.5)',
    },
    targetElement: document.getElementById('image-target'),
});
```

#### More Examples can be found on CodePen

[ImageProcessor.js on CodePen](https://codepen.io/peterbenoit/pen/XWLOmpj)

### Options

-   **width**: Width of the processed image.
-   **height**: Height of the processed image.
-   **cropX, cropY, cropWidth, cropHeight**: Crop dimensions.
-   **grayscale, sepia, invert**: Image filters.
-   **brightness, contrast, blur, saturation, hueRotate, opacity**: More image filters.
-   **rotate**: Rotate the image by a certain degree.
-   **watermark**: Text or image URL for the watermark.
-   **watermarkPosition**: Position of the watermark.
-   **watermarkRepeat**: How the watermark is repeated.
-   **watermarkAngle**: Angle of watermark text.
-   **altText**: Alternative text for accessibility.
-   **loading, crossorigin, decoding, referrerPolicy**: Image loading attributes.
-   **wrapperTag**: HTML tag used to wrap the processed image (e.g., div, p).
-   **wrapperClassList**: Class list for the wrapping HTML tag.

### Events

-   **onProcessingStart**: Triggered when image processing starts.
-   **onProcessed**: Triggered when image processing is complete.
-   **onError**: Triggered on errors.

### CODING GUIDE

The [CODING_GUIDE.md](CODING_GUIDE.md) provides comprehensive information on the implementation, and configuration.

### FAQs

See [FAQ.md](FAQ.md) for more information.

## Contributing

Contributions are more than welcome! Please check the [issues](https://github.com/peterbenoit/ImageProcessor/issues) page for open tasks.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Peter Benoit](https://github.com/peterbenoit)
