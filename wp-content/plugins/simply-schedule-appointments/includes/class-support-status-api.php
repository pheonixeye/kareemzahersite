<?php
/**
 * Simply Schedule Appointments Support Status Api.
 *
 * @since   2.1.6
 * @package Simply_Schedule_Appointments
 */

/**
 * Simply Schedule Appointments Support Status Api.
 *
 * @since 2.1.6
 */
class SSA_Support_Status_Api extends WP_REST_Controller {
	/**
	 * Parent plugin class
	 *
	 * @var   class
	 * @since 1.0.0
	 */
	protected $plugin = null;

	/**
	 * Constructor
	 *
	 * @since  1.0.0
	 * @param  object $plugin Main plugin object.
	 * @return void
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
		$this->hooks();
	}

	/**
	 * Initiate our hooks
	 *
	 * @since  1.0.0
	 * @return void
	 */
	public function hooks() {
		$this->register_routes();
	}


	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'ssa/v' . $version;
		$base = 'support_status';
		register_rest_route( $namespace, '/' . $base, array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_items' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
				'args'            => array(

				),
			),
		) );

		register_rest_route( $namespace, '/' . 'support_ticket', array(
			array(
				'methods'         => WP_REST_Server::CREATABLE,
				'callback'        => array( $this, 'create_support_ticket' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
				'args'            => array(

				),
			),
		) );

		register_rest_route( $namespace, '/' . 'support_debug/wp', array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_wp_debug_log_content' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
				'args'            => array(

				),
			),
		) );

		register_rest_route( $namespace, '/' . 'support_debug/wp/delete', array(
			array(
				'methods'         => WP_REST_Server::CREATABLE,
				'callback'        => array( $this, 'empty_wp_debug_log_content' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
				'args'            => array(

				),
			),
		) );


		register_rest_route( $namespace, '/' . 'support_debug/ssa', array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_ssa_debug_log_content' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
				'args'            => array(

				),
			),
		) );

		register_rest_route( $namespace, '/' . 'support_debug/ssa/delete', array(
			array(
				'methods'         => WP_REST_Server::CREATABLE,
				'callback'        => array( $this, 'empty_ssa_debug_log_content' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
				'args'            => array(

				),
			),
		) );

		register_rest_route( $namespace, '/' . 'support_debug/logs', array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_debug_log_urls' ),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
				'args'            => array(

				),
			),
		) );
	}

	public function create_support_ticket( $request ) {
		$params = $request->get_params();
		$response = wp_remote_post( 'https://api.simplyscheduleappointments.com/support_ticket/', array(
			'headers' => array(
				'content-type' => 'application/json',
			),
			'body' => json_encode( $params ),
		) );
		$response = wp_remote_retrieve_body( $response );
		if ( empty( $response ) ) {
			return new WP_Error( 'empty_response', __( 'No response', 'simply-schedule-appointments' ) );
		}
		$response = json_decode( $response, true );
		if ( ! is_array( $response ) ) {
			$response = json_decode( $response, true );
		}

		if ($response['status'] != 'success' ) {
			return new WP_Error( 'failed_submission', __( 'Your support ticket failed to be sent, please send details to support@simplyscheduleappointments.com', 'simply-schedule-appointments' ) );
		}

		return $response;
	}

	public function get_items_permissions_check( $request ) {
		return current_user_can( 'ssa_manage_site_settings' );
	}

	public function get_items( $request ) {
		$params = $request->get_params();

		return array(
			'response_code' => 200,
			'error' => '',
			'data' => array(
				'site_status' => $this->plugin->support_status->get_site_status(),
			),
		);
	}

	/**
	 * Gets the default debug.log contents.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_wp_debug_log_content( WP_REST_Request $request ) {
		$developer_settings = $this->plugin->developer_settings->get();
		if( $developer_settings && isset( $developer_settings['debug_mode'] ) && $developer_settings['debug_mode'] ) {
			$path = ini_get('error_log');
			// return $path;
			if ( file_exists( $path ) && is_writeable( $path ) ) {
				$content = file_get_contents( $path );

				return new WP_REST_Response( $content, 200 );
			} 
		}

		return new WP_REST_Response( "", 200 );
	}


	/**
	 * Deletes the default debug.log file.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function empty_wp_debug_log_content( WP_REST_Request $request ) {
		$path = ini_get('error_log');
		if ( file_exists( $path ) && is_writeable( $path ) ) {
			unlink( $path );

			return new WP_REST_Response( __( 'Debug Log file successfully cleared.' ), 200 );
		} else {
			return new WP_REST_Response( __( 'Debug Log file not found.' ), 200 );
		}
	}

	/**
	 * Gets the ssa_debug.log contents.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */	
	public function get_ssa_debug_log_content( WP_REST_Request $request ) {
		$developer_settings = $this->plugin->developer_settings->get();
		if( $developer_settings && isset( $developer_settings['ssa_debug_mode'] ) && $developer_settings['ssa_debug_mode'] ) {
			$path = $this->get_log_file_path( 'debug' );
			if ( file_exists( $path ) && is_readable( $path ) ) {
				$content = file_get_contents( $path );

				return new WP_REST_Response( $content, 200 );
			} 
		}

		return new WP_REST_Response( "", 200 );
	}

	/**
	 * Get file path
	 *
	 * @param  string $filename Filename
	 *
	 * @return string
	 */
	public function get_log_file_path( $filename = 'debug' ) {
		$path = SSA_Filesystem::get_uploads_dir_path();
		if ( empty( $path ) ) {
			return false;
		}

		$path .= '/logs';
		if ( ! wp_mkdir_p( $path ) ) {
			return false;
		}

		$filename .= '-' . substr( sha1( AUTH_KEY ), 0, 10 );

		return $path . '/' . sanitize_title( $filename ) . '.log';
	}

	/**
	 * Deletes the ssa_debug.log file.
	 *
	 * @param WP_REST_Request $request
	 * @return void
	 */
	public function empty_ssa_debug_log_content( WP_REST_Request $request ) {
		$path = $this->get_log_file_path( 'debug' );
		if ( file_exists( $path ) && is_writeable( $path ) ) {
			unlink( $path );

			return new WP_REST_Response( __( 'Debug Log file successfully cleared.' ), 200 );
		} else {
			return new WP_REST_Response( __( 'Debug Log file not found or could not be removed.' ), 200 );
		}

	}


	/**
	 * Returns the urls for all debug log files.
	 *
	 * @return WP_REST_Response
	 */
	public function get_debug_log_urls() {
		$logs = array(
			'wp' => null,
			'ssa' => null,
		);

		$path = ini_get('error_log');
		if ( file_exists( $path ) && is_readable( $path ) ) {
			$logs['wp'] = str_replace(
				wp_normalize_path( untrailingslashit( ABSPATH ) ),
				site_url(),
				wp_normalize_path( $path )
			);
		}

		$ssa_path = $this->get_log_file_path( 'debug' );
		if ( file_exists( $ssa_path ) && is_readable( $ssa_path ) ) {
			$logs['ssa'] = str_replace(
				wp_normalize_path( untrailingslashit( ABSPATH ) ),
				site_url(),
				wp_normalize_path( $ssa_path )
			);
		}

		return new WP_REST_Response( $logs, 200 );
	}

}
