<?php
/**
 * Simply Schedule Appointments Developer Settings.
 *
 * @since   1.0.1
 * @package Simply_Schedule_Appointments
 */

/**
 * Simply Schedule Appointments Developer Settings.
 *
 * @since 1.0.1
 */
class SSA_Developer_Settings extends SSA_Settings_Schema {
	/**
	 * Parent plugin class.
	 *
	 * @since 0.0.3
	 *
	 * @var   Simply_Schedule_Appointments
	 */
	protected $plugin = null;

	/**
	 * Constructor.
	 *
	 * @since  0.0.3
	 *
	 * @param  Simply_Schedule_Appointments $plugin Main plugin object.
	 */
	public function __construct( $plugin ) {
		parent::__construct();
		$this->plugin = $plugin;
		$this->hooks();
	}

	/**
	 * Initiate our hooks.
	 *
	 * @since  0.0.3
	 */
	public function hooks() {
		// add_filter( 'update_'.$this->slug.'_settings', array( $this, 'auto_validate_api_key' ), 10, 2 );
		add_action( 'updated_'.$this->slug.'_settings', array( $this, 'update_debug_mode' ), 10, 2 );
	}

	protected $slug = 'developer';

	public function get_schema() {
		if ( !empty( $this->schema ) ) {
			return $this->schema;
		}

		$this->schema = array(
			'version' => '2020-07-22',
			'fields' => array(
				'enabled' => array(
					'name' => 'enabled',
					'default_value' => true,
				),

				'enqueue_everywhere' => array(
					'name' => 'enqueue_everywhere',
					'default_value' => false,
				),

				'separate_appointment_type_availability' => array(
					'name' => 'separate_appointment_type_availability',
					'default_value' => apply_filters( 'ssa/get_booked_periods/should_separate_availability_for_appointment_types', false ),
				),

				// Beta Features
				'capacity_availability' => array(
					'name' => 'capacity_availability',
					'default_value' => false
				),

				'booking_api_embed' => array(
					'name' => 'booking_api_embed',
					'default_value' => false
				),
				
				'debug_mode' => array(
					'name' => 'debug_mode',
					'default_value' => false
				),
				'ssa_debug_mode' => array(
					'name' => 'ssa_debug_mode',
					'default_value' => false
				)
				
			),
		);

		return $this->schema;
	}

	public function update_debug_mode( $settings, $old_settings ) {
		// echo '<pre>'. print_r( $settings , true ) . '</pre>';
		// echo '<pre>'. print_r( $old_settings , true ) . '</pre>';
		// wp_die();
		if( ! isset( $settings['debug_mode'] ) ) {
			return;
		}

		$config_path = ABSPATH . 'wp-config.php';
		$config_transformer = new \WPConfigTransformer( $config_path );

		if( $settings['debug_mode'] ) {
			$config_transformer->update( 'constant', 'WP_DEBUG', 'true', array( 'raw' => true ) );	
			$config_transformer->update( 'constant', 'WP_DEBUG_LOG', 'true', array( 'raw' => true ) );	
			$config_transformer->update( 'constant', 'WP_DEBUG_DISPLAY', 'false', array( 'raw' => true ) );	
		} else {
			$config_transformer->remove( 'constant', 'WP_DEBUG' );	
			$config_transformer->remove( 'constant', 'WP_DEBUG_LOG' );	
			$config_transformer->remove( 'constant', 'WP_DEBUG_DISPLAY' );	
		}

	}

}
