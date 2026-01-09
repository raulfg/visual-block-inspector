<?php
/**
 * Plugin Name: Visual Block Inspector
 * Description: Automatic color-coded outlines and labels for Gutenberg blocks. See your page structure instantly while editing.
 * Version: 1.0.0
 * Author: Raúl Fernández
 * Author URI: https://clink.es
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: visual-block-inspector
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 *
 * @package VisualBlockInspector
 * @since 1.0.0
 */

// Exit if accessed directly - Security measure.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Plugin version.
 *
 * @since 1.0.0
 * @var string
 */
define( 'VBI_VERSION', '1.0.0' );

/**
 * Plugin directory path.
 *
 * @since 1.0.0
 * @var string
 */
define( 'VBI_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Plugin directory URL.
 *
 * @since 1.0.0
 * @var string
 */
define( 'VBI_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Plugin basename.
 *
 * @since 1.0.0
 * @var string
 */
define( 'VBI_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Main plugin class.
 */
class Visual_Block_Inspector {
	/**
	 * Single instance of the class.
	 *
	 * @var Visual_Block_Inspector
	 */
	private static $instance = null;

	/**
	 * Get single instance of the class.
	 *
	 * @return Visual_Block_Inspector
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct() {
		$this->init_hooks();
	}

	/**
	 * Initialize hooks.
	 */
	private function init_hooks() {
		// Only load in block editor.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
	}

	/**
	 * Enqueue editor assets.
	 */
	public function enqueue_editor_assets() {
		// Enqueue editor styles.
		wp_enqueue_style(
			'visual-block-inspector-editor',
			VBI_PLUGIN_URL . 'assets/css/editor.css',
			array(),
			VBI_VERSION
		);

		// Enqueue vanilla JavaScript.
		wp_enqueue_script(
			'visual-block-inspector-editor',
			VBI_PLUGIN_URL . 'assets/js/editor.js',
			array(),
			VBI_VERSION,
			true
		);
	}
}

/**
 * Initialize the plugin.
 *
 * @return Visual_Block_Inspector Instance of the plugin.
 */
function visual_block_inspector_init() {
	return Visual_Block_Inspector::get_instance();
}

// Initialize plugin.
visual_block_inspector_init();
