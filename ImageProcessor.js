/**
 * ImageProcessor Library v1.0.1
 * https://github.com/peterbenoit/ImageProcessor
 *
 * A lightweight JavaScript library for advanced image processing in the browser.
 * Supports a variety of filters, transformations, and watermarks.
 *
 * Released under the MIT License.
 *
 * Copyright (c) 2024 Peter Benoit
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @author Peter Benoit
 * @version 1.0.1
 * @license MIT
 */
class ImageProcessor {
    constructor(images, options = {}) {
        this.defaultConfig = {
            width: null,
            height: null,
            cropX: 0,
            cropY: 0,
            cropWidth: null,
            cropHeight: null,
            grayscale: '',
            invert: '',
            sepia: '',
            brightness: 'brightness(1)',
            contrast: 'contrast(1)',
            blur: '',
            saturation: 'saturate(1)',
            hueRotate: '',
            opacity: 'opacity(1)',
            rotate: 0,
            altText: 'Processed image',
            style: {},
            loading: 'auto',
            crossorigin: 'anonymous',
            decoding: 'auto',
            referrerPolicy: 'no-referrer',
            srcset: '',
            sizes: '',
            outputFormat: 'image/png',
            quality: 0.92,
            watermark: null,
            watermarkPosition: 'bottom-right',
            watermarkRepeat: 'no-repeat',
            watermarkAngle: 0,
            watermarkStyle: {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 0.5,
            },
            onProcessingStart: () => {},
            onProcessed: () => {},
            onError: () => {},
            onClick: null,
            onHover: null,
        };

        this.config = { ...this.defaultConfig, ...options };

        if (images) {
            this.processCustomImages(images, this.config);
        } else {
            this.processImagesOnPage();
        }
    }

    processImagesOnPage() {
        const elements = document.querySelectorAll('[data-img]');
        elements.forEach((element) => {
            const imageUrl = element.dataset.img;
            const options = this.extractOptionsFromDataAttributes(element);

            if (element.classList.contains('sensitive-image')) {
                this.processSensitiveImage(element, imageUrl, options);
            } else {
                this.processImage(element, imageUrl, options);
            }
        });
    }

    extractOptionsFromDataAttributes(element) {
        return {
            width: element.dataset.width ? parseInt(element.dataset.width) : null,
            height: element.dataset.height ? parseInt(element.dataset.height) : null,
            cropX: element.dataset.cropX ? parseInt(element.dataset.cropX) : 0,
            cropY: element.dataset.cropY ? parseInt(element.dataset.cropY) : 0,
            cropWidth: element.dataset.cropWidth ? parseInt(element.dataset.cropWidth) : null,
            cropHeight: element.dataset.cropHeight ? parseInt(element.dataset.cropHeight) : null,
            grayscale: element.dataset.grayscale === 'true' ? 'grayscale(100%)' : '',
            sepia: element.dataset.sepia === 'true' ? 'sepia(100%)' : '',
            invert: element.dataset.invert === 'true' ? 'invert(100%)' : '',
            brightness: element.dataset.brightness ? `brightness(${parseFloat(element.dataset.brightness)})` : 'brightness(1)',
            contrast: element.dataset.contrast ? `contrast(${parseFloat(element.dataset.contrast)})` : 'contrast(1)',
            blur: element.dataset.blur ? `blur(${parseFloat(element.dataset.blur)}px)` : '',
            saturation: element.dataset.saturation ? `saturate(${parseFloat(element.dataset.saturation)})` : 'saturate(1)',
            hueRotate: element.dataset.hueRotate ? `hue-rotate(${parseInt(element.dataset.hueRotate)}deg)` : '',
            rotate: element.dataset.rotate ? parseInt(element.dataset.rotate) : 0,
            altText: element.dataset.alt || 'Processed image',
            loading: element.dataset.loading || this.config.loading,
            crossorigin: element.dataset.crossorigin || this.config.crossorigin,
            decoding: element.dataset.decoding || this.config.decoding,
            referrerPolicy: element.dataset.referrerPolicy || this.config.referrerPolicy,
            srcset: element.dataset.srcset || '',
            sizes: element.dataset.sizes || '',
            watermark: element.dataset.watermark || this.config.watermark,
            watermarkPosition: element.dataset.watermarkPosition || this.config.watermarkPosition,
            watermarkRepeat: element.dataset.watermarkRepeat || this.config.watermarkRepeat,
            watermarkAngle: element.dataset.watermarkAngle ? parseInt(element.dataset.watermarkAngle) : this.config.watermarkAngle,
            watermarkStyle: {
                fontSize: element.dataset.watermarkFontSize || this.config.watermarkStyle.fontSize,
                fontFamily: element.dataset.watermarkFontFamily || this.config.watermarkStyle.fontFamily,
                color: element.dataset.watermarkColor || this.config.watermarkStyle.color,
                opacity: element.dataset.watermarkOpacity ? parseFloat(element.dataset.watermarkOpacity) : this.config.watermarkStyle.opacity,
            },
        };
    }

    processSensitiveImage(container, imageUrl, options = {}) {
        const config = { ...this.config, ...options };

        const blurredImg = document.createElement('img');
        blurredImg.src = imageUrl;
        blurredImg.style.filter = 'blur(50px)';
        blurredImg.style.cursor = 'pointer';
        blurredImg.alt = 'Sensitive Image - Click to view';
        blurredImg.loading = config.loading;
        blurredImg.crossOrigin = config.crossorigin;
        blurredImg.decoding = config.decoding;
        blurredImg.referrerPolicy = config.referrerPolicy;

        const clearImg = document.createElement('img');
        clearImg.src = imageUrl;
        clearImg.style.display = 'none';
        clearImg.alt = 'Sensitive Image';
        clearImg.loading = config.loading;
        clearImg.crossOrigin = config.crossorigin;
        clearImg.decoding = config.decoding;
        clearImg.referrerPolicy = config.referrerPolicy;

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `<i class="fa-light fa-eye-slash"></i> Sensitive Image`;

        container.appendChild(blurredImg);
        container.appendChild(clearImg);
        container.appendChild(overlay);

        blurredImg.addEventListener('click', () => {
            blurredImg.style.display = 'none';
            clearImg.style.display = 'block';
            overlay.style.display = 'none';
        });

        clearImg.addEventListener('click', () => {
            clearImg.style.display = 'none';
            blurredImg.style.display = 'block';
            overlay.style.display = 'flex';
        });
    }

    processCustomImages(images, options) {
        if (typeof images === 'string') {
            this.processImageURL(images, options);
        } else if (Array.isArray(images)) {
            images.forEach(img => this.processImageURL(img.url, img.options, img.options.targetElement));
        }
    }

    processImageURL(imageUrl, options = {}, element = null) {
        const {
            width,
            height,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            grayscale,
            invert,
            sepia,
            brightness,
            contrast,
            blur,
            saturation,
            hueRotate,
            opacity,
            rotate,
            targetElement = element,
            altText,
            style,
            loading,
            crossorigin,
            decoding,
            referrerPolicy,
            srcset,
            sizes,
            outputFormat,
            quality,
            watermark,
            watermarkPosition,
            watermarkRepeat,
            watermarkAngle,
            watermarkStyle,
            onProcessingStart,
            onProcessed,
            onError,
            onClick,
            onHover
        } = { ...this.config, ...options };

        onProcessingStart({ imageUrl, targetElement });

        if (!targetElement || !targetElement.parentNode) {
            onError({ imageUrl, error: 'Target element not found', targetElement });
            console.error(`Target element not found or does not exist for URL: ${imageUrl}`);
            return;
        }

        const img = new Image();
        img.crossOrigin = crossorigin;
        img.loading = loading;
        img.decoding = decoding;
        img.referrerPolicy = referrerPolicy;
        img.srcset = srcset;
        img.sizes = sizes;

        img.onerror = () => {
            onError({ imageUrl, error: 'Failed to load image', targetElement });
            console.error(`Failed to load image from URL: ${imageUrl}`);
        };

        img.onload = () => {
            const finalWidth = width || img.width;
            const finalHeight = height || img.height;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = finalWidth;
            canvas.height = finalHeight;

            if (rotate) {
                ctx.translate(finalWidth / 2, finalHeight / 2);
                ctx.rotate((rotate * Math.PI) / 180);
                ctx.translate(-finalWidth / 2, -finalHeight / 2);
            }

            ctx.filter = `
                ${grayscale}
                ${sepia}
                ${invert}
                ${brightness}
                ${contrast}
                ${blur}
                ${saturation}
                ${hueRotate}
                ${opacity}
            `.trim();

            ctx.drawImage(
                img,
                cropX,
                cropY,
                cropWidth || img.width,
                cropHeight || img.height,
                0,
                0,
                finalWidth,
                finalHeight
            );

            if (watermark) {
                if (watermark.startsWith('http')) {
                    const watermarkImg = new Image();
                    watermarkImg.crossOrigin = 'anonymous';
                    watermarkImg.onload = () => {
                        this.drawWatermarkImage(ctx, watermarkImg, finalWidth, finalHeight, watermarkPosition, watermarkRepeat);
                        this.finalizeImage(ctx, outputFormat, quality, targetElement, style, altText, loading, crossorigin, decoding, referrerPolicy, srcset, sizes, onClick, onHover, onProcessed, imageUrl);
                    };
                    watermarkImg.src = watermark;
                } else {
                    this.drawWatermarkText(ctx, watermark, finalWidth, finalHeight, watermarkPosition, watermarkStyle, watermarkRepeat, watermarkAngle);
                    this.finalizeImage(ctx, outputFormat, quality, targetElement, style, altText, loading, crossorigin, decoding, referrerPolicy, srcset, sizes, onClick, onHover, onProcessed, imageUrl);
                }
            } else {
                this.finalizeImage(ctx, outputFormat, quality, targetElement, style, altText, loading, crossorigin, decoding, referrerPolicy, srcset, sizes, onClick, onHover, onProcessed, imageUrl);
            }
        };

        img.src = imageUrl;
    }

    drawWatermarkImage(ctx, watermarkImg, finalWidth, finalHeight, position, repeat) {
        const pattern = ctx.createPattern(watermarkImg, repeat === 'cover' ? 'repeat' : 'no-repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, finalWidth, finalHeight);
    }

    drawWatermarkText(ctx, text, finalWidth, finalHeight, position, style, repeat, angle) {
        ctx.save();
        ctx.font = `${style.fontSize} ${style.fontFamily}`;
        ctx.fillStyle = style.color;
        ctx.globalAlpha = style.opacity;

        if (repeat === 'repeat' || repeat === 'cover') {
            ctx.translate(finalWidth / 2, finalHeight / 2);
            ctx.rotate(angle * (Math.PI / 180));

            for (let x = -finalWidth; x < finalWidth; x += 200) {
                for (let y = -finalHeight; y < finalHeight; y += 100) {
                    ctx.fillText(text, x, y);
                }
            }

            ctx.rotate(-angle * (Math.PI / 180));
            ctx.translate(-finalWidth / 2, -finalHeight / 2);
        } else {
            const x = position.includes('right') ? finalWidth - ctx.measureText(text).width - 10 : 10;
            const y = position.includes('bottom') ? finalHeight - 10 : 30;
            ctx.fillText(text, x, y);
        }

        ctx.restore();
    }

    finalizeImage(ctx, outputFormat, quality, targetElement, style, altText, loading, crossorigin, decoding, referrerPolicy, srcset, sizes, onClick, onHover, onProcessed, imageUrl) {
        const processedImage = new Image();
        processedImage.src = ctx.canvas.toDataURL(outputFormat, quality);
        processedImage.alt = altText;
        processedImage.setAttribute('role', 'img');
        processedImage.loading = loading;
        processedImage.crossOrigin = crossorigin;
        processedImage.decoding = decoding;
        processedImage.referrerPolicy = referrerPolicy;
        processedImage.srcset = srcset;
        processedImage.sizes = sizes;
        Object.assign(processedImage.style, style);

        if (onClick) processedImage.addEventListener('click', onClick);
        if (onHover) processedImage.addEventListener('mouseover', onHover);

        if (targetElement && targetElement.parentNode) {
            targetElement.parentNode.replaceChild(processedImage, targetElement);
        } else {
            document.body.appendChild(processedImage);
        }

        onProcessed({ imageUrl, targetElement, processedImage });
    }

    processImage(element, imageUrl, options) {
        this.processImageURL(imageUrl, options, element);
    }
}
