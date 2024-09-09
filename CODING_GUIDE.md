# ImageProcessor Coding Guide

## Introduction

The `ImageProcessor` library is a versatile JavaScript tool designed to handle various image transformations and enhancements. This guide outlines the usage of all available options and best practices to ensure optimal use, accessibility, and performance.

## Options Overview

Below is a comprehensive list of all the options available in `ImageProcessor` with descriptions, possible values, and defaults.

| Option              | Type       | Description                                                         | Default             |
| ------------------- | ---------- | ------------------------------------------------------------------- | ------------------- |
| `width`             | `Number`   | Target width for the output image.                                  | `null`              |
| `height`            | `Number`   | Target height for the output image.                                 | `null`              |
| `cropX`             | `Number`   | X-coordinate for cropping the image.                                | `0`                 |
| `cropY`             | `Number`   | Y-coordinate for cropping the image.                                | `0`                 |
| `cropWidth`         | `Number`   | Width for cropping the image.                                       | `null`              |
| `cropHeight`        | `Number`   | Height for cropping the image.                                      | `null`              |
| `grayscale`         | `String`   | Applies grayscale filter (`grayscale(100%)`).                       | `''`                |
| `invert`            | `String`   | Applies color inversion filter (`invert(100%)`).                    | `''`                |
| `sepia`             | `String`   | Applies sepia filter (`sepia(100%)`).                               | `''`                |
| `brightness`        | `String`   | Adjusts brightness (`brightness(x)`, where `x` is a multiplier).    | `'brightness(1)'`   |
| `contrast`          | `String`   | Adjusts contrast (`contrast(x)`, where `x` is a multiplier).        | `'contrast(1)'`     |
| `blur`              | `String`   | Applies blur (`blur(x)` where `x` is the blur radius in px).        | `''`                |
| `saturation`        | `String`   | Adjusts saturation (`saturate(x)` where `x` is a multiplier).       | `'saturate(1)'`     |
| `hueRotate`         | `String`   | Adjusts hue rotation (`hue-rotate(x)` where `x` is degrees).        | `''`                |
| `opacity`           | `String`   | Adjusts opacity (`opacity(x)` where `x` is a percentage).           | `'opacity(1)'`      |
| `rotate`            | `Number`   | Rotates the image by the specified degrees.                         | `0`                 |
| `altText`           | `String`   | Alternative text for accessibility.                                 | `'Processed image'` |
| `style`             | `Object`   | Inline styles for the processed image.                              | `{}`                |
| `loading`           | `String`   | Image loading strategy (`'lazy'`, `'eager'`, `'auto'`).             | `'auto'`            |
| `crossorigin`       | `String`   | Cross-origin setting (`'anonymous'`, `'use-credentials'`).          | `'anonymous'`       |
| `decoding`          | `String`   | Decoding method (`'sync'`, `'async'`, `'auto'`).                    | `'auto'`            |
| `referrerPolicy`    | `String`   | Referrer policy (`'no-referrer'`, `'origin'`, etc.).                | `'no-referrer'`     |
| `srcset`            | `String`   | Responsive image sources (`srcset` attribute).                      | `''`                |
| `sizes`             | `String`   | Responsive image sizes (`sizes` attribute).                         | `''`                |
| `outputFormat`      | `String`   | Output image format (`'image/png'`, `'image/jpeg'`).                | `'image/png'`       |
| `quality`           | `Number`   | Image quality for lossy formats (0.0 to 1.0).                       | `0.92`              |
| `watermark`         | `String`   | Text or URL for the watermark.                                      | `null`              |
| `watermarkPosition` | `String`   | Position of the watermark (`'bottom-right'`, `'top-left'`).         | `'bottom-right'`    |
| `watermarkRepeat`   | `String`   | Watermark repetition style (`'no-repeat'`, `'repeat'`, `'cover'`).  | `'no-repeat'`       |
| `watermarkAngle`    | `Number`   | Angle of rotation for the watermark.                                | `0`                 |
| `watermarkStyle`    | `Object`   | Style options for the watermark (font size, color, opacity).        | `{}`                |
| `onProcessingStart` | `Function` | Callback for when processing starts.                                | `() => {}`          |
| `onProcessed`       | `Function` | Callback for when processing completes.                             | `() => {}`          |
| `onError`           | `Function` | Callback for when an error occurs.                                  | `() => {}`          |
| `onClick`           | `Function` | Event handler for image click events.                               | `null`              |
| `onHover`           | `Function` | Event handler for image hover events.                               | `null`              |
| `wrapperTag`        | `String`   | HTML tag to wrap around the processed image (`'div'`, `'p'`, etc.). | `null`              |
| `wrapperClassList`  | `String`   | Class names to apply to the wrapping element.                       | `''`                |

## Accessibility Options

-   **altText**: Always provide meaningful alternative text using the `altText` option to describe the content or function of the image for screen readers.
-   **role**: Set the role of the image to `img` for screen readers to understand it as an image.

## Responsive Use

-   **srcset and sizes**: To provide different resolutions of the same image for various devices, use `srcset` and `sizes`. This ensures the best image is loaded based on the user’s device, improving performance and reducing bandwidth.
-   **loading**: Set the `loading` attribute to `'lazy'` for images not immediately visible in the viewport to improve page load times.

## Proper Defaults and Recommendations

-   **crossorigin**: Defaults to `'anonymous'`. Use `'use-credentials'` if your images are protected or require authentication.
-   **decoding**: Defaults to `'auto'`. Use `'async'` for non-blocking image decoding.
-   **referrerPolicy**: Defaults to `'no-referrer'`. Change this according to your privacy needs or when dealing with third-party services.

## Best Practices

1. **Use Lazy Loading**: Set `loading: 'lazy'` for off-screen images to reduce initial load time.
2. **Optimize Image Formats**: Use `outputFormat: 'image/jpeg'` for photographs and `outputFormat: 'image/png'` for graphics with transparency.
3. **Responsive Images**: Always use `srcset` and `sizes` for better performance on different devices.
4. **Accessibility**: Never omit `altText`. Provide meaningful alternative text for all images.
5. **Event Handling**: Use `onProcessingStart`, `onProcessed`, and `onError` to manage processing states effectively.

## Examples

### Basic Image Processing

```javascript
new ImageProcessor('https://example.com/image.jpg', {
    width: 300,
    height: 200,
    brightness: 'brightness(1.2)',
    altText: 'A brightened image of a sunset.',
});
```

### Responsive Image with Watermark

```javascript
new ImageProcessor('https://example.com/image.jpg', {
    watermark: 'Confidential',
    watermarkPosition: 'bottom-right',
    watermarkStyle: { color: 'rgba(255, 255, 255, 0.5)', fontSize: '18px' },
    srcset: 'image-300w.jpg 300w, image-600w.jpg 600w',
    sizes: '(max-width: 600px) 300px, 600px',
});
```

### Handling Events

```javascript
new ImageProcessor('https://example.com/image.jpg', {
    onProcessingStart: ({ imageUrl }) => console.log(`Processing started for ${imageUrl}`),
    onProcessed: ({ imageUrl }) => console.log(`Processing completed for ${imageUrl}`),
    onError: ({ imageUrl, error }) => console.error(`Error loading image ${imageUrl}: ${error}`),
});
```

## Conclusion

The `ImageProcessor` library offers robust capabilities for processing and enhancing images using JavaScript, supporting accessibility, responsiveness, and custom image handling. This guide provides the essential knowledge to implement `ImageProcessor` effectively in your projects.
