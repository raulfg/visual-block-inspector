/**
 * Visual Block Inspector
 * Automatically activates when plugin is enabled
 *
 * @package VisualBlockInspector
 */

(function() {
	'use strict';

	// Fixed colors for layout blocks
	const fixedLayoutColors = {
		'core/group': '#4CAF50',
		'core/columns': '#4CAF50',
		'core/column': '#4CAF50',
		'core/cover': '#2E7D32',
		'core/row': '#66BB6A',
		'core/stack': '#81C784',
		'core/container': '#388E3C',
		'core/grid': '#43A047'
	};

	// Color palette for automatic assignment (no greens to avoid confusion with layout blocks)
	const colorPalette = [
		'#2196F3',
		'#FF9800',
		'#9C27B0',
		'#F44336',
		'#00BCD4',
		'#FFC107',
		'#E91E63',
		'#009688',
		'#FF5722',
		'#673AB7',
		'#3F51B5',
		'#FFEB3B',
		'#795548',
		'#607D8B',
		'#FF6F00',
		'#1976D2',
		'#C2185B',
		'#00897B',
		'#D32F2F',
		'#7B1FA2'
	];

	// Map to store assigned colors for each block
	const blockColorMap = new Map();
	let colorIndex = 0;

	let observer = null;

	/**
	 * Gets or assigns a color for a specific block
	 */
	function getColorForBlock(blockName) {
		if (fixedLayoutColors[blockName]) {
			return fixedLayoutColors[blockName];
		}

		if (blockColorMap.has(blockName)) {
			return blockColorMap.get(blockName);
		}

		const color = colorPalette[colorIndex % colorPalette.length];
		blockColorMap.set(blockName, color);
		colorIndex++;

		return color;
	}

	/**
	 * Gets the correct document (may be in an iframe)
	 */
	function getEditorDocument() {
		const iframe = document.querySelector('iframe[name="editor-canvas"]') ||
		               document.querySelector('.edit-post-visual-editor iframe') ||
		               document.querySelector('iframe[title*="Editor"]');

		if (iframe && iframe.contentDocument) {
			return iframe.contentDocument;
		}

		return document;
	}

	/**
	 * Finds blocks in the DOM
	 */
	function findBlockElements() {
		const elements = new Set();
		const selectors = [
			'.block-editor-block-list__block',
			'[data-block]',
			'.wp-block[data-type]'
		];

		const editorDoc = getEditorDocument();

		selectors.forEach(selector => {
			try {
				editorDoc.querySelectorAll(selector).forEach(el => {
					if (el.getAttribute('data-block') || el.getAttribute('data-type')) {
						elements.add(el);
					}
				});
			} catch (e) {
				console.warn('[VBI] Error:', e);
			}
		});

		return Array.from(elements);
	}

	/**
	 * Gets the block name
	 */
	function getBlockName(element) {
		let blockName = element.getAttribute('data-type');

		if (!blockName) {
			const classes = element.className.split(' ');
			for (let cls of classes) {
				if (cls.startsWith('wp-block-') && !cls.includes('__')) {
					blockName = cls.replace('wp-block-', 'core/').replace(/-/g, '/');
					break;
				}
			}
		}

		if (blockName === 'core/group') {
			if (element.classList.contains('is-layout-grid')) {
				blockName = 'core/grid';
			}
		}

		return blockName || 'core/paragraph';
	}

	/**
	 * Applies inspector styles to a block
	 */
	function applyInspectorStyles(element) {
		if (!element || element.nodeType !== 1) return;

		const blockName = getBlockName(element);
		const color = getColorForBlock(blockName);

		element.classList.add('vbi-inspected-block');
		element.setAttribute('data-vbi-block-name', blockName);
		element.style.setProperty('--vbi-outline-color', color);

		const directChildren = Array.from(element.children);
		const hasChildBlocks = directChildren.some(child => {
			return child.classList.contains('block-editor-block-list__block') ||
			       child.getAttribute('data-type') ||
			       child.getAttribute('data-block') ||
			       child.querySelector('.block-editor-block-list__block, [data-type], [data-block]');
		});

		if (hasChildBlocks) {
			element.setAttribute('data-vbi-has-children', 'true');
		} else {
			element.removeAttribute('data-vbi-has-children');
		}

		if (blockName === 'core/column') {
			let columnsContainer = element.closest('[data-type="core/columns"]');

			if (!columnsContainer) {
				columnsContainer = element.closest('.wp-block-columns');
			}

			if (columnsContainer) {
				let allColumns = columnsContainer.querySelectorAll('[data-type="core/column"]');

				if (!allColumns || allColumns.length === 0) {
					allColumns = columnsContainer.querySelectorAll('.wp-block-column');
				}

				const allColumnsArray = Array.from(allColumns);
				const columnIndex = allColumnsArray.indexOf(element);

				if (columnIndex !== -1) {
					const columnNumber = columnIndex + 1;
					element.setAttribute('data-vbi-column-number', columnNumber);
				}
			}
		}

		const gridContainer = element.closest('.is-layout-grid, [data-type="core/group"].is-layout-grid');
		if (gridContainer && element !== gridContainer) {
			const gridItems = Array.from(gridContainer.children).filter(child => {
				return child.classList.contains('block-editor-block-list__block') ||
				       child.getAttribute('data-type') ||
				       child.getAttribute('data-block');
			});

			const itemIndex = gridItems.indexOf(element);

			if (itemIndex !== -1) {
				const itemNumber = itemIndex + 1;
				element.setAttribute('data-vbi-grid-item-number', itemNumber);
			}
		}
	}

	/**
	 * Applies styles to all blocks
	 */
	function applyToAllBlocks() {
		const blocks = findBlockElements();
		blocks.forEach(block => applyInspectorStyles(block));
	}

	/**
	 * Scans and applies styles to new blocks
	 */
	function scanAndApplyToNewBlocks() {
		const editorDoc = getEditorDocument();
		const allBlocks = editorDoc.querySelectorAll('.block-editor-block-list__block, [data-block]');

		allBlocks.forEach(block => {
			if (!block.classList.contains('vbi-inspected-block') &&
			    (block.getAttribute('data-block') || block.getAttribute('data-type'))) {
				applyInspectorStyles(block);
			}
		});
	}

	/**
	 * Observes new blocks continuously
	 */
	function observeBlocks() {
		if (observer) return;

		const editorDoc = getEditorDocument();
		const editorContainer = editorDoc.querySelector('.block-editor-block-list__layout') ||
		                        editorDoc.querySelector('.editor-styles-wrapper') ||
		                        editorDoc.body;

		observer = new MutationObserver(function() {
			scanAndApplyToNewBlocks();
		});

		observer.observe(editorContainer, {
			childList: true,
			subtree: true
		});

		setInterval(function() {
			scanAndApplyToNewBlocks();
		}, 1000);
	}

	/**
	 * Injects CSS into editor iframe if necessary
	 */
	function injectCSSIntoIframe() {
		const iframe = document.querySelector('iframe[name="editor-canvas"]') ||
		               document.querySelector('.edit-post-visual-editor iframe');

		if (iframe && iframe.contentDocument) {
			const iframeDoc = iframe.contentDocument;

			if (iframeDoc.getElementById('vbi-injected-styles')) {
				return;
			}

			const cssLink = document.querySelector('link[href*="visual-block-inspector"][href*="editor.css"]');

			if (cssLink) {
				const newLink = iframeDoc.createElement('link');
				newLink.id = 'vbi-injected-styles';
				newLink.rel = 'stylesheet';
				newLink.href = cssLink.href;
				iframeDoc.head.appendChild(newLink);
			}
		}
	}

	/**
	 * Automatic initialization
	 */
	function init() {
		let attempts = 0;
		const maxAttempts = 100;

		const checkEditor = setInterval(function() {
			attempts++;

			const editorContainer = document.querySelector('.block-editor-block-list__layout') ||
			                        document.querySelector('.editor-styles-wrapper') ||
			                        document.querySelector('.edit-post-visual-editor') ||
			                        document.querySelector('.block-editor-writing-flow') ||
			                        document.querySelector('[data-type="core/post-content"]') ||
			                        document.querySelector('.wp-block-post-content');

			const iframe = document.querySelector('iframe[name="editor-canvas"]') ||
			               document.querySelector('.edit-post-visual-editor iframe');

			if (editorContainer || iframe) {
				clearInterval(checkEditor);

				if (iframe) {
					const checkIframe = setInterval(function() {
						if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
							clearInterval(checkIframe);
							injectCSSIntoIframe();
							applyToAllBlocks();
							observeBlocks();
							setTimeout(applyToAllBlocks, 500);
							setTimeout(applyToAllBlocks, 1500);
							setTimeout(applyToAllBlocks, 3000);
						}
					}, 100);

					setTimeout(function() {
						clearInterval(checkIframe);
					}, 5000);
				} else {
					applyToAllBlocks();
					observeBlocks();
					setTimeout(applyToAllBlocks, 500);
					setTimeout(applyToAllBlocks, 1500);
				}
			} else if (attempts >= maxAttempts) {
				clearInterval(checkEditor);
				applyToAllBlocks();
				observeBlocks();
			}
		}, 100);
	}

	// Initialize
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	if (window.wp && window.wp.domReady) {
		window.wp.domReady(init);
	}

	setTimeout(init, 2000);

})();
