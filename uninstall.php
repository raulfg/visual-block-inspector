<?php
/**
 * Uninstall Visual Block Inspector
 *
 * Deletes all plugin data when the plugin is uninstalled.
 *
 * @package VisualBlockInspector
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Exit if not called from WordPress.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// This plugin doesn't store any data in the database.
// No cleanup needed - all assets are removed automatically when plugin folder is deleted.
// This file exists for WordPress.org compliance and future-proofing.
