
# Coding Guide for `ImageProcessor`

This guide provides details on configuring the `ImageProcessor` class and explains the available variables, their types, and recommended default values. This guide aims to ensure consistent usage and better understanding of how to work with the `ImageProcessor` library.

## Variables and Their Configurations

Below are the details for each configuration option available in the `ImageProcessor` class:

### 1. Dimensions and Cropping

- **`width`**: Defines the width of the output image.
  - **Type**: `number`
  - **Default**: `null` (uses the original image width)

- **`height`**: Defines the height of the output image.
  - **Type**: `number`
  - **Default**: `null` (uses the original image height)

- **`cropX`**: X-coordinate for cropping.
  - **Type**: `number`
  - **Default**: `0`

- **`cropY`**: Y-coordinate for cropping.
  - **Type**: `number`
  - **Default**: `0`

- **`cropWidth`**: Width for cropping.
  - **Type**: `number`
  - **Default**: `null` (no cropping)

- **`cropHeight`**: Height for cropping.
  - **Type**: `number`
  - **Default**: `null` (no cropping)

### 2. Filters and Effects

- **`grayscale`**: Applies a grayscale filter to the image.
  - **Type**: `string`
  - **Default**: `''` (no grayscale)
  - **Example**: `'grayscale(100%)'`

- **`invert`**: Inverts the colors of the image.
  - **Type**: `string`
  - **Default**: `''` (no inversion)
  - **Example**: `'invert(100%)'`

- **`sepia`**: Applies a sepia filter to the image.
  - **Type**: `string`
  - **Default**: `''` (no sepia)
  - **Example**: `'sepia(100%)'`

- **`brightness`**: Adjusts the brightness of the image.
  - **Type**: `string`
  - **Default**: `'brightness(1)'` (no change)
  - **Example**: `'brightness(2)'`

- **`contrast`**: Adjusts the contrast of the image.
  - **Type**: `string`
  - **Default**: `'contrast(1)'` (no change)
  - **Example**: `'contrast(2)'`

- **`blur`**: Applies a blur effect to the image.
  - **Type**: `string`
  - **Default**: `''` (no blur)
  - **Example**: `'blur(5px)'`

- **`saturation`**: Adjusts the saturation of the image.
  - **Type**: `string`
  - **Default**: `'saturate(1)'` (no change)
  - **Example**: `'saturate(2)'`

### 3. Image Output

- **`outputFormat`**: Specifies the output format of the processed image.
  - **Type**: `string`
  - **Default**: `'image/png'`
  - **Options**: `'image/png'`, `'image/jpeg'`, `'image/webp'`

- **`quality`**: Defines the quality of the output image (only applicable for formats like JPEG).
  - **Type**: `number`
  - **Default**: `0.92`
  - **Range**: `0` (lowest) to `1` (highest)

### 4. Watermarking

- **`watermark`**: Can be a text or image URL to overlay as a watermark.
  - **Type**: `string`
  - **Default**: `null`

- **`watermarkPosition`**: Position of the watermark on the image.
  - **Type**: `string`
  - **Default**: `'bottom-right'`
  - **Options**: `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`

- **`watermarkRepeat`**: Determines whether the watermark should be repeated across the image.
  - **Type**: `string`
  - **Default**: `'no-repeat'`
  - **Options**: `'repeat'`, `'cover'`, `'no-repeat'`

- **`watermarkAngle`**: Angle of rotation for the watermark.
  - **Type**: `number`
  - **Default**: `0`

- **`watermarkStyle`**: Styling options for text watermarks.
  - **Type**: `object`
  - **Default**: `{ fontSize: '24px', fontFamily: 'Arial', color: 'rgba(255, 255, 255, 0.5)', opacity: 0.5 }`

### 5. Additional Settings

- **`crossorigin`**: Specifies the cross-origin attribute.
  - **Type**: `string`
  - **Default**: `'anonymous'`
  - **Options**: `'anonymous'`, `'use-credentials'`

- **`loading`**: Specifies image loading strategy.
  - **Type**: `string`
  - **Default**: `'auto'`
  - **Options**: `'auto'`, `'lazy'`, `'eager'`

- **`decoding`**: Defines how the image should be decoded.
  - **Type**: `string`
  - **Default**: `'auto'`
  - **Options**: `'auto'`, `'sync'`, `'async'`

- **`referrerPolicy`**: Sets the referrer policy for the image.
  - **Type**: `string`
  - **Default**: `'no-referrer'`
  - **Options**: `'no-referrer'`, `'origin'`, `'unsafe-url'`

### Example Configuration

Below is an example configuration for initializing an `ImageProcessor`:

```js
new ImageProcessor('https://example.com/image.jpg', {
    width: 400,
    height: 300,
    grayscale: 'grayscale(100%)',
    watermark: 'Confidential',
    watermarkPosition: 'bottom-right',
    quality: 0.8
});
```

This guide should be followed to ensure consistent and efficient use of the `ImageProcessor` class.
