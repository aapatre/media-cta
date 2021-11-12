/**
 * BLOCK: media-cta
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import {
	useBlockProps,
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import {
	PanelBody,
	Button,
	IconButton,
	RangeControl,
} from '@wordpress/components';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-media-cta', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'media-cta - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'media-cta — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		body: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		titleColor: {
			type: 'string',
			default: 'black',
		},
		backgroundImage: {
			type: 'string',
			default: null,
		},
		overlayColor: {
			type: 'string',
			default: 'black',
		},
		overlayOpacity: {
			type: 'number',
			default: 0.3,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( { attributes, setAttributes } ) => {
		const {
			title,
			body,
			titleColor,
			backgroundImage,
			overlayColor,
			overlayOpacity,
		} = attributes;

		function onChangeTitle( newTitle ) {
			setAttributes( { title: newTitle } );
		}

		function onChangeBody( newBody ) {
			setAttributes( { body: newBody } );
		}

		function onChangeTitleColor( newTitleColor ) {
			setAttributes( { titleColor: newTitleColor } );
		}

		function onSelectImage( newImage ) {
			setAttributes( { backgroundImage: newImage.sizes.full.url } );
		}

		function onChangeOverlayColor( newColor ) {
			setAttributes( { overlayColor: newColor } );
		}

		function onChangeOverlayOpacity( newOpacity ) {
			setAttributes( { overlayOpacity: newOpacity } );
		}

		return (
			<div>
				<InspectorControls>
					<PanelBody title={ 'Font Color Settings' }>
						<p><strong>Select Title Color:</strong></p>
						<ColorPalette value={ titleColor }
							onChange={ onChangeTitleColor } />
					</PanelBody>
					<PanelBody title={ 'Background Image Settings' }>
						<p><strong>Select a Background Image:</strong></p>
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ backgroundImage }
							render={ ( { open } )=>(
								<IconButton
									onClick={ open }
									icon="upload"
									className="editor-media-placeholder__button is-button is-default is-large">
									Select Background Image
								</IconButton>
							) } />
					</PanelBody>
					<PanelBody title={ 'Overlay Settings' }>
						<p><strong>Select Overlay Color:</strong></p>
						<ColorPalette value={ overlayColor }
							onChange={ onChangeOverlayColor } />

						<p><strong>Set Overlay Opacity:</strong></p>
						<RangeControl value={ overlayOpacity }
							onChange={ onChangeOverlayOpacity }
							min={ 0 }
							max={ 1 }
							step={ 0.01 } />
					</PanelBody>
				</InspectorControls>
				<div className="media-cta-parent-wrapper" style={ {
					backgroundImage: `url( ${ backgroundImage })`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				} }>
					{ /* Overlay */ }
					<div className="media-cta-overlay" style={ {
						background: overlayColor,
						opacity: overlayOpacity,
					} }></div>
					<RichText key="editable"
						tagName="h2"
						placeholder="CTA Title"
						value={ title }
						onChange={ onChangeTitle }
						style={ { color: titleColor } }
					/>
					<RichText key="editable"
						tagName="p"
						placeholder="CTA Description"
						value={ body }
						onChange={ onChangeBody }
					/>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( { attributes } ) => {
		const {
			title,
			body,
			titleColor,
			backgroundImage,
			overlayColor,
			overlayOpacity,
		} = attributes;
		return (
			<div className="media-cta-parent-wrapper" style={ {
				backgroundImage: `url( ${ backgroundImage })`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			} }>
				{ /* Overlay */ }
				<div className="media-cta-overlay" style={ {
					background: overlayColor,
					opacity: overlayOpacity,
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				} }></div>
				<RichText.Content tagName="h2"
					value={ title }
					style={ { color: titleColor } } />
				<RichText.Content tagName="p"
					value={ body } />
			</div>
		);
	},
} );
