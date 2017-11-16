var kirki = {

	/**
	 * An object containing definitions for controls.
	 *
	 * @since 3.0.16
	 */
	control: {

		/**
		 * The color control.
		 *
		 * @since 3.0.16
		 */
		'kirki-color': {

			/**
			 * Init the control.
			 *
			 * @since 3.0.16
			 * @param {object} [control] The customizer control object.
			 * @returns {void}
			 */
			init: function( control ) {
				var self = this;

				// Render the template.
				self.template( control );

				// Init the control.
				kirki.input.color.init( control );

			},

			/**
			 * Render the template.
			 *
			 * @since 3.0.16
			 * @param {object} [control] The customizer control object.
			 * @returns {void}
			 */
			template: function( control ) {
				control.container.html( kirki.input.color.getTemplate( {
					label: control.params.label,
					description: control.params.description,
					mode: control.params.mode,
					inputAttrs: control.params.inputAttrs,
					'data-palette': control.params.palette,
					'data-default-color': control.params['default'],
					'data-alpha': control.params.choices.alpha,
					value: control.setting._value,
					link: control.params.link
				} ) );
			}
		}
	},

	/**
	 * An object containing definitions for input fields.
	 *
	 * @since 3.0.16
	 */
	input: {

		/**
		 * Color input fields.
		 *
		 * @since 3.0.16
		 */
		color: {

			/**
			 * Get the HTML for color inputs.
			 *
			 * @since 3.0.16
			 * @param {object} [data] The arguments.
			 * @returns {string}
			 */
			getTemplate: function( data ) {

				var html = '';

				data = _.defaults( data, {
					label: '',
					description: '',
					mode: 'full',
					inputAttrs: '',
					'data-palette': data['data-palette'] ? data['data-palette'] : true,
					'data-default-color': data['data-default-color'] ? data['data-default-color'] : '',
					'data-alpha': data['data-alpha'] ? data['data-alpha'] : false,
					value: '',
					link: ''
				} );

				html += '<label>';
				if ( data.label ) {
					html += '<span class="customize-control-title">' + data.label + '</span>';
				}
				if ( data.description ) {
					html += '<span class="description customize-control-description">' + data.description + '</span>';
				}
				html += '</label>';
				html += '<input type="text" data-type="' + data.mode + '" ' + data.inputAttrs + ' data-palette="' +  data['data-palette'] + '" data-default-color="' +  data['data-default-color'] + '" data-alpha="' + data['data-alpha'] + '" value="' + data.value + '" class="kirki-color-control" ' + data.link + '/>';

				return html;
			},

			/**
			 * Init the control.
			 *
			 * @since 3.0.16
			 * @param {object} [control] The control object.
			 * @returns {void}
			 */
			init: function( control ) {

				var picker = control.container.find( '.kirki-color-control' ),
				    clear;

				// If we have defined any extra choices, make sure they are passed-on to Iris.
				if ( ! _.isUndefined( control.params.choices ) ) {
					picker.wpColorPicker( control.params.choices );
				}

				// Tweaks to make the "clear" buttons work.
				setTimeout( function() {
					clear = control.container.find( '.wp-picker-clear' );
					clear.click( function() {
						control.setting.set( '' );
					});
				}, 200 );

				// Saves our settings to the WP API
				picker.wpColorPicker({
					change: function() {

						// Small hack: the picker needs a small delay
						setTimeout( function() {
							control.setting.set( picker.val() );
						}, 20 );
					}
				});
			}
		}
	}
};

wp.customize.controlConstructor['kirki-color'] = wp.customize.kirkiDynamicControl.extend({});
