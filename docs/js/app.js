document.addEventListener('DOMContentLoaded', function () {
	// Mobile menu toggle
	const menuToggle = document.querySelector('.mobile-menu-toggle');
	const mobileMenu = document.querySelector('.mobile-menu');
	const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener('click', function () {
			menuToggle.classList.toggle('active');
			mobileMenu.classList.toggle('active');
		});

		// Close mobile menu when clicking on a link
		mobileMenuLinks.forEach(link => {
			link.addEventListener('click', function () {
				menuToggle.classList.remove('active');
				mobileMenu.classList.remove('active');
			});
		});
	}

	// Tab switching in the playground
	const tabButtons = document.querySelectorAll('.tab-button');
	const tabContents = document.querySelectorAll('.tab-content');

	tabButtons.forEach(button => {
		button.addEventListener('click', () => {
			const tabName = button.getAttribute('data-tab');

			// Deactivate all tabs
			tabButtons.forEach(btn => btn.classList.remove('active'));
			tabContents.forEach(content => content.classList.remove('active'));

			// Activate the selected tab
			button.classList.add('active');
			document.getElementById(`${tabName}-tab`).classList.add('active');
		});
	});

	// Initialize the image playground
	initImagePlayground();
});

// Show angle value for rotation and watermark angle
document.getElementById('rotate').addEventListener('input', function () {
	document.getElementById('rotate-value').textContent = this.value + '°';
});

document.getElementById('watermark-angle').addEventListener('input', function () {
	document.getElementById('watermark-angle-value').textContent = this.value + '°';
});

// Initialize the image playground
function initImagePlayground() {
	// Check if ImageProcessor is available
	if (typeof ImageProcessor === 'undefined') {
		showError('ImageProcessor library not found. Please check your installation.');
		return;
	}

	// Get all the control elements
	const controls = {
		// Filter controls
		grayscale: document.getElementById('grayscale'),
		sepia: document.getElementById('sepia'),
		brightness: document.getElementById('brightness'),
		contrast: document.getElementById('contrast'),
		blur: document.getElementById('blur'),
		saturation: document.getElementById('saturation'),

		// Transform controls
		width: document.getElementById('width'),
		height: document.getElementById('height'),
		rotate: document.getElementById('rotate'),

		// Watermark controls
		watermarkText: document.getElementById('watermark-text'),
		watermarkPosition: document.getElementById('watermark-position'),
		watermarkRepeat: document.getElementById('watermark-repeat'),
		watermarkAngle: document.getElementById('watermark-angle'),
		watermarkOpacity: document.getElementById('watermark-opacity'),

		// Actions
		resetAll: document.getElementById('reset-all')
	};

	// Canvas container where the processed image will be displayed
	const canvasContainer = document.getElementById('canvas-container');
	const loadingIndicator = document.getElementById('loading-indicator');
	const errorMessage = document.getElementById('error-message');

	// Initial image processing
	processImage();

	// Add event listeners to all controls
	Object.values(controls).forEach(control => {
		if (control && control !== controls.resetAll) {
			control.addEventListener('input', debounce(processImage, 300));
		}
	});

	// Reset button
	controls.resetAll.addEventListener('click', () => {
		// Reset all controls to default values
		controls.grayscale.value = 0;
		controls.sepia.value = 0;
		controls.brightness.value = 100;
		controls.contrast.value = 100;
		controls.blur.value = 0;
		controls.saturation.value = 100;
		controls.width.value = 600;
		controls.height.value = 400;
		controls.rotate.value = 0;
		document.getElementById('rotate-value').textContent = '0°';
		controls.watermarkText.value = '';
		controls.watermarkPosition.value = 'center';
		controls.watermarkRepeat.value = 'no-repeat';
		controls.watermarkAngle.value = 0;
		document.getElementById('watermark-angle-value').textContent = '0°';
		controls.watermarkOpacity.value = 50;

		// Process image with reset values
		processImage();
	});

	// Process image with current settings
	function processImage() {
		showLoading();
		hideError();

		// Clear the previous content
		while (canvasContainer.firstChild) {
			canvasContainer.removeChild(canvasContainer.firstChild);
		}

		// Create a target element for ImageProcessor
		const targetElement = document.createElement('div');
		canvasContainer.appendChild(targetElement);

		// Get current values from controls and build options object
		const options = {
			width: parseInt(controls.width.value),
			height: parseInt(controls.height.value),
			grayscale: controls.grayscale.value > 0 ? `grayscale(${controls.grayscale.value}%)` : '',
			sepia: controls.sepia.value > 0 ? `sepia(${controls.sepia.value}%)` : '',
			brightness: `brightness(${controls.brightness.value}%)`,
			contrast: `contrast(${controls.contrast.value}%)`,
			blur: controls.blur.value > 0 ? `blur(${controls.blur.value}px)` : '',
			saturation: `saturate(${controls.saturation.value}%)`,
			rotate: parseInt(controls.rotate.value),
			targetElement: targetElement,
			altText: 'Processed image',

			// Watermark options
			watermark: controls.watermarkText.value,
			watermarkPosition: controls.watermarkPosition.value,
			watermarkRepeat: controls.watermarkRepeat.value,
			watermarkAngle: parseInt(controls.watermarkAngle.value),
			watermarkStyle: {
				fontSize: '20px',
				fontFamily: 'Arial',
				color: `rgba(255, 255, 255, ${controls.watermarkOpacity.value / 100})`,
			},

			// Event hooks
			onProcessingStart: () => {
				showLoading();
			},
			onProcessed: () => {
				hideLoading();
			},
			onError: (error) => {
				hideLoading();
				showError(`Error processing image: ${error.message || 'Unknown error'}`);
				console.error('ImageProcessor error:', error);
			}
		};

		// Process the image
		try {
			new ImageProcessor('images/jazz-large.jpg', options);
		} catch (error) {
			hideLoading();
			showError(`Error initializing ImageProcessor: ${error.message || 'Unknown error'}`);
			console.error('ImageProcessor initialization error:', error);
		}
	}

	// Helper functions for loading and error states
	function showLoading() {
		loadingIndicator.classList.add('active');
	}

	function hideLoading() {
		loadingIndicator.classList.remove('active');
	}

	function showError(message) {
		errorMessage.innerHTML = `<div class="error-box">${message}</div>`;
		errorMessage.classList.add('active');
	}

	function hideError() {
		errorMessage.innerHTML = '';
		errorMessage.classList.remove('active');
	}
}

// Utility: Debounce function to limit how often a function is called
function debounce(func, delay) {
	let timeout;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), delay);
	};
}
